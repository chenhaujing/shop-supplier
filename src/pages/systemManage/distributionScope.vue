<template>
    <div>
        <div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 系统设置</el-breadcrumb-item>
                <el-breadcrumb-item><a href="javascript:location.reload();">配送范围</a></el-breadcrumb-item>
            </el-breadcrumb>
            <hr>

        </div>
        <div class="row">
            <div class="col-xs-2">
                <el-button type="primary" @click="dialogAdd()">
                    <span class="el-icon-plus"></span>
                    <span>新增配送范围</span>
                </el-button>
            </div>
        </div>
        <div class="distributionScope_item">
            <table class="table table-bordered table-hover">
                <thead>
                <tr>
                    <th>序号</th>
                    <th>省/直辖市</th>
                    <th>市级</th>
                    <th>区/县</th>
                    <th>配送范围备注</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-if="distributionData && distributionData.length===0">
                    <td colspan="6"> 没有数据记录</td>
                </tr>
                <tr v-else v-for="(value,index) in distributionData">
                    <td>{{index + 1}}</td>
                    <td>{{value.addressProvince}}</td>
                    <td>{{value.addressCity || '全部市'}}</td>
                    <td>{{value.addressDistrict || '全部区'}}</td>
                    <td>{{value.remark}}</td>
                    <td>
                        <el-button type="info" size="small" @click="getDsById(value.id)">编辑</el-button>
                        <el-button type="info" size="small" @click="confirmDelete(value.id)">删除</el-button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div v-if="distributionData.length > 0" class="pull-right pageStyle">
        <paging ref="page" :page-num="pageTotal" :current-page="currentPage" :pageSize='10' @change="change"
                v-on:changeR="changeRows"></paging>
        </div>
        <!--编辑模态框-->
        <div class="distributionScope_model">
            <el-dialog title="配送范围设置" :visible.sync="dialogupdate" :close-on-press-escape="true"
                       :before-close="closeDialog1">
                <el-form>
                    <label class="col-xs-3 control-label"><img src="../../../static/img/20170801162143.png">
                        配送范围:</label>
                    <div class="col-xs-2">
                        <select class="form-control" v-model="distributionDataById.addressProvince"
                                @change="getCity(distributionDataById.addressProvince,2)">
                            <option value="" disabled>请选择省</option>
                            <option v-for="option in provinceUpdate" :value="option.srId">{{option.name}}</option>
                        </select>
                    </div>
                    <div class="col-xs-2">
                        <select class="form-control" v-model="distributionDataById.addressCity"
                                @change="getArea(distributionDataById.addressCity,2)">
                            <option value="">选择市</option>
                            <option value="1">全部市</option>
                            <option v-for="option in cityUpdate" :value="option.srId">{{option.name}}</option>
                        </select>
                    </div>
                    <div class="col-xs-2">
                        <select class="form-control" v-model="distributionDataById.addressDistrict">
                            <option value="">选择区</option>
                            <option value="1">全部区</option>
                            <option v-for="option in districtUpdate" :value="option.srId" v-show="addressInfo.city!=1">{{option.name}}</option>
                        </select>
                    </div>
                    <br><br><br>
                    <input type="text" class="form-control" v-model="distributionDataById.remark"placeholder="备注说明(100个字符以内)">
                </el-form>
                <br>
                <div slot="footer" class="dialog-footer">
                    <el-button type="info" @click="updateDs(distributionDataById.id)">保 存</el-button>
                    <el-button type="info" @click="dialogupdate=false">取 消</el-button>
                </div>
            </el-dialog>
        </div>

        <!--添加模态框-->
        <el-dialog title="配送范围设置" :visible.sync="dialogadd" :close-on-press-escape="true"
                   :before-close="closeDialog">
            <el-form>
                <label class="col-xs-3 control-label"><img src="../../../static/img/20170801162143.png">
                    配送范围:</label>
                <div class="col-xs-2">
                    <select class="form-control" v-model="addressInfo.province" @change="getCity(addressInfo.province,1)">
                        <option value="" disabled>选择省</option>
                        <option v-for="option in provincesAdd" :value="option.srId">{{option.name}}</option>
                    </select>
                </div>
                <div class="col-xs-2">
                    <select class="form-control" v-model="addressInfo.city" @change="getArea(addressInfo.city,1)">
                        <option value="">选择市</option>
                        <option value="1">全部市</option>
                        <option v-for="option in citiesAdd" :value="option.srId">{{option.name}}</option>
                    </select>
                </div>
                <div class="col-xs-2">
                    <select class="form-control" v-model="addressInfo.district">
                        <option value="">选择区</option>
                        <option value="1">全部区</option>
                        <option v-for="option in districtAdd" :value="option.srId" v-show="addressInfo.city!=1">{{option.name}} </option>
                    </select>
                </div>
                <br><br><br>

                <input type="text" class="form-control" v-model="characters" placeholder="备注说明(100个字符以内)">
            </el-form>
            <br>
            <div slot="footer" class="dialog-footer">
                <el-button type="info" @click="addDs">保 存</el-button>
                <el-button type="info" @click="dialogadd=false">取 消</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script>
    import '../../../static/css/distributionScope.less';
    import paging from '../../components/page';
    import axios from 'axios';
    import api from '../../api/distributionscope';

    export default {
        data () {
            return {
                characters: '',
                dialogupdate: false,
                dialogadd: false,
                single: [],
                pageNum: 1,
                pageTotal: 1, //总页码
                pageSize: 10, //每页条数
                currentPage: 1, //当前页

                //添加时候的省市区数组
                provincesAdd: [],
                citiesAdd: [], // 基本信息市
                districtAdd: [], // 基本信息县

                //编辑的省市区数组
                provinceUpdate: [],
                cityUpdate: [],
                districtUpdate: [],

                //添加的省市区
                addressInfo: {
                    province: '', //省
                    city: '',     //市
                    district: ''  //区
                },
                //列表数据
                distributionData: {},
                //通过ID查询的数据
                distributionDataById: {},

            };
        },

        created: function () {
            this.query();
            this.getProvince();
        },
        methods: {
            change (index) {
                this.currentPage = index;
                this.query();
            },
            //每页显示条数
            changeRows (row) {
                this.currentPage = 1;
                this.pageSize = row;
                this.query();
            },
            dialogUpdate () {
                this.dialogupdate = true;
            },
            dialogAdd () {
                this.dialogadd = true;
                this.getCity(this.addressInfo.province, 1);
                this.getArea(this.addressInfo.district, 1);
                for (let key in this.addressInfo) {
                    this.addressInfo[key] = '';
                }

                this.characters = '';
                this.citiesAdd = [];
                this.districtAdd = [];

                this.characters = '';

            },
            /**
             * 列表查询
             */
            query () {
                let param = {
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                };
                api.getDistributionList(param).then(
                    (response) => {
                        let data = response.data.data;
                        if (data) {
                            this.pageTotal = Math.floor((data.total % this.pageSize) == 0 ? (data.total / this.pageSize) : (data.total / this.pageSize) + 1);
                            this.pages = data.pages;
                            this.distributionData = data ? data.list : [];
                        } else {
                            this.distributionData = [];
                            this.pageTotal = 0;
                        }
                    });
            },

            //添加后调用关闭模态框
            closeDialog: function () {
                this.dialogadd = false;
            },
            //编辑后调用关闭模态框
            closeDialog1: function () {
                this.dialogupdate = false;
            },

            /**
             * 根据ID得到数据
             */
            getDsById (id) {
                this.dialogUpdate();
                axios.all([api.getDistributionscope(id), api.getAreaList()])
                    .then(axios.spread((acct, perms) => {
                        this.provinceUpdate = perms.data;
                        this.distributionDataById = acct.data.data;
                        if (this.distributionDataById.addressCity == "") {
                            this.distributionDataById.addressCity = 1;
                            this.distributionDataById.addressDistrict = 1;
                            this.getCity(this.distributionDataById.addressProvince, 2);
                        }else if(this.distributionDataById.addressCity != ""  && this.distributionDataById.addressDistrict == ""){
                            this.distributionDataById.addressDistrict = 1;
                            this.getCity(this.distributionDataById.addressProvince, 2);
                            this.getArea(this.distributionDataById.addressCity, 2);

                        }else {
                            this.getCity(this.distributionDataById.addressProvince, 2);
                            this.getArea(this.distributionDataById.addressCity, 2);
                        }

                    }));
            },
            /**
             *编辑配送范围
             */
            updateDs: function (id) {
                let tempCity = this.distributionDataById.addressCity;
                let tempDist = this.distributionDataById.addressDistrict;
                if(this.distributionDataById.remark.length>100){
                    this.$alert('备注不能超过100个字符')
                    return;
                }
                if (!this.distributionDataById.addressProvince) {
                    this.$alert('请填写省份！');
                    return;
                }
                if (!this.distributionDataById.addressCity) {
                    this.$alert('请填写市区！');
                    return;
                }
                if (!this.distributionDataById.addressDistrict) {
                    this.$alert('请填写区县！');
                    return;
                }
                if (tempCity === '1') {
                    tempCity = '';
                    tempDist = '';
                }
                if (tempCity === "1"){
                    tempCity = '';
                }
                if (tempCity === 1){
                    tempCity = '';
                }
                if (tempCity === '0') {
                    tempCity = '';
                }
                if (tempDist === 1) {
                    tempDist = '';
                }
                if(tempDist === '1'){
                    tempDist = '';
                }

                let params = {
                    addressProvince: this.distributionDataById.addressProvince,
                    addressCity: tempCity,
                    addressDistrict: tempDist,
                    remark: this.distributionDataById.remark
                };
                api.updateDistribution(id, params).then(
                    (response) => {
                        if (response.data.code === 1) {
                            this.closeDialog1();
                            this.query();
                        } else {
                            this.query();
                            this.$alert(response.data.message);
                        }
                    }
                );
            },

            /**
             * 添加配送范围
             */
            addDs: function () {
                let tempCity = this.addressInfo.city;
                let tempDist = this.addressInfo.district;
                if(this.characters.length>100){
                    this.$alert('备注不能超过100个字符')
                    return;
                }
                if (!this.addressInfo.province) {
                    this.$alert('请填写省份！');
                    return;
                }
                if (!this.addressInfo.city) {
                    this.$alert('请填写市区！');
                    return;
                }
                if (!this.addressInfo.district || this.addressInfo.district==3) {
                    this.$alert('请填写区县！');
                    return;
                }
                if (tempCity === '1') {
                    tempCity = '';
                    tempDist = '';
                }
                if (tempCity === '0') {
                    tempCity = '';
                }
                if (tempDist === '0') {
                    tempDist = '';
                }
                if (tempDist === '1') {
                    tempDist = '';
                }
                let params = {

                    addressProvince: this.addressInfo.province,
                    addressCity: tempCity,
                    addressDistrict: tempDist,
                    remark: this.characters
                };
                api.addDistribution(params).then(
                    (response) => {
                        if (response.data.code === 1) {
                            this.closeDialog();
                            this.query();
                            for (let key in this.addressInfo) {
                                this.addressInfo[key] = '';
                            }
                        } else {
                            this.$alert(response.data.message);
                        }
                    }
                );
            },


            /**
             * 删除
             */
            confirmDelete: function (id) {
                this.$confirm('配送范围删除后不可恢复，是否确认删除?', '系统提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delete(id);
                }).catch(() => {
                    this.$message({type: 'info', message: '已取消删除'});
                });
            },


            searchSubAccount: function () {
                let uerId = this.userId;
                api.getAccountById(uerId).then(
                    (response) => {
                        if (response.data.code === 1) {
                            this.accountInfo = response.data.data;
                            this.roleData.id = Number(response.data.data.roleId);
                        } else {
                            this.$alert(response.data.message)
                        }
                    }
                );
            },


            delete: function (id) {
                api.deleteDistribution(id).then(
                    (response) => {
                        if (response.data.code === 1) {
                            this.$message({type: 'success', message: '删除成功!'});
                            this.query();
                        } else if (response.data.code === 0) {
                            this.$alert(response.data.message);
                        }
                    }
                );
            },
            //获取省份信息
            getProvince () {
                api.getAreaList({'pid': 0}).then((response) => {
                    this.provincesAdd = response.data;
                });
            },
            //获取基础信息城市列表
            getCity: function (id, type) {
                if(!id) return ;
                this.citiesAdd = ''
                this.districtAdd = ''
                this.cityUpdate = ''
                this.districtUpdate = ''
                api.getAreaList({'pid': id}).then(res => {
                    if (type == 1) {
                        this.citiesAdd = res.data;
                    } else if (type == 2) {
                        this.cityUpdate = res.data;
                    }
                })
            },
            //获取基础信息区列表。
            getArea: function (id, type) {
                if (!id) return;
                api.getAreaList({'pid': id}).then(res => {
                    if (type == 1) {
                        this.districtAdd = res.data;
                    } else if (type == 2) {
                        this.districtUpdate = res.data;
                    }
                })


            },
        },

        components: {
            paging
        },

        computed: {}

    };
</script>
<style>
    .pageStyle{
        margin-right: 20px;
    }
</style>
