<template>
    <div>
        <mybreadcrumb :navigationList="navigationList"></mybreadcrumb>
        <div class="row clearMargin publicHeader search-arrange">
            <div >
                <label>收款类型</label>
                <el-select v-model="queryObj.receiptType">
                    <el-option v-for="item in receiptTypes" :label="item.name" :key="item.value" :value="item.value"></el-option>
                </el-select>
            </div>
            <div>
                <label>对账结果</label>
                <el-select v-model="queryObj.checkType">
                    <el-option v-for="item in checkTypes" :label="item.name" :key="item.value" :value="item.value"></el-option>
                </el-select>
            </div>
            <div>
                <label>完成状态</label>
                <el-select v-model="queryObj.completeType">
                    <el-option v-for="item in completeTypes" :label="item.name" :key="item.value" :value="item.value"></el-option>
                </el-select>
            </div>
            <div class="block">
                <span class="demonstration">支付时间</span>
                <el-date-picker v-model="queryObj.dates" range-separator="至"
                                type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </div>
            <el-input placeholder="订单号/支付流水号" v-model="queryObj.inputVal" ></el-input>
            <div>
                <label>供应商名称</label>
                <el-input placeholder="请输入供应商名称" v-model="queryObj.storeName" ></el-input>
            </div>
            <el-button type="info" @click="clickSearch"><i class="el-icon-search"></i>&nbsp;查询</el-button>
        </div>
        <div >
            <div class="financialOrder-Btn ">
                <el-button class="" type="info" @click="showDialogMatching(1)" >
                    <i class="el-icon-upload"></i>&nbsp;导入匹配
                </el-button>
                <el-button class="" type="info" @click="matchedHistory">
                    <i class="el-icon-view"></i>&nbsp;上次匹配记录
                </el-button>
            </div>
            <!--table表格部分-->
            <el-table :data="financialOrderList" border style="width: 100%">
                <el-table-column type="index" label="序号" width="70" header-align="center"></el-table-column>
                <el-table-column prop="orderId" label="订单编号"  width="280" header-align="center"></el-table-column>
                <el-table-column prop="storeName" label="供应商名称"  min-width="200" header-align="center"></el-table-column>
                <el-table-column prop="orderPaymentNum" label="支付宝流水号" width="280" header-align="center"></el-table-column>
                <el-table-column prop="receiptTypeText" label="收款类型" min-width="110" header-align="center"></el-table-column>
                <el-table-column prop="checkingTypeText" label="对账结果" min-width="110" header-align="center"></el-table-column>
                <el-table-column prop="orderStatusText" label="完成状态" min-width="110" header-align="center"></el-table-column>
                <el-table-column prop="payTime" label="支付时间" width="170" header-align="center"></el-table-column>
                <el-table-column prop="checkingTime" label="核账时间"  width="170" header-align="center"></el-table-column>
                <el-table-column label="实收金额" width="150" header-align="center">
                    <template scope="scope">
                        {{scope.row.paymentMoney | formatPrice}}
                    </template>
                </el-table-column>
                <el-table-column  fixed="right" label="操作" width="200" header-align="center">
                    <template scope="scope">
                        <el-button size="small" type="info" @click="paymentRecord(scope.row.orderId)">支付记录</el-button>
                        <el-button size="small" type="info" @click="goToDetail(scope.row.orderId)">订单详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 分页 -->
        <div v-if="financialOrderList.length>0" class="pull-right block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="paging.pageNum":page-sizes="pageList":page-size="paging.pageSize" :total="paging.total"
                           layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
        </div>
        <!-- 上传Excel对话框 -->
        <el-dialog title="导入excel" :visible.sync="dialogMatching" size="tiny" center="true">
            <el-form class="financial-reconciliation">
                <el-form-item  class="financial-header">
                    <el-upload :multiple="false"
                               accept=".xlsx"
                               :action="baseUrl+'/checkingRecord/uploadAccountCheckingExcel'"
                               :headers="headers"
                               :on-success="uploadSuccess"
                               :on-error="uploadError"
                               :on-remove="removeFile"
                               :before-upload="beforeAvatarUpload"
                               :file-list="fileList" style="display: block">
                        <el-button type="primary" v-if="this.uploadStatus===0">
                            <i class="el-icon-upload"></i>&nbsp;上传提交
                        </el-button>
                        <el-button type="info" disabled v-else-if="this.uploadStatus===1">
                            已完成
                        </el-button>
                        <el-button type="primary" v-else>
                            <i class="el-icon-upload"></i>&nbsp;重新提交
                        </el-button>
                        <div slot="tip" class="el-upload__tip">只能上传.xlsx格式文件，且大小不超过50M</div>
                    </el-upload>
                </el-form-item>
                <el-form-item  class="financial-content">
                    <div v-if="this.uploadStatus===2" style="font-color:red;">上传失败</div>
                    <div v-if="this.uploadStatus===1">上传成功</div>
                </el-form-item>
                <el-form-item class="financial-footer">
                    <el-button type="primary" v-if="this.uploadStatus===1" @click="showDialogMatching(2)" >下一步</el-button>
                    <el-button type="primary" v-else disabled="disabled">下一步</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 匹配对账 对话框 -->
        <el-dialog title="匹配对账" :visible.sync="dialogFinancialMatching" size="tiny">
            <el-form class="financial-reconciliation">
                <el-form-item class="financial-header">
                    <div >已完成</div>
                </el-form-item>
                <el-form-item  class="financial-content">
                    <div v-if="this.loading">
                        <i class="el-icon-loading" style="font-size:50px; color: #409eff" ></i>
                        <p>正在匹配中，请稍后</p>
                    </div>
                    <div v-if="this.financialMatchResult===1"></div>
                    <div v-else>
                        <p v-if="isError===1"> 匹配已完成，有未匹配数据，是否重新上传匹配</p>
                        <p v-else> 匹配已完成，没有未匹配数据</p>
                        {{financialMatchResults}}
                    </div>
                </el-form-item>
                <el-form-item v-if="financialMatchResult===1" class="financial-footer">
                      <el-button type="primary" :disabled="this.loading" @click="startFinancialMatching">开始匹配对账</el-button>
                </el-form-item>
                <el-form-item v-else class="financial-footer">
                    <el-button type="primary" @click="showDialogMatching(1)">重新上传</el-button>
                    <el-button type="primary" @click="showDialogMatching(0)">查看记录</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import api from '../../api/financialManage';
    import vue from 'vue';
    import mybreadcrumb from '../../components/Breadcrumb.vue';
    import {mapGetters} from 'vuex';
    import {format} from 'date-fns';
    import {zh_cn} from 'date-fns/locale/zh_cn';
    export default {
        data() {
            return {
                dialogVisible:false,
                financialOrderList: [],
                receiptType:'',
                checkType:'',
                completeType:'',
                queryObj:{
                    dates:'',
                    beginPaymentTime : '',
                    endPaymentTime :'',
                    storeName:'',
                    inputVal: '',
                    receiptType: 0,//默认预收款
                    checkType: '',//默认全部
                    completeType: '' //默认全部
                },
                paging:{pageNum: 1, pageSize: 10,total: 1, pageTotal: 10 },
                pageList:[10,20,40], //每页选择的个数选项
                receiptTypes: [
                    { name: '全部', value: '' }, { name: '预收款', value: 0 }, { name: '银货两讫', value: 1 }
                ],
                //未对账 value=100 时代表对账类型是0或者1（0.未对账（支付宝缺失记录） 1.未对账（平台缺失记录））
                checkTypes: [
                    { name: '全部', value: '' },{ name: '未对账', value: 100}, { name: '对账匹配', value: 2 },{ name: '对账不匹配', value: 3 }
                ],
                completeTypes: [
                    { name: '全部', value: '' }, { name: '已完成', value: 1 }, { name: '未完成', value: 0 }
                ],
                uploadStatus: 0,  //0 初态，1 完成，2重新上传
                financialMatchResult: 1, //匹配对账状态  1-未完成 2-完成
                financialMatchResults:'', // 匹配对账结果描述
                dialogMatching :false, //上传Excel状态切换
                dialogFinancialMatching :false, // 匹配对账状态切换
                isError : 0,
                file : {},
                baseUrl:'',
                headers:{},
                token:null,
                loading:false,
                fileList: []
            }
        },

        created: function () {
//            this.token = window.localStorage.getItem('token');
            this.token = JSON.parse(sessionStorage.getItem('vuex')).user.token;
            this.baseUrl = this.$globalData.baseUrl;
            //上传Excel时绑定token
            this.headers = {'Authorization': this.token};
            this.simpleSearch();
        },

        methods: {

            //点击查询按钮页码设置为1
            clickSearch() {
                this.paging.pageNum = 1;
                this.simpleSearch();
            },
            // 查询列表信息
            simpleSearch(){
                let param = {}
                //储存请求参数
                if (this.$store.getters.returnFlag) {
                    let pageInfo = this.$store.getters.pageInfo;
                    this.queryObj.receiptType = pageInfo.receiptType,
                        this.queryObj.checkType = pageInfo.checkType,
                        this.queryObj.completeType = pageInfo.completeType,
                        this.queryObj.beginPaymentTime = pageInfo.beginPaymentTime,
                        this.queryObj.endPaymentTime = pageInfo.endPaymentTime,
                        this.queryObj.storeName = pageInfo.storeName,
                        this.queryObj.inputVal = pageInfo.inputVal,
                        this.paging.pageNum = pageInfo.pageNum,
                        this.paging.pageSize = pageInfo.pageSize,
                        this.$store.dispatch('setFlag', false)
                }
                //得到支付的两个时间点
                if(this.queryObj.dates){
                    this.queryObj.beginPaymentTime = this.queryObj.dates[0]? format(this.queryObj.dates[0], 'YYYY-MM-DD', { locale: zh_cn }) : '';
                    this.queryObj.endPaymentTime = this.queryObj.dates[1]? format(this.queryObj.dates[1], 'YYYY-MM-DD', { locale: zh_cn }): '';
                };
                param = {
                    receiptType :this.queryObj.receiptType,
                    checkingType : this.queryObj.checkType,
                    orderStatus : this.queryObj.completeType,
                    beginPaymentTime : this.queryObj.beginPaymentTime,
                    endPaymentTime : this.queryObj.endPaymentTime,
                    storeName : this.queryObj.storeName,
                    inputValue : this.queryObj.inputVal,
                    pageNum : this.paging.pageNum,
                    pageSize : this.paging.pageSize
                };
                api.getFinancialOrderList(param).then(
                    (response) => {
                        if (response.data.code === 1){
                            let data =response.data.data.list;
                            for(let i in data){
                                //收款类型 : 0-预收款 1-银货两讫
                                if(!isNaN(data[i].receiptType)){
                                    switch(data[i].receiptType){
                                        case 0:
                                            data[i].receiptTypeText = "预收款" ;
                                            break;
                                        case 1:
                                            data[i].receiptTypeText = "银货两讫" ;
                                            break;
                                        default:
                                            break;
                                    };
                                };
                                // 对账类型 :0.未对账（支付宝缺失记录） 1.未对账（平台缺失记录） 2.对账匹配 3.对账不匹配
                                if(!isNaN(data[i].checkingType)){
                                    switch(data[i].checkingType){
                                        case 0:
                                        case 1:
                                            data[i].checkingTypeText = "未对账" ;
                                            break;
                                        case 2:
                                            data[i].checkingTypeText = "对账匹配" ;
                                            break;
                                        case 3:
                                            data[i].checkingTypeText = "对账不匹配" ;
                                            break;
                                        default:
                                            break ;
                                    };
                                };
                                //订单完成状态：orderStatus=4/6/11代表已完成，其余都是未完成
                                if(!isNaN(data[i].orderStatus)){
                                    switch(data[i].orderStatus){
                                        case 4:
                                        case 6:
                                        case 11:
                                            data[i].orderStatusText = "已完成" ;
                                            break;
                                        default:
                                            data[i].orderStatusText = "未完成" ;
                                            break ;
                                    };
                                }
                            };
                            this.paging.total=response.data.data.total;
                            this.paging.pageTotal=response.data.data.pages;
                            this.financialOrderList =data ? data:[];
                        }else {
                            this.$alert(response.data.message);
                        }
                    });
            },

            // 跳转到订单详情页面；
            goToDetail(orderId){
                let pageInfo = {
                    receiptType : this.queryObj.receiptType,
                    checkType : this.queryObj.checkType,
                    completeType : this.queryObj.completeType,
                    beginPaymentTime : this.queryObj.beginPaymentTime,
                    endPaymentTime : this.queryObj.endPaymentTime,
                    storeName : this.queryObj.storeName,
                    inputVal : this.queryObj.inputVal,
                    pageNum : this.paging.pageNum,
                    pageSize : this.paging.pageSize
                };
                this.$store.dispatch('setPageInfo', pageInfo);
                this.$router.push({path:'/orderDetail', query: {id: orderId , source: "financialOrderList"}});

            },

            //上次匹配历史页面
            matchedHistory(){
                this.$router.push({path:'/financialOrderMatchHistory'});
            },

            //跳转到支付记录页面
            paymentRecord(orderId){
                let pageInfo = {
                    receiptType : this.queryObj.receiptType,
                    checkType : this.queryObj.checkType,
                    completeType : this.queryObj.completeType,
                    beginPaymentTime : this.queryObj.beginPaymentTime,
                    endPaymentTime : this.queryObj.endPaymentTime,
                    storeName : this.queryObj.storeName,
                    inputVal : this.queryObj.inputVal,
                    pageNum : this.paging.pageNum,
                    pageSize : this.paging.pageSize
                };
                this.$store.dispatch('setPageInfo', pageInfo);
                this.$router.push({path:'/financialPaymentRecord',query: {orderId: orderId}});
            },

            //添加后调用关闭模态框
            showDialogMatching(param) {
                if(param===1){
                    this.uploadStatus = 0;
                    this.dialogMatching = true;    //打开上传对话框
                    this.dialogFinancialMatching = false;
                    this.fileList = [];
                } else if(param===2){
                    this.financialMatchResult = 1;
                    this.dialogMatching = false;    //关闭上传对话框
                    this.dialogFinancialMatching = true;   //打开匹配对话框
                } else {
                    this.uploadStatus = 0;
                    this.financialMatchResult = 1;
                    this.dialogMatching = false;
                    this.dialogFinancialMatching = false;
                    this.$router.push({path: '/financialOrderMatchHistory'});
                }

            },

            //财务对账匹配方法
            startFinancialMatching(){
                this.loading = true;
                api.getMatchingRecordByCheckType().then(
                    (response) => {
                        if (response.data.code === 1){
                            this.financialMatchResult = 2;
                            let dates = response.data.data;
                            //是否有未匹配数据
                            this.isError = dates.isError ;
                            this.financialMatchResults="已上传"+dates.totalNum+"条数据，成功"+dates.succNum+"条，失败"+dates.failNum+"条";
                        }else{
                            //重新上传
                            this.confirm(response.data.message);
                        }
                        this.loading = false;
                    }
                );
            },

            //提示框
            confirm: function(message) {
                this.$confirm(message, '提示', {
                    confirmButtonText: '确定',
                    type: 'warning'
                }).then(() => {
                    this.showDialogMatching(1);
                    this.uploadStatus = 2;
                })
            },

            //限制上传Excel/
            beforeAvatarUpload(file) {
                if (this.fileList && this.fileList.length == 1) {
                    this.$message.error('文件只能上传一次')
                    return false
                }
                let suffix = file.name.substring(file.name.lastIndexOf('.') + 1)
                if ('xlsx' != suffix) {
                    this.$alert('您上传的格式有误')
                    return false
                }
                const isLt2M = file.size / 1024 / 1024 < 50;
                if (!isLt2M) {
                    this.$message.error('上传文件大小不能超过50MB!');
                }
                return isLt2M;
            },

            //文件上传提示
            inProgress(event, file, fileList) {
                this.$alert('文件正在上传中')
            },

            //文件上传失败提示
            uploadError(err, file, fileList) {
                this.$alert('文件上传失败')
                this.uploadStatus =2;
            },

            //删除
            removeFile(file) {
                this.fileList = [];
                this.uploadStatus =0;
            },

            //上传文件
            uploadSuccess(response, file, fileList) {
                this.fileList.push(file)
                this.uploadStatus =1;

            },

            // 分页
            handleSizeChange(row){
                this.paging.pageNum = 1;
                this.paging.pageSize = row;
                this.simpleSearch();
            },
            handleCurrentChange(index){
                this.paging.pageNum = index;
                this.simpleSearch();
            },

        },

        computed: {
            ...mapGetters([
                'pageInfo',
                'returnFlag'
            ]),
            navigationList() {
                return [{ name: '财务管理' }, { name: '财务订单列表' }];
            }
        },

        components: {
            mybreadcrumb
        }
    }
</script>
<style scoped>
    .el-date-editor--daterange.el-input{
        width: 205px;
    }
    .el-input{
        width: 185px;
        margin-right:10px;
    }
    .el-select{
        width: 125px;
        margin-right: 10px;
    }
    .search-arrange >div{
        display: inline-block;
        padding: 5px 0 ;
    }
    .el-table {
        margin: 20px 0;
    }
    .financial-reconciliation{
        text-align: center;
    }
    .financial-header{
        min-height: 60px;
        line-height: 60px;
        padding-top: 10px;
        background: #eaeaea;
    }
    .financial-content{
        min-height: 120px;
    }
    .el-icon-document{
        font-size: 32px;
    }
    .financialOrder-Btn {
        display: inline-block;
        margin: 15px 15px 15px 10px;
        float: right;
    }

</style>



