<template>
    <div>
        <breadCrumb :navigationList="navigationList"></breadCrumb>
        <!--退货商品信息-->
        <orderDetailsTable :orderDetails="detailsData" :orderNum="orderId" :saleReturnNum="returnNumber"
                           :consignee="orderReceiverName" @showShipmentNum="showShipmentNum"></orderDetailsTable>

        <!--操作按钮-->
        <div class="operateBut">
            <el-button
                v-show="source !== 'financialManageDetails' && source !== 'incomeDetailList' && source !=='unSettlementListDetail' && source !=='settlementListDetail' "
                @click="goBack">返回上一级
            </el-button>
            <!--status === 1-->
            <el-button v-if="status === 1" v-has:salesReturnAuditDetails_reject @click="reject(1)">拒绝退货</el-button>
            <el-button v-if="status === 1" v-has:salesReturnAuditDetails_consent @click="auditPassDialog">审核通过


            </el-button>
            <!--status === 2-->
            <el-button v-if="status === 2" :disabled="status === 2" v-has:salesReturnAuditDetails_confirm
                       @click="refund">确认退款
            </el-button>
            <!--status === 3-->
            <el-button v-if="status === 3" v-has:salesReturnAuditDetails_reject @click="reject(3)">拒绝退货</el-button>
            <el-button v-if="status === 3" :disabled="status === 3" v-has:salesReturnAuditDetails_consent
                       @click="auditPassDialog">审核通过
            </el-button>
            <!--status === 4-->
            <el-button v-if="status === 4" v-has:salesReturnAuditDetails_confirm @click="refund">确认退款</el-button>
            <!--status === 0||status === 5 ||status === 6-->
            <el-button v-if="status === 0||status === 5||status === 6" :disabled="true"
                       v-has:salesReturnAuditDetails_confirm
                       @click="refund">确认退款
            </el-button>
        </div>


        <!-- 查看物流模态框-->
        <el-dialog v-model="shipmentNumber" size="tiny">
            <!--自配送信息-->
            <div v-show="returnLogisticsMethod === 1">
                <div class="form-horizontal">
                    <div class="form-group">
                        <div style="height:7px">
                            <label class="col-sm-3 control-label">配送人姓名</label>
                        </div>
                        <div class="col-sm-9">
                            <input v-model="returnDistributorName" class="form-control" disabled>
                        </div>
                    </div>
                    <div class="form-group">
                        <div style="height:7px">
                            <label class="col-sm-3 control-label">配送人电话</label>
                        </div>
                        <div class="col-sm-9">
                            <input v-model="returnDistributorMobile" class="form-control" disabled>
                        </div>
                    </div>
                </div>
            </div>
            <!--其他配送信息-->
            <div v-show="returnLogisticsMethod === 2">
                <div class="navbar-form row" role="search">
                    <!-- 物流信息表单 -->
                    <template>
                        <el-table :data="logisticsData" stripe style="width: 100%" border>
                            <el-table-column prop="ftime" label="时间"></el-table-column>
                            <el-table-column prop="context" label="地点和跟踪进度"></el-table-column>
                        </el-table>
                    </template>
                </div>
            </div>
        </el-dialog>
        <!--拒绝退款模态框-->
        <el-dialog title="拒绝原因" :visible.sync="rejectStatus">
            <textarea v-model="refuseReason" :disabled="auditResultStatus" rows="4" class="form-control"></textarea>
            <div v-if="isShow" slot="footer" class="dialog-footer">
                <el-button @click="rejectStatus = false">取 消</el-button>
                <el-button type="primary" @click="auditResult(3)">确 定</el-button>
            </div>
        </el-dialog>
        <!--审核通过模态框-->
        <el-dialog :visible.sync="auditStatus">
            <span>是否通过退款审核</span>
            <div slot="footer" class="dialog-footer">
                <el-button @click="auditResult(1)">取 消</el-button>
                <el-button type="primary" @click="auditResult(2)">确 定</el-button>
            </div>
        </el-dialog>
        <!--审核成功提示模态框-->
        <el-dialog title="审核成功" :visible.sync="auditSucceed">
            <span>请等待买家发货确认后退款</span>
            <div slot="footer" class="dialog-footer">
                <el-button @click="auditReturn">返回</el-button>
            </div>
        </el-dialog>
        <!--确认退款模态框-->
        <el-dialog title="是否确认退款" :visible.sync="isConfirmReturn">
            <span style="color:red;">退款金额:{{goodsTotalPrice}}</span>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isConfirmReturn = false">取 消</el-button>
                <el-button type="primary" @click="confirmReturn">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<style lang="less" type="text/less" scoped>
    .operateBut {
        margin-top: 50px;
        text-align: center;
    }
</style>

<script>
    import breadCrumb from '../../components/Breadcrumb.vue';
    import orderDetailsTable from '../../components/order/orderDetailsTable.vue';
    import rae from '../../api/returnAndExchange.js';
    import order from '../../api/order.js';

    export default {
        data() {
            return {
                rejectStatus: false,
                auditStatus: false,
                auditSucceed: false,
                confirmRefund: false,
                isConfirmReturn: false,
                control: false,
                detailsData: [],
                shipmentNumber: false,
                orderReceiverName: null,
                returnNumber: null,
                orderId: null,
                returnLogisticsMethod: 0,
                logisticsData: [],
                returnDistributorName: "",
                returnDistributorMobile: '',
                returnLogisticsCompany: '',
                status: null,
                auditResultStatus: false,
                auditReason: "",
                refuseReason: "",
                storeId: '',
                source: '',
                isShow: true,
                goodsTotalPrice: "",

            }
        },
        created() {
            //获取跳转过来的标记
            this.source = this.$route.query.source;
            //获取id
            this.detailsId = this.$route.query.detailsId;
            //获取recordId从财务那边和待结算那边
            this.recordId = this.$route.query.recordId;
            rae.getReturnDetails(this.detailsId).then(res => {
                let data = res.data.data;
                this.orderReceiverName = data.orderReceiverName;
                this.returnNumber = data.returnNumber;
                this.orderId = data.orderId;
                this.returnLogisticsMethod = data.returnLogisticsMethod;
                this.returnDistributorName = data.returnDistributorName;
                this.returnDistributorMobile = data.returnDistributorMobile;
                this.returnLogisticsCompany = data.returnLogisticsCompany;
                this.returnLogisticsNumber = data.returnLogisticsNumber;
                this.refuseReason = data.refuseReason;
                this.goodsTotalPrice = data.goodsTotalPrice;
                this.status = data.status;
                this.storeId = data.storeId;
                //查看寄回物流信息
                order.trackLogistics(this.returnLogisticsNumber).then(res => {
                    if (res.data.code === 1) {
                        this.logisticsData = res.data.data.data;
                    }
                });
                this.detailsData[0] = {
                    goodsImage: data.goodsImage,
                    goodsName: data.goodsName,
                    brandName: data.brandName,
                    code69: data.code69,
                    goodsNumber: data.goodsNumber,
                    goodsAttribute: data.goodsAttribute,
                    goodsUnitPrice: data.goodsUnitPrice,
                    goodsDiscount: data.goodsDiscount,
                    goodsTotalPrice: data.goodsTotalPrice,
                    orderPostage: data.orderPostage,
                    totalPrice: data.totalPrice,
                    returnReason: data.returnReason,
                    returnRemarks: data.returnRemarks,
                    imagesList: data.imagesList,
                    returnLogisticsNumber: data.returnLogisticsNumber,
                    returnLogisticsMethod: data.returnLogisticsMethod
                };
            });
        },
        methods: {
            /**
             * 查看物流单号
             * */
            showShipmentNum(stats) {
                this.shipmentNumber = stats;
            },
            /**
             *返回上一级
             */
            goBack() {
                switch (this.source) {
                    case 'salesReturnList':
                        this.$store.dispatch('setFlag', true);
                        this.$router.push({ path: '/salesReturnList' });
                        break;
                    case 'adminSaleReturnList':
                        this.$store.dispatch('setFlag', true);
                        this.$router.push({ path: '/adminSalesReturnList' });
                        break;
                }
            },
            /**
             * 拒绝退款模态框
             * */
            reject(status) {
                if (status === 1) {
                    this.rejectStatus = true;
                    this.auditResultStatus = false;
                }
                if (status === 3) {
                    this.rejectStatus = true;
                    this.auditResultStatus = true;
                    this.isShow = false;
                }
            },
            /**
             * 审核通过模态框
             * */
            auditPassDialog() {
                this.auditStatus = true;
            },
            /**
             * 是否通过审核
             * */
            auditResult(type) { //type = 1是取消   type = 2 审核通过   type = 3 拒绝退货
                let param = {};
                if (type === 1) {
                    this.auditStatus = false;
                    return;
                } else if (type === 2) {
                    this.auditStatus = false;
                    param = {
                        detailsId: parseInt(this.detailsId),
                        status: 2,
                        storeId: this.storeId,
                    };
                    rae.setReturnAudit(param).then(res => {
                        this.$alert(res.data.message);
                    });
                } else if (type === 3) {
                    this.rejectStatus = false;
                    this.auditResultStatus = true;
                    this.control = true;
                    param = {
                        detailsId: parseInt(this.detailsId),
                        status: 3,
                        storeId: this.storeId,
                        refuseReason: this.refuseReason,
                    };
                    rae.setReturnAudit(param).then(res => {
                        this.$alert(res.data.message);
                    });
                }
                //这里必须加延迟函数,如果不加,状态更新会出现问题
                setTimeout(() => {
                    rae.getReturnDetails(this.detailsId).then(res => {
                        let data = res.data.data;
                        this.status = data.status;
                    });
                }, 1000);


            },
            /**
             *返回按钮
             * */
            auditReturn() {
                this.confirmRefund = true;
                this.auditSucceed = false;
            },
            /**
             * 确认退款按钮方法
             * */
            refund() {
                this.isConfirmReturn = true;
            },
            /**
             * 确认退款模态框的确定按钮方法
             * */
            confirmReturn() {
                this.isConfirmReturn = false;
                order.backPay(this.returnNumber).then(res => {
                    this.control = true;
                    this.$alert(res.data.message);
                });
                setTimeout(() => {
                    rae.getReturnDetails(this.detailsId).then(res => {
                        let data = res.data.data;
                        this.status = data.status;
                    });
                }, 1000);
            },
        },
        components: {
            breadCrumb,
            orderDetailsTable
        },
        computed: {
            navigationList() {
                switch (this.source) {
                    case 'saleReturnList':
                        return [{ name: ' 订单管理' },
                            { name: '退货列表', route: { path: '/salesReturnList' } },
                            { name: '退货详情' }];
                        break;
                    case 'adminSaleReturnList':
                        return [{ name: ' 订单管理' },
                            { name: '退货列表', route: { path: '/adminSalesReturnList' } },
                            { name: '退货详情' }];
                        break;
                    case 'incomeDetailList':
                        return [
                            { name: ' 账户管理' },
                            { name: '收入明细列表', route: '/incomeDetailList' },
                            { name: '退货详情' }
                        ];
                        break;
                    case 'unSettlementListDetail':
                        return [
                            { name: ' 账号管理' },
                            { name: '待结算列表', route: '/unSettlementList' },
                            {
                                name: '账单明细',
                                route: { path: '/unSettlementListDetail', query: { 'recordId': this.recordId } }
                            },
                            { name: '退货详情' }
                        ];
                        break;
                    case 'financialManageDetails':
                        return [
                            { name: ' 财务管理' },
                            { name: '供应商结算明细列表', route: '/financialManageList' },
                            {
                                name: '账单明细',
                                route: { path: '/financialManageDetails', query: { 'recordId': this.recordId } }
                            },
                            { name: '退货详情' }
                        ];
                        break;
                    case 'settlementListDetail':
                        return [
                            { name: ' 账号管理' },
                            { name: '已结算列表', route: '/settlementList' },
                            { name: '账单明细', route: '/settlementListDetail' },
                            { name: '退货详情' }
                        ];
                        break;
                }

            }
        }

    }
</script>
