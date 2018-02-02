<template>
    <div id="confirmReceipt" class="container-fluid">
        <h3 class="text-center title">透云智购【收货单】</h3>
        <p>供应商：<span>{{confirmReceiptDetails.providerName}}</span></p>
        <p>客    户：<span>{{confirmReceiptDetails.customer}}</span></p>
        <p>客户电话：<span>{{confirmReceiptDetails.customerPhone}}</span></p>
        <p>收货地址：<span>{{confirmReceiptDetails.receivingAddress}}</span></p>
        <p>订单创建日期：<span>{{confirmReceiptDetails.orderCreateTime}}</span></p>
        <p>订单编号：<span>{{confirmReceiptDetails.orderId}}</span></p>
            <!-- 订单详情表单 -->
            <div class="detail-container">
                <div class="item-detail" v-for="item in confirmReceiptDetails.purchaseItemPrintVos">
                    <p class="col-xs-12">商品名称：<span>{{item.goodsName}}</span></p>
                    <p class="col-xs-12">商品条码：<span>{{item.code69}}</span></p>
                    <div class="commodity">
                        <p class="col-xs-6">商品品牌：<span>{{item.brandName}}</span></p>
                        <p class="col-xs-6">商品规格：<span>{{item.goodsAttribute}}</span></p>
                    </div>

                    <div class="">
                        <p class="col-xs-6">单价：<span>￥{{item.goodsUnitPrice}}</span></p>
                        <p class="col-xs-6">数量：<span>{{item.goodsNumber}}</span></p>
                    </div>
                </div>
                <footer class="total">
                    <p class="col-xs-4">实付款：</p>
                    <p class="col-xs-8 text-right">￥{{totalPrice}}（含运费：￥{{orderPostage}}）</p>
                </footer>
            </div>
            <footer class="conduct row">
                <div v-if="!isConducted">
                    <p>请对照配送单仔细核对商品，确保商品数量和质量都正常的情况下，再确认收货。</p>
                    <button class="btn btn-info" @click="openRefuseReason">拒收</button>
                    <button class="btn btn-info" @click="openConfirmReceipt">确认收货</button>
                </div>
                <button class="btn btn-primary" disabled v-if="isConducted">{{txt}}</button>
            </footer>
            <!-- 确认收货弹层 -->
            <el-dialog
              title="确认收货"
              :visible.sync="isOpen"
              size="large" class="text-center">
              <span>确定要确认收货吗？</span>
              <span slot="footer" class="dialog-footer text-center">
                <el-button @click="isOpen = false">取 消</el-button>
                <el-button type="primary" @click="confirmReceipt">确 定</el-button>
              </span>
            </el-dialog>

    </div>

</template>
<script>
    import api from '../../api/order';
    import '../../../static/css/confirmReceipt.less'
    export default {
        data() {
            return {
                    orderId : '',
                    orderStatus : '',
                    // 获取到的订单详情；
                    confirmReceiptDetails : {},
                    isConducted : false,
                    txt :'',
                    // 二维码状态；
                    qrcodeStatus: '',
                    // 确认收货弹窗；
                    isOpen : false,
                    // 总价格；
                    totalPrice: 0,
                    orderPostage: 0,
            }
        },
        created() {
              this.orderId = this.$route.query.orderId;
           // this.orderId = '201709151806552604142400345596';
           // 需要从路由里面取出id否则就会出错；
            let id = this.orderId;
            this.getOrderDetails(id);
        },
        methods: {
            getOrderDetails (orderId){
                 //发送请求，获取订单详情
                api.searchPrintItems({orderId:orderId}).then((res) => {
                    // 每一个都是promise实例，data就是resolve处理出来的结果；
                    if( res.data.code == 1 ) {
                        if(!res.data.data) {
                             this.$message.error('暂无数据');
                            this.isConducted = true;
                            this.txt = '暂无数据';
                            return;
                        }
                        this.confirmReceiptDetails = res.data.data;
                        // 假如订单状态是19，处理成3进行处理；
                        this.orderStatus = res.data.data.orderStatus == 19 ? 3 : res.data.data.orderStatus;
                        this.qrcodeStatus = res.data.data.qrcodeStatus;
                        this.getText();
                        this.totalPrice = res.data.data.orderTotalPrice;
                        this.orderPostage = res.data.data.orderPostage;
                    } else {
                        this.$message.error('请求失败')
                    }
                }).catch(function(err){
                        console.log('错误是：' + err);
                });
            },

            confirmReceipt (){
                let params = {orderId : this.orderId};
                api.sweepReceiving(params).then((res) => {
                        /*
                         * 业务逻辑： 在用户付款完毕，通过orderId等生成二维码，并将当前订单信息传入后台；
                         *  在用户在手机页面 点击确认收货，或者拒收的时候，传入对应的参数，并和后台比对；
                         */
                    this.isOpen = false;
                    if(res.data.code === 1) {
                        this.isConducted = true;
                        alert('收货成功！');
                        this.txt = '已收货'
                    } else {
                        this.$message.error('收货失败，请稍后再试')
                    }
                })

            },

            openRefuseReason (){
                  this.$router.push({path: '/confirmReceiptRefuse', query:{orderId:this.orderId}});
            },
            openConfirmReceipt (){
                this.isOpen = true;

            },
            // 根据订单状态，显示是否能够操作；0有效。。。1失效；
            getText (){
                if(this.qrcodeStatus != 0 || this.orderStatus != 3) {
                    this.isConducted = true;
                };

                if(this.orderStatus == 3 && this.qrcodeStatus == 1) {
                    this.isConducted = true;
                    this.txt = '二维码已过期';
                    this.$message.error('二维码已过期');
                    return;
                }

                switch(true) {
                    case this.orderStatus == 3 && this.qrcodeStatus == 0:
                        this.isConducted = false;
                        break;
                    case this.orderStatus == 2:
                        this.txt='待发货';
                        break;
                    case this.orderStatus == 4:
                        this.txt = '已收货';
                        break;
                    case this.orderStatus == 5:
                        this.txt = '已拒收';
                        break;
                    case this.orderStatus == 6:
                        this.txt = '已退款';
                        break;
                    case this.orderStatus == 7:
                        this.txt = '已取消';
                        break;
                    default:
                        this.txt = '无法操作当前订单';
                        break;
                };

            },
        },

        computed: {
        },
    }
</script>
