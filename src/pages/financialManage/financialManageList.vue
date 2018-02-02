<template>
    <div id="financialManageList">
        <div class="financial_nav">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 财务管理</el-breadcrumb-item>
                <el-breadcrumb-item class="breadNav">
                    <a href="javascript:window.location.reload()">供应商结算明细列表</a>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="row clearMargin publicHeader search-arrange">
            <div>
                <label>账期时间: </label>
                <el-date-picker
                    v-model="paymentDate"
                    type="month"
                    @change="searchWithDate"
                    placeholder="请选择账期时间">
                </el-date-picker>
            </div>

            <el-input
                placeholder="供应商名称"
                icon="search"
                v-model="supplierName"
                :on-icon-click="searchWithOrderId">
            </el-input>
            <div>
                <label >结算状态: </label>
                <el-select v-model="payStatus" placeholder="请选择" @change="changeStatus" style="width: 100px">
                    <el-option
                        v-for="(item,index) in paymentStatus"
                        :key="index"
                        :label="item.type"
                        :data-status="item.status"
                        :value="item.type">
                    </el-option>
                </el-select>
            </div>

            <div >
                <el-tooltip placement="top">
                    <div slot="content">   <p style="text-align: center">结算金额说明</p>    <p>
                        1. 当订单状态为"已完成"状态,
                           结算金额=透云进货价小计+运费金额
                           </p>   <p>
                        2. 当订单是通过已拒收退款审核进入到“已退款”状态时
                           结算金额=运费金额
                           </p></div>
                    <el-button style="color: red">提示</el-button>
                </el-tooltip>
            </div>
            <div class="mess_01">
                <span>已结算金额:{{settledMoney | formatPrice}}元</span>
            </div>
            <div class="mess_02">
                <span>待结算金额:{{unsettledMoney | formatPrice}}元</span>
            </div>
            <div class="pull-right block" >
                <button class="btn btn-info" @click="openExportList">批量导出</button>
            </div>
        </div>


        <!--table表格部分-->
        <div class="tableWrap" style="margin-top: 20px">
            <div class="table-responsive financial_table">
                <table class="table table-bordered table-hover">
                    <thead>
                    <tr>
                        <th>序号</th>
                        <th>供应商名称</th>
                        <th>结账时间</th>
                        <th>待结算金额（¥）</th>
                        <th>已结算金额（¥）</th>
                        <th>结算时间</th>
                        <th>结算状态</th>
                        <th>供应商账户</th>
                        <th>流水号</th>
                        <th>是否核账</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-if="tableData.length === 0">
                        <td colspan="11">暂无数据</td>
                    </tr>
                    <tr v-for="(item,index) in tableData">
                        <td>{{index+1}}</td>
                        <td style="min-width: 200px">{{item.providerName}}</td>
                        <td>{{item.checkoutAt}}</td>
                        <td>{{item.totalMoney | formatPrice}}</td>
                        <td>{{item.settledAmount | formatPrice}}</td>
                        <td>{{item.settledAt}}</td>
                        <td>{{item.state == 0 ? '未结算' : '已结算'}}</td>
                        <td>{{item.bankAccount}}</td>
                        <td>{{item.serialNumber}}</td>
                        <td>{{item.whetherCheckAccount == 0 ? '否' : '是'}}</td>
                        <td>

                            <router-link :to="{path: '/financialManageDetails', query: {recordId:item.recordId}}">
                            <el-button type="info" size="small">账单明细</el-button>
                            </router-link>

                            <el-button type="info" size="small" v-if="item.state == 0 && item.whetherCheckAccount ==1"
                                       @click="settleAccountLayer(item.recordId,item.serialNumber)" >结算</el-button>
                            <el-button type="info" size="small" v-else-if="item.state != 0 ||item.whetherCheckAccount == 0" disabled>结算</el-button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- 结算弹出层 -->
            <el-dialog
                title="确认结算"
                :visible.sync="isOpen"
                size="tiny">
                <el-input placeholder="请输入流水号" v-model="serialNumber"></el-input>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="isOpen = false">取 消</el-button>
                    <el-button type="primary" @click="settleAccount">确 认</el-button>
                </span>
            </el-dialog>

            <!-- 导出列表 -->
            <el-dialog title="请选择导出方式：" :visible.sync="isExport" size="tiny" class="text-left">
                <export-data
                    :total-pages="totalPageExport"
                    v-on:selectScope="selectPageScope"
                    v-on:chooseBeginPage="beginPage"
                    v-on:chooseEndPage="overPage"
                ></export-data>
                <span slot="footer" class="dialog-footer">
                            <el-button @click="closeLayer">取 消</el-button>
                            <el-button type="primary" @click="exportList">确 定</el-button>
                        </span>
            </el-dialog>

        </div>
        <!-- 分页 -->
        <div  v-if="tableData.length>0" class="pull-right billing_pagingWrap">
            <paging ref="page" :page-num="pageTotal" :types="payStatus" :current-page="currentPage" :pageSize='pageSize'
                    @change="changePages" v-on:changeR="changeRows"></paging>
        </div>
    </div>
</template>
<script>
    import api from '../../api/billingDetails';
    import paging from '../../components/page';
    import exportData from '../../components/order/exportData';

    export default {
        data() {
            return {
                baseUrl:'',     //用于接收下载文件的URL
                // 未结算金额
                unsettledMoney: 0,
                settledMoney: 0,
                // 已结算金额
                payStatus: '未结算',
                paymentStatus: [
                    {
                        status: '',
                        type: '全部'
                    },
                    {
                        status: 0,
                        type: '未结算'
                    },
                    {
                        status: 1,
                        type: '已结算'
                    }
                ],
                supplierName :'',
                paymentDate: '',
                summary: {},
                // 表格数据；
                tableData: [],
                //搜索条件；
                startTime: '',
                endTime: '',
                state: 0,
                // 搜索条件
                query: {},
                //分页
                pageNum: 1,
                pageSize: 10,
                pageTotal: 1,
                currentPage: 1,
                // 打开结算弹层；
                isOpen: false,
                // 结算时候需要结算明细 id,和银行流水号；serialNumber（用户输入）
                recordId: '',
                serialNumber: '',
                /*
                 * 导出功能；
                 */
                isExport: false,
                radio: 1,
                //通过哪种方式导出,默认currentPage
                exportMethod: 'currentPage',
                // 导出部分 选择页面； 要给后台传的
                startPage: 1,
                endPage: 1,
                // 导出部分，用户选择页码范围；
                selectedBeginPage: 1,
                selectedOverPage: 1,
                totalPageExport: 1,
                baseUrl: '',
            }
        },
        created: function () {
            // 配置baseUrl;
            this.baseUrl = this.$globalData.baseUrl;
            // 初始化日期为当前月份；
            this.initialDate();
            // 查找数据；
            this.getList();
            // 获取已结算金额，和未结算金额；
            this.getSettled();
            this.getUnsettled();

        },

        methods: {
            // 打开结算弹层,获取recordId,获取用户输入的流水号；
            settleAccountLayer(recordId) {
                this.serialNumber = '';
                this.isOpen = true;
                this.recordId = recordId;
            },

            changeStatus() {
                if(this.payStatus == '未结算'){
                    this.state = 0
                } else if(this.payStatus == '已结算'){
                    this.state = 1
                }else{
                    this.state = ''
                }
                this.pageNum = 1;
                this.getList();
            },

            // 分页，点击其他页面时候出发；
            changePages(index) {
                this.currentPage = index;
                this.pageNum = this.currentPage;
                this.getList();
            },

            //修改每页显示条数
            changeRows(row) {
                this.pageNum = 1;
                this.pageSize = row;
                this.getList();
            },

            // 关闭弹窗；
            closeLayer() {
                this.isExport = false;
            },
            // 导出列表；
            exportList() {
                let that = this;
                let page = '';
                //根据选择的导出类型，设置起始页，终止页
                if (this.exportMethod == 'currentPage') {
                    //传一个页数
                    page = this.currentPage;

                } else if (this.exportMethod == 'selectedPage') {
                    if (this.endPage < this.startPage) {
                        this.$alert('终止页不能小于起始页');
                        return;
                    }
                    page = this.startPage + ',' + this.endPage;
                } else if (this.exportMethod == 'allPage') {
                    //全部数据传空值；
                    page = '';
                } else {
                    this.$alert('请选择导出方式');
                    return;
                }

                this.isExport = false;
                // 参数配置；
                let param = {
                    supplierName :this.query.supplierName,
                    startTime: this.query.startTime,
                    endTime: this.query.endTime,
                    state: this.query.state,
                    pageNum: page,
                    pageSize: this.query.pageSize,
                };
                let params = '';
                for (var item in param) {
                    params += item + '=' + param[item] + '&';
                }
                params = params.substr(0, params.length - 1);
                window.location.href = this.baseUrl + '/billingDetails/excel?' + params;
            },

            // 导出框里面起始页和终止页逻辑；
            beginPage(selectedBeginPage) {
                this.startPage = selectedBeginPage;

            },
            overPage(selectedEndPage) {
                this.endPage = selectedEndPage;
            },

            // 获取已结算金额；
            getSettled() {
                let searchDate = {startTime: this.startTime, endTime: this.endTime}
                api.getSettledMoney(searchDate).then((res) => {
                    if (res.data.code == 1) {
                        this.settledMoney = res.data.data;
                    } else {
                        this.settledMoney = null;
                    }
                })
            },

            // 获取待结算金额；
            getUnsettled() {
                let searchDate = {startTime: this.startTime, endTime: this.endTime}
                api.getUnsettledMoney(searchDate).then((res) => {
                    if (res.data.code == 1) {
                        this.unsettledMoney = res.data.data;
                    } else {
                        this.unsettledMoney = null;
                    }
                })
            },
            searchWithOrderId (){
                this.getList();
            },
            // 获取表格里面的数据；
            getList() {
                // 每次发请求之前，重置；
                this.currentPage = this.pageNum;
                this.tableData = [];
                this.pageTotal = 1;
                // 拼接对象，发送请求；
                this.query = {
                    supplierName :this.supplierName,
                    startTime: this.startTime,
                    endTime: this.endTime,
                    state: this.state,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                };
                // 发送请求；
                api.getBillingList(this.query).then((res) => {
                    if (res.data.code === 1) {
                        if (!res.data.data) {
                            this.pageTotal = 1;
                            return;
                        }

                        let list = res.data.data.pageInfo.list;
                        this.tableData = list;
                        this.pageTotal = res.data.data.pageInfo.pages;
                        this.totalPageExport = this.pageTotal;
                    } else {
                        console.log('获取失败！')
                    }

                }).catch((e) => {
                    console.log('error is ' + e.message)
                });
            },
            // 刚进来时候把日期置成当前的月份；
            initialDate() {
                let now = new Date();
                this.paymentDate = this.handleDate(now).dateStr;
                this.startTime = this.handleDate(now).dateStr + '-01';
                this.endTime = this.handleDate(now).dateStr + '-' + this.handleDate(now).totalDays;
            },
            // 打开导出列表的模态框；
            openExportList() {
                this.isExport = true;
            },
            // 使用日期查找数据；
            searchWithDate() {
                if (!this.paymentDate) {
                    this.$alert('账期时间不能为空');
                    return;
                }
                // 重置到第一页；
                this.pageNum = 1;
                let date = this.paymentDate;
                this.paymentDate = this.handleDate(date).dateStr;
                this.startTime = this.handleDate(date).dateStr + '-01';
                this.endTime = this.handleDate(date).dateStr + '-' + this.handleDate(date).totalDays;
                this.getList();
                this.getUnsettled();
                this.getSettled();
            },

            selectPageScope(index) {
                //根据选择的 的导出方式，确定打印范围；
                // 根据label传回值，来确定是哪种方式；
                if (index == 1) {
                    this.exportMethod = 'currentPage';
                } else if (index == 2) {
                    this.exportMethod = 'selectedPage';
                } else {
                    this.exportMethod = 'allPage';
                }
            },

            // 结算；
            settleAccount() {
                if (!this.serialNumber) {
                    this.$alert('银行流水号不能为空');
                    return;
                }
                ;
                this.isOpen = false;
                let param = {recordId: this.recordId, serialNumber: this.serialNumber};
                api.settleAccount(param).then((res) => {

                    if (res.data.code == 1) {
                        this.$alert('结算成功');
                        // 重新拉去数据；
                        this.pageNum = 1;
                        this.getList();
                    } else {
                        this.$alert('结算失败')
                    }

                })
            },
            // 工具方法
            handleDate(d) {
                /*
                 * 获取当前时间，转换成日期字符串，进行查询；
                 */
                // 当前月总共有多少天；
                let curMonthDays = new Date(d.getFullYear(), (d.getMonth() + 1), 0).getDate();
                let year = d.getFullYear();
                let month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
                let dateStr = year + '-' + month;
                return {
                    dateStr: dateStr,
                    totalDays: curMonthDays
                };
            }
        },
        computed: {},
        components: {
            paging,
            exportData
        },
    }
</script>
<style scoped lang="less" type="text/less">

    .search-arrange >div{
        display: inline-block;
    }
    .table_LargeWarp {
        position: relative;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .el-input{
        width: 185px;
        margin-right:10px;
    }
    .el-select{
        width: 125px;
        margin-right: 10px;
    }
    .mess_01{
        margin-left: 15px;
    }
    .mess_02{
        margin-left: 20px;
    }
    .billing_pagingWrap{
        margin-right: 25px;
    }
</style>

