<template>
    <div id="financialManageDetails">
        <div class="financial_nav">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 财务管理</el-breadcrumb-item>
                <el-breadcrumb-item class="breadNav">
                    <router-link :to="{path: '/financialManageList'}">
                        供应商结算明细列表
        </router-link>
                </el-breadcrumb-item>
                <el-breadcrumb-item class="breadNav">
                    <a href="javascript:location.reload()">账单明细</a>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="financial_search">
            <div class="row">
                <div class="col-xs-2" style="line-height: 30px">
                    <el-input
                        placeholder="订单号"
                        icon="search"
                        v-model="orderId"
                        :on-icon-click="searchWithOrderId"
                    >
                    </el-input>
                </div>
                <div class="col-xs-5 " style="margin-top: 3px;">
                    <label style="padding-left: 65px">总计金额:</label>
                    <span>{{this.orderTotal | formatPrice}}元(商品金额小计+运费金额+折扣优惠)</span>
                </div>
                <div class=" col-xs-1">
                    <el-tooltip placement="top">
                        <div slot="content">   <p style="text-align: center">结算金额说明</p>    <p>
                            1. 当订单状态为"已完成"状态,
                               结算金额=透云进货价小计+运费金额
                               </p>   <p>
                            2. 当订单是通过已拒收退款审核进入到“已退款”状态时
                               结算金额=运费金额
                               </p></div>
                        <el-button style="color: red;">提示</el-button>
                    </el-tooltip>
                </div>
                <div class="col-xs-3 " style="margin-top: 3px;">
                    <span>结算金额：{{this.postageTotal | formatPrice}} 元 </span>
                </div>
                <div class="col-xs-1">
                    <button class="btn btn-info" @click="openExportList" style="margin-left: -30px">批量导出</button>
                </div>
            </div>
        </div>
        <!--table表格部分-->
        <div class="table-responsive">
            <div class="table_details">
                <table class="table table-bordered table-hover  financialManage_table  text-center">
                    <thead>
                    <tr>
                        <th style="min-width: 70px">序号</th>
                        <th style="min-width: 200px">订单编号</th>
                        <th >订单状态</th>
                        <th style="min-width: 150px">商品金额小计(¥)</th>
                        <th >运费金额(¥)</th>
                        <th >折扣优惠(¥)</th>
                        <th >总计金额(¥)</th>
                        <th >实付金额(¥)</th>
                        <th style="min-width: 180px">透云进货价小计(¥)</th>
                        <th >结算金额(¥)</th>
                        <th style="min-width: 200px">付款时间</th>
                        <th >支付类型</th>
                        <th style="min-width: 200px">付款流水号</th>
                        <th style="min-width: 200px">核账时间</th>
                        <th >操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-if="tableData && tableData.length===0">
                        <td colspan="14"> 没有数据记录</td>
                    </tr>
                    <tr v-else v-for="(item,index) in tableData">
                        <td>{{index+1}}</td>
                        <td>{{item.orderId}}</td>
                        <td>{{getOrderStatus(item.orderStatus)}}</td>
                        <td>{{item.orderPrice | formatPrice}}</td>
                        <td>{{item.orderPostage | formatPrice}}</td>
                        <td>￥{{item.discount}}</td>
                        <td>{{item.orderTotalPrice | formatPrice}}</td>
                        <td>{{item.payAmount | formatPrice}}</td>
                        <td>{{item.orderDealerPrice  | formatPrice}}</td>
                        <td>{{item.tempSettlemePrice | formatPrice}}</td>
                        <td>{{item.orderPaymentTime}}</td>
                        <td>{{item.orderPaymentMethod = 1?'支付宝':'微信'}}</td>
                        <td>{{item.orderPaymentNum}}</td>
                        <td>{{item.checkAccountsTime}}</td>
                        <td>
                            <!--<a href="javascript:;"><img src="../../../static/img/details.png" alt=""></a>-->
                            <div style="min-width: 80px">
                                <a href="javascript:;" @click="getOrderDetails(item.orderId)">查看明细</a>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- 分页 -->
        <div class="pull-right billing_pagingWrap">
            <paging ref="page" :page-num="pageTotal" :types="payStatus" :current-page="currentPage" :pageSize='pageSize'
                    @change="changePages" v-on:changeR="changeRows"></paging>
        </div>
        <!-- 根据订单获取对应的详情 弹窗； -->
        <el-dialog title="" :visible.sync="isOpen" size="middle">
            <div class="row from-group order_detail">
                <div class="col-xs-5">
                    <label>订单编号：</label>
                    <span>{{orderInfo.orderId}}</span>
                </div>
                <div class="col-xs-3">
                    <label>商品金额小计：</label>
                    <span>{{orderInfo.orderPrice | formatPrice}} 元</span>
                </div>
                <div class="col-xs-4">
                    <label>收货人：</label>
                    <span>{{orderInfo.orderReceiverName}}</span>
                </div>

            </div>

            <div class="table-responsive">
                <table class="table table-bordered table-hover financialManageDetails_table">
                    <thead>
                    <tr>
                        <th >商品图片</th>
                        <th >商品名称</th>
                        <th >商品品牌</th>
                        <th >商品条码</th>
                        <th>规格值</th>
                        <th >商品数量</th>
                        <th >app订货价(¥)</th>
                        <th >折扣优惠(¥)</th>
                        <th  >总额(¥)</th>
                        <th>是否退换货</th>
                        <th >退款金额(¥)</th>
                        <th >状态</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(supplier,index) in orderData">
                        <td>
                            <img :src="supplier.goodsImage" style=" width: 50px;
                                    height: 50px;"></td>
                        <td  style="min-width: 150px">{{supplier.goodsName}}</td>
                        <td>{{supplier.brandName}}</td>
                        <td >{{supplier.code69}}</td>
                        <td >{{supplier.goodsAttribute}}</td>
                        <td >{{supplier.goodsNumber}}</td>
                        <td>{{supplier.goodsUnitPrice | formatPrice}}</td>
                        <td >￥{{supplier.goodsDiscount}}</td>
                        <td >{{supplier.goodsTatolPrice | formatPrice}}</td>
                        <td >{{supplier.type != null ? '是': ''}}</td>
                        <td>{{supplier.returnMoney | formatPrice}}</td>
                        <td v-if="supplier.type == 0 && supplier.status == 5">
                            <div>
                                <el-button size="small" type="info" @click="goReturnDetails(supplier.detailsId)">已退货查看</el-button>
                            </div>
                        </td>
                        <td style="line-height: 40px" v-else-if="supplier.type == 1 && supplier.status == 5">
                            <div>
                                <el-button size="small" type="info" @click="goBarterDetail(supplier.detailsId)">已换货查看</el-button>
                            </div>
                        </td>
                        <td style="line-height: 40px" v-else="supplier.type == null">
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="pull-right billing_pagingWrap">
                <paging :page-num="layerPageTotal" :current-page="layerCurrentPage" :pageSize='10'
                        @change="layerChangePages" :is-select="false"></paging>
            </div>
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
                            <el-button type="primary"   @click="exportList">确 定</el-button>
                        </span>
        </el-dialog>
    </div>
</template>

<script>
    import '../../../static/css/financialManageDetails.less';
    import api from '../../api/billingDetails';
    import paging from '../../components/page';
    import exportData from '../../components/order/exportData';
    import {mapGetters} from 'vuex';
    export default {
        data() {
            return {
                baseUrl:'',     //用于接收下载文件的URL
                orderId : '',
                // 表单数据；
                tableData : [],
                // 分页；
                // 搜索条件
                query: {},
                pageTotal :1,
                pageSize: 10,
                payStatus: '未结算',
                currentPage:1,
                recordId : '',
                orderTotal: 0,
                postageTotal: 0,
                pageNum : 1,
                exportMethod: 'currentPage',
                orderDetails: [],
                // 根据订单号，获取订单详情，弹出层；
                isOpen : false,
                orderData : [],
                // 订单对应的信息，单号，价格，收货人；
                orderInfo : {},
                // 弹层里面的分页；
                startPage: 1,
                endPage: 1,
                layerPageTotal :1,
                layerCurrentPage:1,
                isExport: false,
                // 导出部分，用户选择页码范围；
                selectedBeginPage: 1,
                selectedOverPage: 1,
                totalPageExport: 1,
                baseUrl: '',
            }
        },
        created: function () {
            this.baseUrl = this.$globalData.baseUrl;
            this.recordId = this.$route.query.recordId;
            this.getDetails();
        },

        methods: {

            // 分页，点击其他页面时候出发；
            changePages (index) {
                if(index == this.currentPage) { return;}
                this.currentPage = index;
                this.pageNum = this.currentPage;
                this.getDetails();
            },
            getOrderStatus (value) {
                switch (value) {
                    case 1:
                        return '待付款';
                    case 2:
                        return '待发货';
                    case 3:
                        return '已发货';
                    case 4:
                        return '已完成';
                    case 5:
                        return '已拒收退款审核';
                    case 6:
                        return '已退款';
                    case 7:
                        return '已支付退款审核';
                    case 8:
                        return '待付款已取消';
                    case 19:
                        return '确认送达';

                }
            },

            // 弹层里面的分页；
            layerChangePages (index) {
                if(index == this.layerCurrentPage) { return;}
                this.layerCurrentPage = index;
                this.getOrderDetails();
            },

            //修改每页显示条数
            changeRows (row) {
                this.pageNum = 1;
                this.currentPage = 1;
                this.pageSize = row;
                this.getDetails();
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
                }
                else {
                    this.$alert('请选择导出方式');
                    return;
                }
                this.isExport = false;
                // 参数配置；
                let param = {
                    recordId : this.recordId,
                    orderId : this.orderId,
                    pageNum: page,
                    pageSize: this.pageSize,
                };
                let params = '';
                for (var item in param) {
                    params += item + '=' + param[item] + '&';
                }
                params = params.substr(0, params.length - 1);
                // 配置主机；
//                let hostName = 'http://10.100.50.59:8080';
                window.location.href = this.baseUrl + '/billingDetails/orderMoneyRecord/recordToPurchasesExcel?' + params;
            },

            // 导出框里面起始页和终止页逻辑；
            beginPage(selectedBeginPage) {
                this.startPage = selectedBeginPage;

            },
            overPage(selectedEndPage) {
                this.endPage = selectedEndPage;
            },
            // 打开导出列表的模态框；
            openExportList() {
                this.isExport = true;
            },

            goBarterDetail(detailsId){
                this.$router.push({path:'/barterListDetail', query: {detailsId: detailsId ,recordId:this.recordId,source: "financialManageDetails"}});
            },
            goReturnDetails(detailsId){
                this.$router.push({path:'/salesReturnAuditDetails', query: {detailsId: detailsId ,recordId:this.recordId,source: "financialManageDetails"}});
            },

            // 获取数据，
            getDetails (){
                let param = {
                    recordId : this.recordId,
                    orderId :this.orderId,
                    pageSize : this.pageSize,
                    pageNum : this.currentPage
                }

                api.getDetails(param).then((res)=> {
                    if(res.data.code == 1) {
                        if(res.data.data.pageInfo == null){
                            this.tableData = [];
                        }
                        this.tableData = res.data.data.pageInfo.list;
                        this.orderTotal = res.data.data.totalOrderTotalPrice;
                        this.postageTotal = res.data.data.totalOrderRevenue ;
                        this.pageTotal = res.data.data.pageInfo.pages;
                        this.totalPageExport = this.pageTotal;

                    } else {
                        this.$alert('获取失败')
                    }

                })
            },
            // 通过order查看对应的详情；
            getOrderDetails (orderId){
                this.isOpen = true;
                let query = {
                    pageNum : this.layerCurrentPage,
                    pageSize:10,
                }
                api.getOrderDetails(orderId,query).then((res) => {
                    if(res.data.code == 1) {
                        if(!res.data.data) {
                            this.$alert('暂无数据');
                            return;
                        }
                        this.orderData = res.data.data.pageInfo.list;
                        // 动态生成index;
                        this.orderData.forEach(function (v,i){
                            v.index = i+1;
                        });
                        this.layerPageTotal = res.data.data.pageInfo.pages;
                        this.orderInfo = res.data.data.purchaseInListVo;
                    } else {
                        this.$alert('获取失败')
                    }
                })
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
            searchWithOrderId (){
                this.getDetails();
            }
        },
        computed: {
        },
        components: {
            paging,
            exportData
        },
    }
</script>

<style>
    .financialManage_table > thead > tr  {
        min-width: 120px;
        text-align: center;
        max-width:200px;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
    }
</style>
