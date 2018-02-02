<template>
    <div id="systemFreightRules">
        <!-- 页面导航 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-date"></i> 系统设置</el-breadcrumb-item>
            <el-breadcrumb-item><a href="javascript:location.reload();">运费规则</a></el-breadcrumb-item>
        </el-breadcrumb>

        <div class="containers">
            <!-- 1.默认运费规则切换 -->
            <el-row>
                <el-col :span="24">
                    <div class="gridContent">
                        <span> 当前正在使用: </span>
                        <span>{{defaultFreightRules}}</span>&nbsp;
                        <el-button type="primary" size="small" :disabled="isDisabled" :title="ruleMessage" @click="switchFreightRules">切换</el-button>
                    </div>
                </el-col>
            </el-row>
            <!-- 2.通用物流运费规则 -->
            <div>
                <el-row>
                    <el-col :span="24">
                        <div class="gridContent">1. 按照通用物流运费规则</div>
                        <el-button v-if="generalRuleButton" type="primary" @click="setFreightrules('',0)">+新增通用物流运费规则</el-button>
                    </el-col>
                </el-row>
                <div v-if="generalRuleTable">
                    <!--table表格部分-->
                    <el-table :data="generalRuleData.list" border style="width: 100%">
                        <el-table-column label="是否包邮" header-align="center">
                            <!-- 0-卖家承担运费(包邮)，1-买家承担运费（不包邮） -->
                             <template scope="scope">
                                <span v-if="scope.row.whetherShipping==1"> 买家承担运费</span>
                                <span v-else>卖家承担运费</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="最小起送金额" header-align="center">
                            <template scope="scope">
                                <span v-if="scope.row.sendAmount===null || scope.row.sendAmount===''">—</span>
                                <span v-else>{{scope.row.sendAmount}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="默认运费" header-align="center">
                            <template scope="scope">
                                <span v-if="!scope.row.defaultPiece && (scope.row.defaultAmount===null || scope.row.defaultAmount==='')">—</span>
                                <span v-else>{{scope.row.defaultPiece}}件商品内，{{scope.row.defaultAmount}}元</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="超量运费" header-align="center">
                            <template scope="scope">
                                <span v-if="!scope.row.excessPiece && (scope.row.excessAmount===null || scope.row.excessAmount==='')">—</span>
                                <span v-else>每增加{{scope.row.excessPiece}}件，运费增加{{scope.row.excessAmount}}元</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="物流费用备注" width="300" header-align="center">
                            <template scope="scope">
                                <span v-if="scope.row.remark===null || scope.row.remark===''">—</span>
                                <span v-else class="remarkstyle"> {{scope.row.remark}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="150" header-align="center">
                            <template scope="scope">
                                <el-button type="warning" size="small" @click="setFreightrules(scope.row.id, 1)">编辑</el-button> 
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>

            <!-- 3.按照配送地区物流运费规则 -->
            <div class="localRule-style">
                <el-row>
                    <el-col :span="24">
                        <div class="gridContent">2. 按照配送地区物流运费规则</div>
                    </el-col>
                </el-row>
                <div v-if="isShowLocalRulesPage===false">
                    <span class="showlocalRule">&nbsp;&nbsp;尚未添加配送地区信息</span>
                </div>
                <div v-else>
                    <!--table表格部分-->
                    <el-table :data="localRuleData.list" border style="width: 100%">
                        <el-table-column prop="addressProvince" label="省/直辖市" header-align="center"></el-table-column>
                        <el-table-column label="市级" header-align="center">
                             <template scope="scope">
                                <span v-if="!scope.row.addressCity"> 全部市</span>
                                <span v-else>{{scope.row.addressCity}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="县/区" header-align="center">
                             <template scope="scope">
                                <span v-if="!scope.row.addressDistrict"> 全部区</span>
                                <span v-else>{{scope.row.addressDistrict}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="是否包邮" width="150" header-align="center">
                            <!-- 0-卖家承担运费(包邮)，1-买家承担运费（不包邮） -->
                             <template scope="scope">
                                <span v-if="scope.row.whetherShipping==1"> 买家承担运费</span>
                                <span v-else>卖家承担运费</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="最小起送金额"  width="150" header-align="center">
                            <template scope="scope">
                                <span v-if="scope.row.sendAmount===null || scope.row.sendAmount===''">—</span>
                                <span v-else>{{scope.row.sendAmount}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="默认运费" min-width="150" header-align="center">
                            <template scope="scope">
                                <span v-if="!scope.row.defaultPiece && (scope.row.defaultAmount===null || scope.row.defaultAmount==='')">—</span>
                                <span v-else>{{scope.row.defaultPiece}}件商品内，{{scope.row.defaultAmount}}元</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="超量运费" min-width="150" header-align="center">
                            <template scope="scope">
                                <span v-if="!scope.row.excessPiece && (scope.row.excessAmount===null || scope.row.excessAmount==='')">—</span>
                                <span v-else>每增加{{scope.row.excessPiece}}件，运费增加{{scope.row.excessAmount}}元</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="物流费用备注" width="250" header-align="center">
                            <template scope="scope">
                                <span v-if="scope.row.remark===null || scope.row.remark===''">—</span>
                                <span v-else class="remarkstyle"> {{scope.row.remark}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="100" header-align="center">
                            <template scope="scope">
                                <el-button v-if="scope.row.whetherShipping===0 || scope.row.whetherShipping===1" type="warning" size="small" @click="setFreightrules(scope.row.id,2)">编辑</el-button>
                                <el-button v-else type="info" size="small" @click="setFreightrules(scope.row.id,3)">新增</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <!--分页-->
        <div v-if="isShowLocalRulesPage" class="pull-right block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="paging.pageNum":page-sizes="pageList":page-size="paging.pageSize" :total="paging.total"
                    layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
        </div>
        <!--新建、编辑运费规则模态框 Form-->
        <el-dialog title="运费规则设置" :visible.sync="dialogFormVisible">
            <el-form :model="formData" :label-position="labelPosition" label-width="120px">
                <el-form-item label="是否包邮:">
                    <!-- 0-卖家承担运费(包邮)，1-买家承担运费（不包邮） -->
                    <el-radio-group v-model="formData.whetherShipping">
                        <el-radio v-bind:label="0">卖家承担运费</el-radio>
                        <el-radio v-bind:label="1">买家承担运费</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="最小起送金额:" >
                    <el-input  class="col-lg-4" v-model.trim="formData.sendAmount" placeholder="整数金额" auto-complete="off" ></el-input> 元
                </el-form-item>
                <el-form-item label="默认计件运费:">
                    <el-col :span="12">
                        <el-input class="col-lg-8" v-model.trim="formData.defaultPiece" placeholder="整数单位" auto-complete="off"></el-input>
                        <span>件内，</span>
                     </el-col>
                     <el-col :span="12">
                        <el-input class="col-lg-8" v-model.trim="formData.defaultAmount" placeholder="整数金额" auto-complete="off"></el-input> 元
                     </el-col>
                </el-form-item>
                <el-form-item label="超量费用:每增加">
                    <el-col :span="12">
                        <el-input class="col-lg-6" v-model.trim="formData.excessPiece" placeholder="整数单位" auto-complete="off"></el-input>
                        <p> 件，运费增加</p>
                    </el-col>
                     <el-col :span="12">
                        <el-input class="col-lg-8" v-model.trim="formData.excessAmount" placeholder="整数金额" auto-complete="off"></el-input> 元
                    </el-col>
                </el-form-item>
                 <el-form-item label="物流费用备注:">
                    <el-input class="col-lg-10" v-model.trim="formData.remark" placeholder="100个字以内" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="createFreightRules(postStatus)">保 存</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>

        <!-- 切换配送规则对话框 -->
        <el-dialog title="运费规则切换" :visible.sync="dialogRulesChange" size="tiny">
            <el-radio-group v-model="defaultFreightRulesValue" >
                <el-row class="radio-row">
                    <el-radio :label="0">按照通用物流运费规则</el-radio>
                </el-row>
                <el-row class="radio-row">
                    <el-radio :label="1">按照配送地区物流运费规则</el-radio>
                </el-row>
            </el-radio-group>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="updateFreightRules">确 定</el-button>
                <el-button @click="dialogRulesChange = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import Vue from 'vue'
    import VueResource from 'vue-resource'
    import globalData from '../../common/global'
    import api from '../../api'
    import paging from '../../components/page'

    export default {
        data: function() {
            return{
                //规则切换参数
                isDisabled: false, //切换按钮是否Disabled
                defaultFreightRules: '未配置运费规则', //默认 未配置运费规则 0-通用运费规则, 1-配送地区物流费用规则
                defaultFreightRulesValue: '0',
                dialogRulesChange: false, //规则切换弹出页面对话框控制
                ruleMessage:'只有当两种配送规则都完善后才可以切换！', //切换按钮提示
                //通用配置是否显示
                generalRuleButton: true, //新建通用规则按钮
                generalRuleTable: false, //通用运费规则列表

                //新建、编辑运费规则弹出页面
                dialogFormVisible: false, //对话框是否显示
                postStatus:'0', // 0,1 - 添加、修改通用物流运费规则；2,3 - 新增、修改 按照配送地区物流运费规则
                //通用运费规则查询参数
                generalRulesPage: {pageNum: 1, pageSize: 10, rulesType: 0 },
                //地区运费配送规则分页查询参数
                isShowLocalRulesPage: false, //
                paging:{pageNum: 1, pageSize: 10,total: 1, pageTotal: 10, rulesType: 1 },
                pageList:[10,20,40], //每页选择的个数选项
                //
                id: '',
                formData: {
                    id:'',
                    supplierId:'',
                    addressProvince: '',   //省
                    addressCity: '', //市
                    addressDistrict: '',
                    whetherShipping: 1,//0-卖家承担运费(包邮)，1-买家承担运费（不包邮）
                    rulesType:'', //0-通用运费规则,1-配送地区物流费用规则
                    sendAmount: '',//起送金额
                    defaultPiece: '',//默认计件
                    defaultAmount:'',//运费基础金额
                    excessPiece:'',//超量计件
                    excessAmount: '',//运费增加金额
                    remark: ''
                },
                generalRuleData: {}, //通用运费规则数据
                localRuleData: {}, //配送地区物流费用规则
                labelPosition: 'left',
		    }
        },
        created() {
            this.accountId = this.$route.query.accountId;
            this.getGeneralRules(); //获取通用物流运费规则
            this.getLocalRules();// 获取配送地区物流费用规则
        },
        methods: {
            /**
             * 获取通用物流运费规则
             */
            getGeneralRules: function () {
                let params = this.generalRulesPage;
                api.getGeneralRules(params).then(
                    (response) => {
                        if (response.data.code === 1) {
                            // console.log(JSON.stringify(response.data));
                            this.generalRuleData = response.data.data.data;
                            this.defaultFreightRulesValue = response.data.data.freightRules;
                            if(response.data.data.freightRules===0){
                                this.defaultFreightRules='通用运费规则';
                            }else if(response.data.data.freightRules===1){
                                this.defaultFreightRules='配送地区物流费用规则';
                            }else{
                                this.defaultFreightRules='未配置运费规则';
                            }
                            this.isDisabled = response.data.data.isAll===0? true : false;  //是否可编辑
                            //设置通用规则是否显示 - 如果通用规则有数据则展示
                            if(this.generalRuleData.list.length > 0){
                                this.generalRuleButton = false;
                                this.generalRuleTable = true;
                            }
                        }else if (response.data.code === 0) {
                            this.$alert(response.data.message)
                        }
                    }
                )
            },
            /**
             * 获取配送地区物流运费规则
             */
            getLocalRules: function () {
                let params = this.paging;
                api.getGeneralRules(params).then(
                    (response) => {
                        if (response.data.code === 1) {
                            this.localRuleData = response.data.data.data;
                            if(!this.localRuleData.list || this.localRuleData.list.length > 0){
                                this.isShowLocalRulesPage = true;
                            }
                            this.isDisabled = response.data.data.isAll===0? true : false;  //是否可编辑
                            this.paging.pageNum = response.data.data.data.pageNum;
                            this.paging.pageSize = response.data.data.data.pageSize;
                            this.paging.total = response.data.data.data.total
                            this.paging.pageTotal = response.data.data.data.pages
                        }else if (response.data.code === 0) {
                            this.$alert(response.data.message)
                        }
                    }
                )
            },
             /**
             * 根据id获取配送地区物流运费规则
             */
            getLocalRuleById: function (id) {
                api.getLocalRuleById(id).then(
                    (response) => {
                        if (response.data.code === 1) {
                            this.formData = response.data.data;
                            // console.log(JSON.stringify(this.formData));
                            //设置默认选项 0-卖家承担运费(包邮)，1-买家承担运费（不包邮）
                            if(this.formData.whetherShipping === null){
                                this.formData.whetherShipping = 1;
                            }
                        } else if (response.data.code === 0) {
                            this.$alert(response.data.message)
                        }
                    }
                )
            },
            /**
             * 点击切换按钮打开弹出页面
             */
            switchFreightRules: function(){
                // this.defaultFreightRulesValue = this.defaultFreightRules;
                this.dialogRulesChange = true;
            },
            /**
             * 切换默认运费规则的方法
             */
            updateFreightRules: function(){
                this.dialogRulesChange = false;
                api.updateFreightRules(this.defaultFreightRulesValue).then(
                    (response) => {
                        if (response.data.code === 1) {
                            this.getGeneralRules();
                            // console.log(JSON.stringify(response.data));
                        } else if (response.data.code === 0) {
                            this.$alert(response.data.message);
                        }
                    }
                )
            },
            /**
             * 弹出框页面数据控制
             */
            setFreightrules: function(id, data) {
                this.dialogFormVisible = true;
                this.postStatus = data;
                //新建通用规则时清空表单数据
                if(data === 0){
                    this.formData = {
                        whetherShipping: 1,//0-卖家承担运费(包邮)，1-买家承担运费（不包邮）
                        rulesType:'', //0-通用运费规则,1-配送地区物流费用规则
                        sendAmount: '',//起送金额
                        defaultPiece: '',//默认计件
                        defaultAmount:'',//运费基础金额
                        excessPiece:'',//超量计件
                        excessAmount: '',//运费增加金额
                        remark: ''
                    };
                }
                //编辑通用规则 -数据回显
                if(data === 1){
                    for (let prop in this.generalRuleData.list[0]) {
                        this.formData[prop] = this.generalRuleData.list[0][prop];
                    }
                }
                //配送地区物流运费规则 2：新建，3：编辑
                if(data === 2 || data === 3){
                    this.getLocalRuleById(id);
                }

            },
            /**
             * data：0,1 - 添加、修改通用物流运费规则；
             * data：2,3 - 新增、修改 按照配送地区物流运费规则
             */
            createFreightRules: function(data){
                /**
                 * 是否包邮whetherShipping：0-卖家承担运费(包邮)，1-买家承担运费（不包邮）
                 * 最⼩小起订⾦金金额（可以为空，为空时表⽰示不限），
                 * 默认计件运费件数（整数单位，买家承担运费时不可为空），
                 * 运费金额（整数金额，买家承担运费时不可为空）
                 * 超量量运费每增加件数（整数单位，买家承担运费时不可为空）
                 * 超量量运费增加金额（整数金额，买家承担运费时不可为空）
                 */
                if (this.formData.whetherShipping ===null) {
                    this.$alert('请选择是否包邮!');
                    return
                }
                if (this.formData.sendAmount && !/^\d{0,8}$/.test(Number(this.formData.sendAmount))){
                    this.$alert('起送金额必须为0-99999999内的整数金额!')
                    return
                }
                if (this.formData.defaultPiece &&  !/^[1-9][0-9]{0,8}$/.test(Number(this.formData.defaultPiece))) {
                    this.$alert('默认计件必须为1-999999999内的整数!');
                    return
                }
                if (this.formData.defaultAmount && !/^\d{0,8}$/.test(Number(this.formData.defaultAmount))) {
                    this.$alert('运费金额必须为0-99999999内的整数金额!');
                    return
                }
                if (this.formData.excessPiece && !/^[1-9][0-9]{0,8}$/.test(Number(this.formData.excessPiece))) {
                    this.$alert('超量运费每增加件数必须为1-999999999内的整数!');
                    return
                }
                if (this.formData.excessAmount && !/^\d{0,8}$/.test(Number(this.formData.excessAmount))) {
                    this.$alert('超量运费增加金额必须为0-99999999内的整数金额!');
                    return
                }
                if(this.formData.whetherShipping ===1){
                    if (!this.formData.defaultPiece) {
                        this.$alert('默认计件不能为空!');
                        return
                    }
                    if(this.formData.defaultAmount === null || this.formData.defaultAmount===''){
                        this.$alert('运费金额不能为空!');
                        return
                    }
                    if (!this.formData.excessPiece) {
                        this.$alert('超量运费每增加件数不能为空!');
                        return
                    }
                    if (this.formData.excessAmount ===null || this.formData.excessAmount==='') {
                        this.$alert('超量运费增加金额不能为空!');
                        return
                    }

                }
                if (this.formData.remark !=null && this.formData.remark.length > 100) {
                    this.$alert('备注不能大于100字符!');
                    return
                }
                this.dialogFormVisible = false;
                // data:0 - 添加通用规则
                if (data === 0) {
                    this.createGeneralRules();
                }
                // data:1 - 编辑通用规则
                if (data === 1) {
                    this.updateGeneralRules();
                }
                // data:2/3 - 新建、编辑配送地区物流费用规则
                if (data === 2 || data === 3) {
                    this.createOrUpdateLocalRules();
                }
            },
            /**
             * 新建通用规则
             */
            createGeneralRules: function(){
                this.formData.rulesType = 0;
                let params = this.formData;
                api.createGeneralRules(params).then(
                    (response) => {
                        if (response.data.code === 1) {
                            this.dialogFormVisible = false;
                            this.getGeneralRules();
                            this.getLocalRules();
                        } else if (response.data.code === 0) {
                            this.$alert(response.data.message);
                        }
                    }
                )
            },
            /**
             * 编辑通用规则
             */
            updateGeneralRules: function(){
                let ruledata = this.generalRuleData.list[0];
                let params = this.formData;
                api.createOrUpdateLocalRules(ruledata.id, params).then(
                    (response) => {
                        if (response.data.code === 1) {
                            this.dialogFormVisible = false;
                            this.getGeneralRules();
                            this.getLocalRules();
                        } else if (response.data.code === 0) {
                            this.$alert(response.data.message);
                        }
                    }
                )
            },
            /**
             * 新建、编辑配送地区物流费用规则
             */
            createOrUpdateLocalRules: function(){
                this.formData.rulesType = 1;
                let id = this.formData.id;
                let params = this.formData;
                api.createOrUpdateLocalRules(id, params).then(
                    (response) => {
                        if (response.data.code === 1) {
                            this.dialogFormVisible = false;
                            this.getGeneralRules();
                            this.getLocalRules();
                        } else if (response.data.code === 0) {
                            this.$alert(response.data.message);
                        }
                    }
                )
            },
            // 分页
            handleSizeChange(row){
                this.paging.pageNum = 1;
                this.paging.pageSize = row;
                this.getLocalRules();
            },
            handleCurrentChange(index){
                this.paging.pageNum = index;
                this.getLocalRules();
            },

        },
        components: {
            paging
        }
    }
</script>
<style scoped>
    .containers{
        min-width: 1000px;
        margin: 20px 0;
    }
    .gridContent {
        line-height: 36px;
        font-size: 1.5rem;
        padding: 5px 0;
        font-weight: bold;
    }
    .gridContent > span { font-weight: bold; }
    .radio-row{
        height: 40px;
        margin: 10px;
    }
    .remarkstyle{
        max-width:200px;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
    }
    .showlocalRule{
         font-size: 15px;
         color: #20a0ff;
         margin: 10px;
    }
</style>
