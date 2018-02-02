<template>
    <!-- 订单确认详情； -->
    <div id="orderConfirmDetails">
        <header class="p-rel" v-if="isShow">
            <div class="p-abs">
                <h3>是否打印价格？</h3>
                <el-radio-group v-model="pricePrint" class="price_select">
                    <el-radio-button label="是"></el-radio-button>
                    <el-radio-button label="否"></el-radio-button>
                </el-radio-group>
            </div>
        </header>
        <div ref="orderConfirmDetails">
            <!-- 数据绑定 -->
            <h3 class="text-center orderConfirmDetails-title">{{confirmDetails.providerName}}</h3>
            <p>订单编号：<span>{{confirmDetails.orderId}}</span></p>
            <p>客户：<span>{{confirmDetails.customer}}</span></p>
            <p>客户电话：<span>{{confirmDetails.customerPhone}}</span></p>
            <div class="row orderConfirmDetails-qr">
                <p class="col-xs-8">
                    <span>收货地址：</span>
                    <span>{{confirmDetails.receivingAddress}}</span>
                </p>
                <img :src="confirmDetails.qrcodeUrl" alt="" class="qr-pic" v-show="isQr">
                <p class="refresh" v-show="!isQr"><i class="glyphicon glyphicon-refresh" :class="{loading: isLoading}"  @click="getQrCode" ></i></p>
                <p class="hint" v-show="isQr">扫二维码，确认收货</p>
                <p class="hint" v-show="!isQr">点击获取二维码</p>
            </div>
            <p>下单日期：<span>{{confirmDetails.orderCreateTime}}</span></p>
            <!-- 订单详情表单 -->
            <table class="table table-bordered table-hover text-center">
                <thead>
                <tr>
                    <td>商品名称</td>
                    <td>商品品牌</td>
                    <td>商品条码</td>
                    <td>规格值</td>
                    <td>商品数量</td>
                    <td v-if="pricePrint=='是'">app订货价</td>
                    <td v-if="pricePrint=='是'">抵扣优惠</td>
                    <td v-if="pricePrint=='是'">总额</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in confirmDetails.purchaseItemPrintVos">
                    <td>{{item.goodsName}}</td>
                    <td>{{item.brandName}}</td>
                    <td>{{item.code69}}</td>
                    <td>{{item.goodsAttribute}}</td>
                    <td>{{item.goodsNumber}}</td>
                    <td v-if="pricePrint=='是'">{{item.goodsUnitPrice|formatPrice}}</td>
                    <td v-if="pricePrint=='是'">{{item.goodsDiscount|formatPrice}}</td>
                    <td v-if="pricePrint=='是'">{{item.goodsTatolPrice|formatPrice}}</td>
                </tr>
                <tr v-if="pricePrint=='是'">
                    <td>商品金额小计</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{{confirmDetails.totalPrice|formatPrice}}</td>
                </tr>
                <tr v-if="pricePrint=='是'">
                    <td>运费金额</td>
                    <td>{{confirmDetails.orderPostageCN}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{{confirmDetails.orderPostage|formatPrice}}</td>
                </tr>
                <tr v-if="pricePrint=='是'">
                    <td>折扣优惠</td>
                    <td>{{confirmDetails.discountCN}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{{confirmDetails.discount|formatPrice}}</td>
                </tr>
                <tr v-if="pricePrint=='是'">
                    <td>总计金额</td>
                    <td>{{confirmDetails.orderTotalPriceCN}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{{confirmDetails.orderTotalPrice|formatPrice}}</td>
                </tr>
                <tr v-if="pricePrint=='是'">
                    <td>实付金额</td>
                    <td>{{confirmDetails.payAmountCN}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{{confirmDetails.payAmount|formatPrice}}</td>
                </tr>

                </tbody>
            </table>
        </div>
        <div class="text-center">
            <button class="btn btn-primary" @click="printDetail">确认打印</button>
            <button class="btn btn-default" @click="back">取   消</button>
        </div>
    </div>
</template>
<!-- 从外部导入less -->
<script>
    import api from '../../api/order';
    import '../../../static/css/orderConfirmDetails.less';

    export default {
        data() {
            return {
                pricePrint: '是',
                orderId: '',
                orderStatus: '',
                isShow: true,//是否显示按钮部分；（打印状态不可见）
                // 获取到的订单详情；
                confirmDetails: {},
                // 来源页面（管理账号下的订单详情，还是供应商下面的）
                source: '',
                // 是否有二维码，没有显示刷新按钮；
                isQr: true,
                // 假如是供应商过来的，需要传入accountId;
                accountId : '',
                // 防止频繁操作；
                canRefresh : true,
                // 加载状态；
                isLoading : false,
                msgId: 0,
            };
        },
        created() {
            // 从路由中取出orderId 和 orderStatus;来源页
            this.orderId = this.$route.query.id;
            this.orderStatus = this.$route.query.status;
            this.source = this.$route.query.source;
            this.accountId = this.$route.query.accountId;
            this.msgId = this.$route.query.messageId;
            // 获取当前配送单详情；
            this.getOrderDetails(this.orderId);
        },
        methods: {
            // 在页面刚进来的时候，根据传过来的orderId;发请求；
            getOrderDetails(orderId) {
                //发送请求，获取订单详情
                api.searchPrintItems({orderId: orderId}).then((res) => {
                    if (res.data.code == 1) {
                        if (!res.data.data) {
                            this.$alert('暂无数据');
                            return;
                        }
                        this.confirmDetails = res.data.data;
                        this.isLoading = false;
                        if (!this.confirmDetails.qrcodeUrl) {
                            this.isQr = false;
                        } else {
                            this.isQr = true;
                        }

                    } else {
                        this.$alert('请求失败');
                    }
                }).catch(function (err) {
                    console.log('错误是：' + err);
                });
            },

            printDetail() {
                this.isShow = false;
                let contents = this.$refs.orderConfirmDetails.innerHTML;
                window.document.body.innerHTML = contents;
                window.print();
                window.location.reload();

            },
            // 如果生成二维码失败，点击重新生成；
            getQrCode() {
                this.isLoading = true;
                let ars = {orderId: this.orderId};

                if(this.canRefresh) {
                    this.canRefresh = false;
                    api.regenerateQr(ars).then((res) => {
                        // 判断在生成二维码成功后，重新发请求，获取二维码；
                        if (res.data.code == 1) {
                            // window.location.reload();
                            this.getOrderDetails(this.orderId);
                        } else {
                            this.$alert('获取二维码失败，请点击重试');
                        }
                    });
                } else{
                    this.$alert('二维码正在生成中，请稍等...')
                }

            },

            back() {

                 /*
                 * 消息列表单独处理
                 */
                 if(this.msgId) {
                    this.$router.push({path:'/orderDetail',query:{id: this.orderId, status: this.orderStatus,messageId: this.msgId}});
                    return;
                 }
                let originPath = '';
                /*
                 *  处理各种不同的路由，从订单详情带过来，然后在这里带回去，保证面包屑，路由逻辑正确
                 */
                switch (this.source) {
                    case 'list' :
                    case 'adminList':
                    case 'saleReturnList':
                    case 'barterList':
                    case 'financialOrderList':
                    case 'adminSaleReturnList':
                    case 'adminBarterList':
                        originPath = '/orderDetail';
                        break;
                    case 'adminOrderList' :
                        originPath = '/adminOrderDetail';
                        break;
                    default :
                        break;
                }
                /* 这里需求修改，
                 *   只有订单详情页面才能直接跳过来，所以，所以只用判断 管理账号下的，还是供应商账号下的；
                 *
                 *
				 */
                let param = {
                      id: this.orderId,
                      accountId : this.accountId,
                      source: this.source,
                    }
                this.$router.push({
                    path: originPath,
                    query: param,
                });
            },
        },
        computed: {},
    };
</script>
