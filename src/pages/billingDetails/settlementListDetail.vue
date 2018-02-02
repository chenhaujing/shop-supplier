<template>
    <div class="settlementListDetail">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-date"></i> 账户管理</el-breadcrumb-item>
            <el-breadcrumb-item>
                <router-link :to="{path: '/settlementList'}">
                    已结算列表
                </router-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item class="breadNav">
                <a href="javascript:location.reload()">账单明细</a>
            </el-breadcrumb-item>
        </el-breadcrumb>

        <div class="settlementListDetailNumber">
            <div class="col-xs-2">
                <el-input
                    placeholder="订单号"
                    icon="search"
                    v-model="condition"
                    :on-icon-click="query">
                </el-input>
            </div>
            <div class="col-xs-3" style="height: 15px; margin-top: 5px;">
                <el-tooltip placement="top">
                    <div slot="content">
                        <p style="text-align: center">结算金额说明</p>
                        <p>
                            1. 当订单状态为"已完成"状态,
                               结算金额=透云进货价小计+运费金额
                        </p>
                        <p>2. 当订单是通过已拒收退款审核进入到“已退款”状态时
                           结算金额=运费金额
                        </p>
                    </div>
                    <el-button style="color: red;padding: 0px 10px">提示</el-button>
                </el-tooltip>
            </div>
            <div class="col-xs-3">
                <span>已结算总额:{{totalOrderRevenue | formatPrice}}</span>
            </div>
        </div>
        <div class="table-responsive">
            <table class="table table-bordered table-hover settlementListDetail_table">
                <thead>
                <tr>
                    <th>序号</th>
                    <th>订单编号</th>
                    <th>订单状态</th>
                    <th>商品金额小计(¥)</th>
                    <th>运费金额(¥)</th>
                    <th>折扣优惠(¥)</th>
                    <th>总计金额(¥)</th>
                    <th>实付金额(¥)</th>
                    <th>透云进货价小计(¥)</th>
                    <th>结算金额(¥)</th>
                    <th>支付时间</th>
                    <th>支付类型</th>
                    <th>付款流水号</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-if="orderData.list && orderData.list.length===0">
                    <td colspan="14"> 没有数据记录</td>
                </tr>
                <tr v-else v-for="(supplier,index) in orderData.list">
                    <td style="min-width: 50px">{{index + 1}}</td>
                    <td >{{supplier.orderId}}</td>
                    <td >{{getOrderStatus(supplier.orderStatus)}}</td>
                    <td style="min-width: 120px">{{supplier.orderPrice | formatPrice}}</td>
                    <td >{{supplier.orderPostage | formatPrice}}</td>
                    <td>￥{{supplier.discount}}</td>
                    <td>{{supplier.orderTotalPrice | formatPrice}}</td>
                    <td>{{supplier.payAmount | formatPrice}}</td>
                    <td style="min-width: 150px">{{supplier.orderDealerPrice  | formatPrice}}</td>
                    <td>{{supplier.tempSettlemePrice | formatPrice}}</td>
                    <td>{{supplier.orderPaymentTime}}</td>
                    <td>{{supplier.orderPaymentMethod == 1 ? '支付宝' : '微信'}}</td>
                    <td>{{supplier.orderPaymentNum}}</td>
                    <td>
                        <div>
                            <a href="javascript:;" @click="settlementListDetail_lookDetail(supplier.orderId)">查看明细</a>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <paging ref="page" :page-num="pageTotal" :current-page="currentPage" :pageSize="10"
                @change="change" v-on:changeR="changeRows" style="margin-left: 120px"></paging>
        <!--点击查看详情弹出的模态框-->
        <el-dialog :visible.sync="dialogTableVisible" >
            <ul class="incomeDetail_lookSearch">
                <li>订单编号:{{orderDetailHeadData.orderId}}</li>
                <li>商品金额小计:{{orderDetailHeadData.orderPrice | formatPrice}}</li>
                <li>收货人:{{orderDetailHeadData.orderReceiverName}}</li>
            </ul>
            <div class="table-responsive">
                <table class="table table-bordered table-hover SettlementList_table1">
                    <thead>
                    <tr>
                        <th>商品图片</th>
                        <th>商品名称</th>
                        <th>商品品牌</th>
                        <th>商品条码</th>
                        <th>规格值</th>
                        <th>商品数量</th>
                        <th >app订货价(¥)</th>
                        <th >折扣优惠(¥)</th>
                        <th>总额(¥)</th>
                        <th>是否退换货</th>
                        <th >退款金额(¥)</th>
                        <th>状态</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(supplier,index) in orderDetailData.list">
                        <td>
                            <img :src="supplier.goodsImage" style=" width: 50px;
                                    height: 50px;"></td>
                        <td :title="supplier.goodsName">{{supplier.goodsName}}</td>
                        <td>{{supplier.brandName}}</td>
                        <td>{{supplier.code69}}</td>
                        <td>{{supplier.goodsAttribute}}</td>
                        <td>{{supplier.goodsNumber}}</td>
                        <td>{{supplier.goodsUnitPrice | formatPrice}}</td>
                        <td style="line-height: 40px">￥{{supplier.goodsDiscount}}</td>
                        <td>{{supplier.goodsTatolPrice | formatPrice}}</td>
                        <td >{{supplier.type != null ? '是': ''}}</td>
                        <td >{{supplier.returnMoney | formatPrice}}</td>
                        <td style="line-height: 40px;min-width: 100px" v-if="supplier.type == 0 && supplier.status == 5">
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
                <div class="settlementListDetail_divStyle">
                    <paging ref="page" :page-num="dialogPageTotal" :current-page="dialogCurrentPage" :pageSize='10'
                            @change="changeDialog"
                            v-on:changeR="changeDialogRows" :is-select="false"></paging>
                </div>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import '../../../static/css/settlementListDetail.css';
    import paging from '../../components/page';
    import api from '../../api/billingDetails';

    export default {
        data () {
            return {
                dialogPageNum: 1,
                dialogPageTotal: 1, //总页码
                dialogPageSize: 10,
                dialogCurrentPage: 1, //当前页

                orderPrice: '',//该订单总价
                orderReceiverName: '',//收货人名称
                totalOrderRevenue: '',//订单收入总额
                totalPostage: '',
                orderId: '',//订单编号
                dialogTableVisible: false,
                v_model: false,
                condition: '',
                title: '已结算列表',
                pageNum: 1,
                pageTotal: 1, //总页码
                pageSize: 10, //每页条数
                currentPage: 1, //当前页

                orderData: {},//该账户对应的订单数据
                orderDetailData: {},//订单详情
                orderDetailHeadData: {},//订单详情顶部数据
                recordId: {}
            };
        },
        created: function () {
            this.recordId = this.$route.query.recordId;
            this.query();
        },
        methods: {
            changeDialog (index) {
                this.dialogCurrentPage = index;
                this.settlementListDetail_lookDetail(this.orderDetailHeadData.orderId);
            },

            changeDialogRows (row) {

                this.dialogCurrentPage = 1;
                this.dialogPageSize = row;
                this.settlementListDetail_lookDetail(this.orderDetailHeadData.orderId);
            },

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
            goBarterDetail(detailsId){
                this.$router.push({path:'/barterListDetail', query: {detailsId: detailsId ,recordId: this.recordId,source: "settlementListDetail"}});
            },
            goReturnDetails(detailsId){
                this.$router.push({path:'/salesReturnAuditDetails', query: {detailsId: detailsId ,recordId: this.recordId,source: "settlementListDetail"}});
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

            /**
             * 订单列表数据查询
             */
            query () {
                if (this.condition.trim() != '') {
                    this.currentPage = 1;
                }
                let param = {
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                    recordId: this.recordId,
                    orderId: this.condition.trim()//根据订单编号搜索去空格
                };
                api.getSettlementDetails(param).then(
                    (response) => {
                        console.log(response);
                        let data = response.data.data;
                        if (!data.pageInfo) {
                            this.orderData.list = [];
                            this.pageTotal = 0;
                        } else {
                            this.orderData = data ? data.pageInfo : [];
                            this.totalOrderRevenue = data ? data.totalOrderRevenue : [];
                            this.totalPostage = data ? data.totalPostage : [];
                            switch (response.data.code) {
                                case 0:
                                    this.$alert(response.data.message);
                                    break;
                                case 1:
                                    this.pageTotal = Math.floor((this.orderData.total % this.pageSize) == 0 ? (this.orderData.total / this.pageSize) : (this.orderData.total / this.pageSize) + 1);
                                    break;
                                case 4:
                                    this.$alert(response.data.message);
                                    this.orderData.list = [];
                                    this.pageTotal = 0;
                                    break;
                            }
                        }
                    });
            },
            /**
             * 点击订单编号显示订单详情
             * @param orderId 订单编号
             */
            settlementListDetail_lookDetail (orderId) {
                if (!this.dialogTableVisible) {
                    this.dialogCurrentPage = 1;
                    this.dialogPageSize = 10;
                }
                this.dialogTableVisible = true;
                let param = {
                    pageNum: this.dialogCurrentPage,
                    pageSize: this.dialogPageSize
                };
                api.getSettlementDetailsByOrderId(orderId, param).then(
                    (response) => {
                        console.log(response);
                        let data = response.data.data;
                        if (!data) {
                            this.orderDetailData = [];
                            this.orderDetailHeadData = [];
                            this.dialogPageTotal = 0;
                        } else {
                            this.orderDetailData = data ? data.pageInfo : [];
                            this.orderDetailHeadData = data ? data.purchaseInListVo : [];
                            switch (response.data.code) {
                                case 0:
                                    this.dialogPageTotal = 0;
                                    break;
                                case 1:
                                    this.dialogPageTotal = Math.floor((this.orderDetailData.total % this.dialogPageSize) == 0 ? (this.orderDetailData.total / this.dialogPageSize) : (this.orderDetailData.total / this.dialogPageSize) + 1);
                                    break;
                                case 4:
                                    this.orderDetailData = [];
                                    this.orderDetailHeadData = [];
                                    this.dialogPageTotal = 0;
                                    break;
                            }
                        }
                    });
            }
        },
        components: {
            paging
        }
    };
</script>
<style>
    .settlementListDetail .breadNav .el-breadcrumb__item__inner a {
        color: #48576a;
        cursor: pointer;
    }

    .settlementListDetail .breadNav .el-breadcrumb__item__inner a:hover {
        color: #20a0ff;
        cursor: pointer;
    }
    .SettlementList_table1 > tbody > tr > td {
        min-width: 90px;
        line-height: 40px;
        text-align: center;
        max-width:200px;
        overflow:hidden;
        min-width: 100px;
        text-overflow:ellipsis;
    }
</style>

