<template>
    <div>
        <div class="commodityAudit_crumb">
            <breadCrumb :navigationList="breadList"></breadCrumb>
        </div>
        <div class="commodityAudit_item">
            <div class="row">
                <div class="col-xs-3">
                    <div class="form-group">
                        <span class="col-xs-4 control-label commodityAudit_color">商品状态:</span>
                        <div class="col-xs-6 commodityAudit_margin">
                            <el-select v-model="shop.status" @change="getCommodity(1)">
                                <el-option
                                    v-for="item in commodityStatus"
                                    :key="item.status"
                                    :label="item.name"
                                    :data-status="item.status"
                                    :value="item.status">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="col-xs-3">
                    <div class="form-group">
                        <span class="col-xs-4 control-label commodityAudit_color">审核结果:</span>
                        <div class="col-xs-6 commodityAudit_margin">
                            <el-select v-model="shop.auditResult" @change="getCommodity(1)">
                                <el-option
                                    v-for="item in commodityResult"
                                    :key="item.index"
                                    :label="item.name"
                                    :data-status="item.index"
                                    :value="item.index">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="col-xs-2 commodityAudit_margin">
                    <el-input placeholder="商品名称/商品条码/供应商名称" icon="search" style="margin-bottom:5px"
                              v-model="shop.inputvalue" :on-icon-click="getMerchandise "></el-input>
                </div>
                <!--<div class="col-xs-1 commodityAudit_margin">-->
                    <!--<el-button type="primary" @click="getCommodity(1)">查询</el-button>-->
                <!--</div>-->
                <div class="col-xs-2 col-xs-offset-1 commodityAudit_margin">
                    <el-button type="info" @click="audit(2)">批量审核</el-button>
                </div>
            </div>
        </div>
        <div class="commodityAudit_tableParent">
            <div class="table-responsive">
                <table class="table table-bordered table-hover" style="table-layout: fixed;width:100%">
                    <thead>
                    <tr>
                        <th>
                            <input type="checkbox" @click="selectAll" :checked="test">
                        </th>
                        <th>序号</th>
                        <th @click="timeSort(shop.sortStatus)" style="cursor: pointer">提交审核时间
                            <i class="el-icon-arrow-down"
                               :class="{commodityAuditArrowUp:shop.sortStatus==1,commodityAuditArrowDown:shop.sortStatus==0}"></i>
                            <!--<i class="el-icon-arrow-up" v-show="shop.sortStatus==0"></i>-->
                        </th>
                        <th>供应商名称</th>
                        <th>商品图片</th>
                        <th>商品条码</th>
                        <th>商品名称</th>
                        <th>商品品牌</th>
                        <th>规格值</th>
                        <th>更新审核时间</th>
                        <th>审核结果</th>
                        <th>商品状态</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in commodityLists">
                        <td>
                            <input type="checkbox" :checked="item.isCheck" @click="changeChecked(index)" :value="index+1"/>
                        </td>
                        <td>{{index+1}}</td>
                        <td>{{item.createdAt}}</td>
                        <td>{{item.supplierName}}</td>
                        <td>
                            <!--正常图片-->
                            <img v-if="item.minImg && item.minImg !== 'ERROR' && item.minImg !== null"
                                @mouseover="showImg(item.minImg,$event)"
                                @mouseout="hiddenImg($event)" :src="item.minImg">
                            <!--图片正在上传中的占位图-->
                            <img v-if="item.minImg === null" src="../../../static/img/placeholder.png"
                                 style="width:50px;height:50px">
                            <!--图片上传失败的图片-->
                            <img v-if="item.minImg==='ERROR'" src="../../../static/img/uploadImgError.png"
                                 style="width: 50px;height: 50px;">
                            <!--缩略图显示-->
                            <img class="commodityAudit_tableImgHidden">
                        </td>
                        <td>{{item.code69}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.brandName}}</td>
                        <td>{{item.ruleVal}}</td>
                        <td>{{item.updatedAt}}</td>
                        <!--审核结果-->
                        <td v-show="item.auditResult==0" class="commodityAudit_noPass">
                            <!--<el-alert v-show="item.auditResult==0" class="commodityAudit_content"-->
                                      <!--title="审核未通过原因"-->
                                      <!--type="warning"-->
                                      <!--:closable="false"-->
                                      <!--:description="item.auditOpinion">-->
                            <!--</el-alert>-->
                            <div class="commodityAudit_auditMessage" v-show="item.auditResult==0">
                                <p class="commodityAudit_auditMessage">未通过</p>
                                <p>{{item.auditOpinion}}</p>
                            </div>
                        </td>
                        <td v-show="item.auditResult==1" class="commodityAudit_noPass">通过</td>
                        <td v-show="item.auditResult==2" class="commodityAudit_noPass">待审核</td>
                        <!--商品状态-->
                        <!--<td v-show="item.status==0" class="commodityAudit_state">待上架</td>-->
                        <td v-show="item.status==1" class="commodityAudit_state">已废除</td>
                        <td v-show="item.status==2" class="commodityAudit_state">已上架</td>
                        <td v-show="item.status==3" class="commodityAudit_state">已下架</td>
                        <td v-show="item.status==4" class="commodityAudit_state">上架待审核</td>
                        <td v-show="item.status==5" class="commodityAudit_state">下架待审核</td>
                        <td v-show="item.status==6" class="commodityAudit_state">编辑待审核</td>
                    </tr>
                    <tr v-if=" commodityLists && commodityLists.length===0">
                        <td colspan="19">
                            没有数据记录
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <commodityAuditBtn :commodityLists="commodityLists" @Audit="audit" @Jump="jump"></commodityAuditBtn>
        </div>
        <div class="commodityAudit_paging">
            <!--<paging ref="page" :page-num="pageTotal" :current-page="shop.pageNum" @change="change"-->
                    <!--v-on:changeR="changeRows"></paging>-->
            <el-pagination
                           @size-change="changeRows"
                           @current-change="change"
                           :current-page="shop.pageNum"
                           :page-sizes=commoditySize
                           :page-size="shop.pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="commodityTotal">
            </el-pagination>
        </div>
        <!--模态框审核-->
        <el-dialog
            title="商品审核"
            v-model="dialogVisible"
            :close-on-click-modal="false">
            <div class="radio" style="margin-top:-10px">
                <label>
                    <input type="radio" name="optionsRadios" @change="show(1)" v-model="optionsRadiosPass"style="margin-top:10px">
                    审核通过
                </label>
            </div>
            <div class="radio" style="margin-top:-20px">
                <label>
                    <input type="radio" name="optionsNoRadios" @change="show(0)" v-model="optionsRadiosNoPass" style="margin-top:10px">
                    审核不通过
                </label>
            </div>
            <textarea class="form-control" rows="3" v-show="textShow" placeholder="审核不通过，需要输入拒绝理由,纯文本,200字符内"
                      v-model="commodityText" maxlength="200" style="margin-top:53px"></textarea>
            <div slot="footer" class="dialog-footer">
                <el-button size="large" @click="cancel()">取消</el-button>
                <el-button type="info" @click="commit()" size="large">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import '../../../static/css/commodityAudit.less';
    import paging from '../../components/page';
    import commodityAuditBtn from '../../components/supplier/commodityAuditBtn'
    import breadCrumb from '../../components/Breadcrumb';
    import axios from 'axios';
    import api from '../../api/comm';
    import {mapGetters} from 'vuex';
    export default {
        created() {
            this.queryCommodity()
          //  this.getCommodity()
//            this.userId = JSON.parse(window.localStorage.getItem('account')).id
            this.userId = JSON.parse(sessionStorage.getItem('vuex')).user.account.id
        },
        data() {
            return {
                commoditySize:[10,20,40],
                //面包屑导航
                breadList:[
                    {name:' 商品管理'},
                    {name:'商品审核'}
                ],
                pageTotal: 1,
                test: false,
                userId: '', //管理员ID
                scId: '',       //商品ID
                commodityText: '',
                ids: [],
                optionsRadiosPass: '',
                optionsRadiosNoPass: '',
                commodityStatus: [
                    { status: '', name: '全部' },
//                    {status: 0, name: '待上架'},
                    { status: 2, name: '已上架' },
                    { status: 3, name: '已下架' },
                    { status: 4, name: '上架待审核' },
                    { status: 5, name: '下架待审核' },
                    { status: 6, name: '编辑待审核' }
                ],
                commodityResult: [
                    { name: '全部', index: '' },
                    { name: '待审核', index: 2 },
                    { name: '通过', index: 1 },
                    { name: '未通过', index: 0 }
                ],
                shop: {
                    status: '',
                    auditResult: 2,
                    pageNum: 1,
                    pageSize: 10,
                    inputvalue: '',
                    sortStatus: 0
                },
                result: '',
                commodityPass: '',
                commodityNoPass: '',
                checked: '',
                checkboxModel: '',
                dialogVisible: false,
                addLoading: false,
                textShow: false,
                commodityLists: [],
                dataArr: [],
                pageInfo:{},        //用于保存详情返回所有的数据状态
                commodityTotal:null,
            }
        },
        methods: {
            //查询，获得数据
            queryCommodity(){
                if (this.$store.getters.returnFlag){
                    this.shop = this.$store.getters.pageInfo
                    this.$store.dispatch('setFlag', false);
                    this.getCommodity()
                }else {
                    this.getCommodity()
                }
            },
            //输入框迷糊查找
            getMerchandise(){
                this.shop.pageNum = 1;
                this.getCommodity();
            },
            //跳转详情 保存数据
            jump(Id,type){
                this.$router.push({path:'/commodityAuditInfo',query:{commodityId:Id,auditResult:type}})
                this.pageInfo = this.shop ;
                this.$store.dispatch('setPageInfo',this.pageInfo);
            },
            //列表时间正倒序排列
            timeSort(type) {
                this.shop.pageNum = 1;
                this.shop.sortStatus === 0 ? this.shop.sortStatus = 1 : this.shop.sortStatus = 0;
                this.getCommodity();
            },
            //正选
            changeChecked(index) {
                let temp = '';
                if (this.commodityLists[index].isCheck) {
                    this.commodityLists[index].isCheck = false;
                } else if (!this.commodityLists[index].isCheck) {
                    this.commodityLists[index].isCheck = true;
                }
                for (let item in this.commodityLists) {
                    if (this.commodityLists[item].isCheck) {
                        temp = true;
                    } else if (this.commodityLists[item].isCheck === false) {
                        this.test = false;
                        temp = false;
                        return;
                    }
                }
                if (temp) {
                    this.test = true;
                }
            },
            //对后端返回的数据做处理
            processingData(){
                for (let key in  this.commodityLists) {
                    this.commodityLists[key].isCheck = false;
                    if (this.commodityLists[key].price % 1 === 0) {
                        this.commodityLists[key].price = this.commodityLists[key].price + '.00';

                    }
                    if (this.commodityLists[key].unitPrice % 1 === 0) {
                        this.commodityLists[key].unitPrice = this.commodityLists[key].unitPrice + '.00';
                    }
                }
            },
            //首页加载获取商品信息
            getCommodity(type) {
                if (type == 1) {
                    this.shop.pageNum = 1
                }
                api.getCommodity(this.shop)
                     .then(res => {
                        if (res.data.code == 1) {
                            //做后端返回数据做非空处理
                            this.commodityLists = res.data.data ? res.data.data.list : [];
                            this.commodityTotal = res.data.data.total;
                            this.processingData();
                            this.pageTotal = Math.floor((res.data.data.total % this.shop.pageSize) == 0 ? (res.data.data.total / this.shop.pageSize) : (res.data.data.total / this.shop.pageSize) + 1)
                        } else if (res.data.code == 0) {
                            this.commodityLists = []
                        }
                    })
            },
            //点击模态框 清除所有数据
            clearData(Id){
                this.optionsRadiosNoPass = ''
                this.commodityPass = ''
                this.commodityNoPass = ''
                this.result = ''
                this.commodityText = ''
                this.dataArr = []
                this.textShow = false
                this.dialogVisible = true
                this.supplierId = Id
            },
            //点击审核触发模态框
            audit(type, Id) {
                //1: 清空之前所有的状态（单个审核）
                if (type == 1) {
                    //清除所有状态
                    this.clearData(Id);
                    this.dataArr.push(this.supplierId);
                } else if (type == 2) {
                    //2: 批量审核模态框清除所有的状态
                    this.dataArr = [];
                   //状态判断
                   if(this.modalStatue()===false){
                       return;
                   }
                    this.dialogVisible = true;
                    for (let i in this.commodityLists) {
                        if (this.commodityLists[i].isCheck) {
                            this.dataArr.push(this.commodityLists[i].id);
                        }
                    }
                }
            },
            //对模态框非空以及状态判断
            modalStatue(){
                let temp = null
                let tempArr = [];
                for (let item in this.commodityLists) {
                    if (!this.commodityLists[item].isCheck) {
                        tempArr.push('1');
                    }
                    if (this.commodityLists[item].status === 2 && this.commodityLists[item].isCheck) {
                        this.$alert("批量选择的状态有误！请重新选择！！！");
                        return false;
                    }
                    if (this.commodityLists[item].status === 3 && this.commodityLists[item].isCheck) {
                        this.$alert("批量选择的状态有误！请重新选择！！！");
                        return false;
                    }
                }
                if (tempArr.length === this.commodityLists.length) {
                    this.$alert("批量选择个数不能为空！");
                        return false;
                }
            },
            //模态框（确定按钮）功能
            commit() {
//                let textCheck = /^[\u4E00-\u9FA5A-Za-z0-9]{1,200}$/
//                if (this.commodityNoPass === 0 && (this.commodityText) && (!textCheck.test(this.commodityText))) {
//                    this.$alert('你输入的方式有误!')
//                    this.commodityText = ''
//                    return
//                }
                if (this.commodityPass == 1) {
                    this.result = this.commodityPass;
                    this.getbulk(this.result);
                } else if (this.commodityNoPass == 0 && this.commodityText) {
                    this.result = this.commodityNoPass;
                    this.getbulk(this.result);
                } else if (this.commodityNoPass !== 1 && this.commodityNoPass !== 0) {
                    this.$alert('选择方式不能为空');
                }
                else if (this.commodityNoPass === 0 && (!this.commodityText)) {
                    this.$alert('必须输入内容');
                    return;
                }
            },
            //模态框（取消按钮功能）
            cancel() {
                //清除所有当前状态
                this.optionsRadiosPass = '';
                this.optionsRadiosNoPass = '';
                this.commodityPass = '';
                this.commodityNoPass = '';
                this.dataArr = [];
                this.result = '';
                this.commodityText = '';
                this.dialogVisible = false;
                this.textShow = false;
            },
            //审核查询
            getAuditCommodity() {
                //将当前页数置为1
                if (this.shop.pageNum !== 1) {
                    this.shop.pageNum = 1;
                }
                //调用查询接口
                this.getCommodity()
            },
            show(type) {
                //1：审核通过  清除之前所有状态
                if (type === 1) {
                    this.optionsRadiosNoPass = '';
                    this.commodityPass = type;
                    this.commodityNoPass = '';
                    this.textShow = false;
                } else if (type === 0) {
                    //0:审核不通过选项  清除之前所有状态
                    this.optionsRadiosPass = '';
                    this.commodityPass = '';
                    this.commodityNoPass = type;
                    this.textShow = true;
                }
            },
            //分页选择  index:下标
            change(index) {
                this.shop.pageNum = index;
                this.getCommodity()
            },
            //每页选择  row:个数
            changeRows(row) {
                this.shop.pageSize = row;
                this.shop.pageNum = 1;
                this.getCommodity()
            },
            //商品批量审核请求(通过)
            getbulk() {
                let that = this
                let obj = {
                    ids: this.dataArr,
                    userId: parseFloat(this.userId),
                    auditResult: this.result,
                    auditOpinion: this.commodityText
                }
                api.getBulk(obj)
                  //  发送请求
//                axios({
//                    method: 'post',
//                    url: '/comm/audit/bulk',
//                    data: {
//                        ids: this.dataArr,
//                        userId: parseFloat(this.userId),
//                        auditResult: this.result,
//                        auditOpinion: this.commodityText
//                    }
//                }).
                    .then(function (res) {
                    if (res.data.code == 1) {
                        //请求成功后 将模态框隐藏 清除所有状态
                        that.dialogVisible = false;
                        that.$alert(res.data.message);
                        that.optionsRadiosPass = '';
                        that.optionsRadiosNoPass = '';
                        that.commodityPass = '';
                        that.commodityNoPass = '';
                        that.dataArr = [];
                        that.result = '';
                        that.commodityText = '';
                        that.getAuditCommodity();
                    } else {
                        that.dialogVisible = false;
                        that.$alert(res.data.message);
                    }
                })
            },
            //正反选(全选功能)
            selectAll() {
                if (this.test) {
                    for (let i in this.commodityLists) {
                        this.commodityLists[i].isCheck = false
                    }
                    this.test = false
                } else {
                    for (let i in this.commodityLists) {
                        this.commodityLists[i].isCheck = true
                    }
                    this.test = true
                }
            },
            //图片放大放小
            showImg(data, event) {
                if (data === '') { //判断图片不存在的话,放大的那张图片也就不显示了
                    event.target.nextElementSibling.src = '';
                } else {
                    //图片存在  将地址输入在要显示的区域
                    event.target.nextElementSibling.src = data;
                    event.target.nextElementSibling.classList.add('commodityAudit_tableImgDisplay');
                }
            },
            //图片隐藏
            hiddenImg(event) {
                event.target.nextElementSibling.src = '';
                event.target.nextElementSibling.classList.remove('commodityAudit_tableImgDisplay');
            },
        },
        watch: {//深度 watcher
            'ids': {
                handler: function (val, oldVal) {
                    if (this.ids.length === this.commodityLists.length) {
                        this.checked = true
                    } else {
                        this.checked = false
                    }
                },
                deep: true
            }
        },
        components: {
            paging,commodityAuditBtn,breadCrumb
        }
    }
</script>


