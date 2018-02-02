<template>
    <!-- 订单确认详情； -->
    <div id="deliverGoods">
        <div class="orderList_nav crumbs">
            <bread-nav :navigationList="navigationList"></bread-nav>
        </div>
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
                <p class="col-xs-9">
                    <span>收货地址：</span>
                    <span>{{confirmDetails.receivingAddress}}</span>
                </p>
                <img :src="confirmDetails.qrcodeUrl" alt="" alt="" class="qr-pic" v-show="isQr">
                <p class="refresh" v-show="!isQr"><i class="glyphicon glyphicon-refresh" :class="{loading: isLoading}"  @click="getQrCode" ></i></p>
                <p class="hint" v-show="isQr">扫二维码，确认收货</p>
                <p class="hint" v-show="!isQr">点击获取二维码</p>
            </div>
            <p>下单日期:<span>{{confirmDetails.orderCreateTime}}</span></p>
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
            <button class="btn btn-default" @click="prevStep">上 一 步</button>
            <button class="btn btn-primary" @click="printDetail">确认打印</button>
            <button class="btn btn-default" @click="deliverGoods">提交完成</button>
        </div>
    </div>
</template>
<!-- 从外部导入less -->
<script>
    import api from '../../api/order';
    import '../../../static/css/deliverGoods.less';
    import breadNav from '../../components/Breadcrumb.vue'

    export default {
        data() {
            return {
                isShow: true,//是否显示按钮部分；（打印状态不可见）
                pricePrint: '是', //是否打印价格部分；
                orderId: '',
                orderStatus: '',
                // 获取到的订单详情；
                confirmDetails: {},
                // 来源页面（list，列表页，details详情页）
                source: '',
                // 是否有二维码，没有显示刷新按钮；
                isQr: true,
                // 防止频繁操作；
                canRefresh : true,
                // 加载状态；
                isLoading : false,
                deliverParams : {},
                isAdmin : false,//管理员还是供应商
                msgId: 0,//订单详细过来的；
            };
        },
        created() {
            this.msgId = this.$route.query.messageId;
            // 从路由中取出orderId 和 orderStatus;来源页
            this.orderId = this.$route.query.id;
            this.orderStatus = this.$route.query.status;
            this.source = this.$route.query.source;
            if(this.accountId){
                this.isAdmin = true;
            };
            // 获取用户填入的物流信息；
            // this.deliverParams.name = this.$route.query.name;
            // this.deliverParams.receiveMethod = this.$route.query.receiveMethod;
            // this.deliverParams.number = this.$route.query.number;
            this.deliverParams = this.$store.getters.logiticsInfo;
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

            // 确认发货；
            deliverGoods (){
                api.deliverGoods(this.orderId, this.deliverParams).then((res) => {
                    if (res.data.code == 1) {
                        this.$alert('发货成功');
                        // 提交成功，返回；

                       /*
                        * 单独处理 消息列表；
                        */
                        if(this.msgId) {
                            setTimeout(()=>{ this.$router.push({path:'/orderDetail',query:{id: this.orderId, messageId: this.msgId}});},1000)
                            return ;
                        }

                        //判断来源
                       let path;
                       if(this.accountId) {
                            switch(this.source){
                                case 'list' :
                                    path = '/orderList?accountId=' + this.accountId;
                                    break;
                                case 'detail':
                                    path = '/orderDetail?id=' + this.orderId + '&status='+this.orderStatus + '&accountId=' + this.accountId + '&source=list';
                                    break;
                                default :
                                    break;
                            }
                       } else {
                            switch(this.source){
                                case 'list' :
                                    path = '/orderList';
                                    break;
                                case 'detail':
                                    path = '/orderDetail?id=' + this.orderId + '&status='+this.orderStatus+ '&source=list';
                                    break;
                                case 'adminList':
                                    path = '/adminOrderList';
                                    break;
                                case 'adminDetail':
                                    path = '/adminOrderDetail?id=' + this.orderId + '&status='+ this.orderStatus+ '&source=adminList';
                                    break;
                                default :
                                    break;
                        }
                       }

                        setTimeout(()=>{
                            this.$router.push(path)
                        },1000)
                    } else {
                        this.$alert('发货失败，请重试！');
                    }

                }).catch(function (msg) {
                    console.log('error message is: ' + msg);
                })
            },
            // 返回上一步
            prevStep (){
                if(this.msgId) {
                    this.$router.push({path:'/orderLogistics',query:{id: this.orderId, status: this.orderStatus,messageId: this.msgId}})
                } else {
                    this.$router.push({path:'/orderLogistics',query:{id: this.orderId, status: this.orderStatus,accountId: this.accountId,source: this.source}})
                }

                this.$store.dispatch('setRemember', true)
            }
        },
        computed: {
            accountId (){
                return  this.$route.query.accountId;;
            },
            navigationList(){
                if(this.msgId) {
                    return [
                                {
                                    name: ' 消息',
                                },
                                {
                                    name: '订单消息列表',
                                    route: { path: '/messageList', query: {activelabel: 'order'}}
                                },
                                {
                                    name: '订单详情',
                                    route: { path: '/orderDetail', query: {id: this.orderId,status: this.orderStatus, messageId: this.msgId} }
                                },
                                {
                                    name: '添加物流信息',
                                    route: { path: '/messageList', query: {id: this.orderId,status: this.orderStatus, messageId: this.msgId}}
                                },
                                {
                                    name: '确认发货',
                                },
                        ]
                };

                let currentPath = {
                    name: '确认发货'
                };
                var path = '';
                if(this.accountId) {
                    switch(this.source) {
                        case 'list':
                            path = [
                                {
                                    name: ' 供应商管理',
                                },
                                {
                                    name: '供应商列表',
                                    route: { path: '/supplierInfoList', query: {} }
                                },
                                {
                                    name: '订货列表',
                                    route: { path: '/orderList', query: {accountId: this.accountId} }
                                },
                                {
                                    name: '添加物流信息',
                                    route: { path: '/orderLogistics', query: {accountId: this.accountId,id: this.orderId,status: this.orderStatus} }
                                },
                            ];
                            break;
                        case 'detail':
                            path = [
                                {
                                    name: ' 供应商管理',
                                },
                                {
                                    name: '供应商列表',
                                    route: { path: '/supplierInfoList', query: {} }
                                },
                                {
                                    name: '订货列表',
                                    route: { path: '/orderList', query: {accountId: this.accountId} }
                                },
                                {
                                    name: '订货详情',
                                    route: { path: '/orderDetail', query: {accountId: this.accountId,id: this.orderId, status: this.orderStatus} }
                                },
                                {
                                    name: '添加物流信息',
                                    route: { path: '/orderLogistics', query: {accountId: this.accountId,id: this.orderId,status: this.orderStatus} }
                                },
                            ];
                    }

                } else {
                    switch(this.source) {
                        case 'list':
                            path = [
                                {
                                    name: ' 订单管理',
                                },
                                {
                                    name: '订货列表',
                                    route: { path: '/orderList', query: {} }
                                },
                                {
                                    name: '添加物流信息',
                                    route: { path: '/orderLogistics', query: {accountId: this.accountId,id: this.orderId,status: this.orderStatus} }
                                },
                            ];
                            break;
                        case 'detail':
                            path = [
                                {
                                    name: ' 订单管理',
                                },
                                {
                                    name: '订货列表',
                                    route: { path: '/orderList', query: {} }
                                },
                                {
                                    name: '订单详情',
                                    route: { path: '/orderDetail', query: {id: this.orderId,status: this.orderStatus} }
                                },
                                {
                                    name: '添加物流信息',
                                    route: { path: '/orderLogistics', query: {accountId: this.accountId,id: this.orderId,status: this.orderStatus} }
                                },

                            ];
                            break;
                        case 'adminList':
                            path = [
                                {
                                    name: ' 订单管理',
                                },
                                {
                                    name: '订货列表',
                                    route: { path: '/adminOrderList', query: {} }
                                },
                                {
                                    name: '添加物流信息',
                                    route: { path: '/orderLogistics', query: {accountId: this.accountId,id: this.orderId,status: this.orderStatus} }
                                },
                            ];
                            break;
                        case 'adminDetail':
                            path = [
                                {
                                    name: ' 订单管理',
                                },
                                {
                                    name: '订货列表',
                                    route: { path: '/adminOrderList', query: {} }
                                },
                                 {
                                    name: '订单详情',
                                    route: { path: '/adminOrderDetail', query: {id: this.orderId, status: this.orderStatus}}
                                },
                                {
                                    name: '添加物流信息',
                                    route: { path: '/orderLogistics', query: {accountId: this.accountId,id: this.orderId,status: this.orderStatus} }
                                },
                            ];
                            break;
                    }
                }

                path.push(currentPath);
                return path;
            }
        },
        components:{
            breadNav,
        }
    };
</script>
