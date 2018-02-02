<template>
    <div id="refundAudit">
       <div class="crumbs">
            <bread-nav :navigationList="navigationList"></bread-nav>
        </div>
        <el-row class="el_title">
            <el-col :span="8" :offset="4">
               <label>订单编号:</label>
                <span>{{ this.orderId}}</span>
            </el-col>
              <el-col :span="8" :offset="4">
               <label>收货人:</label>
                <span>{{receiver}}</span>
            </el-col>
        </el-row>
        <el-table
            :data="tableData"
            border>
            <el-table-column
                prop="goodsImage"
                label="商品图片">
                 <template scope="scope">
                    <img :src="scope.row.goodsImage" alt="" class="pic_thumb">
                </template>
            </el-table-column>
            <el-table-column
                prop="goodsName"
                label="商品名称">
            </el-table-column>
            <el-table-column
                prop="brandName"
                label="商品品牌">
            </el-table-column>
            <el-table-column
                prop="code69"
                label="商品条码">
            </el-table-column>
            <el-table-column
                prop="goodsAttribute"
                label="规格值">
            </el-table-column>
            <el-table-column
                prop="goodsNumber"
                label="商品数量">
            </el-table-column>
            <el-table-column label="app订货价">
                <template scope="scope">
                  {{scope.row.goodsUnitPrice|formatPrice}}
                </template>
            </el-table-column>
            <el-table-column
                label="抵扣优惠">
                <template scope="scope">
                    {{scope.row.goodsDiscount|formatPrice}}
                </template>
            </el-table-column>
            <el-table-column
              label="总额" min-width="80px">
               <template scope="scope">
                    {{scope.row.goodsTatolPrice|formatPrice}}
                </template>
              <template>
              </template>
            </el-table-column>
        </el-table>

        <el-form :model="refundInfo" label-width="80px" class="detail">
            <el-row>
                <el-col :span="8" :offset="4">
                    <el-form-item label="运费金额">
                        <el-input v-model="postage" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="实付金额">
                        <el-input v-model="payAmount" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="16" :offset="4">
                    <el-form-item label="退款理由">
                        <el-input v-model="refundInfo.reasonType" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="16" :offset="4">
                    <el-form-item label="退款原因">
                        <el-input v-model="refundInfo.reason" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <div v-if="orderStatus !=7 && previousStatus != 7">
                <el-row>
                    <el-col :span="12" :offset="4">
                        <el-form-item label="寄回单号">
                            <el-input v-model="refundInfo.sendbackNo" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2" style="margin-left:20px">
                         <el-button @click="trackLogistics">查看寄回单号</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="14" :offset="4">
                        <el-form-item label="图片展示">
                            <img :src="item.refuseMinImgUrl" alt="" v-for="item in refundInfo.pics">
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>

        </el-form>
        <el-row class="tc">
                <el-button size="medium" @click="back">返回上一级</el-button>
                <el-button size="medium" @click="refundRefuseLayer" v-if="!isPassed" :disabled="isForbidden">拒绝退款</el-button>
                <el-button size="medium" @click="refundLayer" v-if="!isPassed" :disabled="isForbidden">审核通过</el-button>
                <el-button size="medium" @click="openWarning" v-if="isPassed" :disabled="isNotRefund">确认退款</el-button>
        </el-row>

        <!-- 确认退款弹层 -->
        <el-dialog title="提示" :visible.sync="isWarning" size="tiny" custom-class="min_width">
            <div class="orderList-repay">
                <p>
                    <span>订单编号：</span>
                    <small>{{orderId}}</small>
                </p>
                <p>
                    <span>应退金额：</span>
                    <small>{{currentOrderTotal|formatPrice}}</small> 元
                </p>
            </div>
            <p>您是否确认要退款？</p>
            <span slot="footer" class="dialog-footer warning">
                <el-button @click="isWarning = false" class="fl">取 消</el-button>
                <el-button type="primary" @click="backPay" class="fr">确 定</el-button>
                 <small v-if="isShowHint">提示:请您确认退回货物无误后再进行退款</small>
            </span>
        </el-dialog>

        <!-- 退款审核通过 弹层 -->
        <el-dialog title="提示"
            :visible.sync="isOpen"
            width="40%">
            <span>是否通过退款审核？</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="isOpen = false">取 消</el-button>
            <el-button type="primary" @click="refundAudit(10)">确 定</el-button>
          </span>
        </el-dialog>

          <!-- 拒绝退款审核 弹层 -->
        <el-dialog title="拒绝原因"
            center
            :visible.sync="bOpen"
            width="30%">
            <textarea class="refuseReason" v-model="refuseRefundReason" :disabled="isNotEditable" maxlength="199">这个是我的拒绝理由</textarea>
            <span slot="footer">
                <el-button @click="bOpen = false">取 消</el-button>
                <el-button type="primary" @click="refundAudit(11)">确 定</el-button>
          </span>
        </el-dialog>

         <!-- 查看物流模态框-->
        <el-dialog title="物流信息" :visible.sync="isLogic" size="tiny">
            <!--自配送信息-->
            <div v-show="isShowInfo">
                <div class="form-horizontal">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">配送人姓名</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" disabled v-model="distributorName">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">配送人电话</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" disabled v-model="distributorMobile">
                        </div>
                    </div>
                </div>
            </div>
            <!--其他配送信息-->
            <div v-show="!isShowInfo" class="orderList-trackInfo">
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
    </div>
</template>

<script>
    import '../../../static/css/refundAudit.less'
    import Vue from 'vue';
    import api from '../../api/order';
    import globalData from '../../common/global';
    import { mapGetters } from 'vuex';
    import breadNav from '../../components/Breadcrumb.vue';
    import filter from '../../utils/filter.js'
    export default {
        data() {
            return {
                storeId : '', //在审核的时候，需要传入（接口需求更改）
                orderId: '',
                receiver: '',//收货人
                // 退款商品信息
                tableData: [],
                    // 退货原因部分
                refundInfo: {
                    postage: '',
                    payAmount: '',
                    reasonType: '',
                    reason: '',
                    sendbackNo: '',
                },
                // accountId: '',
                isShowHint: false,
                orderStatus: '',
                isWarning: false,
                isOpen: false, //退款审核同意弹层；
                bOpen : false, //退款审核拒绝 弹层
                refuseRefundReason: '',//拒绝退款原因；
                distributorName:'', //自配送发货人姓名；
                distributorMobile: '',//自配送发货人电话；
                logisticsData: [{
                    ftime: '',
                    context: '',
                }],
                isShowInfo: false, //物流信息；
                isLogic: false,//物流弹窗界面；

                isNotEditable: false,//textarea默认可以编辑；
                currentOrderTotal: '',//应退金额
                previousStatus: '', //前一个状态，做区分用；
                isPassed: false,//是否通过审核，默认是false,在点击审核通过后，隐藏拒绝退款，显示确认退款
                isNotRefund: true,//不能退款，默认是true;
                isForbidden: false, //根据不同的订单状态来设置下面按钮的状态；
                deliveryMethod: '',//发货方式
                msgId: 0,

            };
        },
        /*
         * 目前只有5,6,7,9,10,11 状态才能进来；
         * 开始的时候，都没有寄回物流（在退款审核通过后，在门店端发货后，才会生成寄回物流（状态此时为9 退款中））
         * 6已退款，需要通过上一个状态来看，是取消退款，还是拒收退款，来确定有没有物流
         * 9 退款中。。 拒收后，需要点击 审核通过，状态变为 10，当门店端寄回物品时候，产生寄回物流，这时候，状态改为退款中，退款按钮可以操作；
         * 11 拒绝退款， 点击拒绝退款，填写理由后，改成状态 11，拒绝退款置灰，审核通过照样可点；
         * 10 审核通过之后，不能退款，状态为 审核通过；
         * 只有 退款中 和 已退款 才能看到物流  （已退款9 上一个状态必须为9，也就是从 退款中过来的 （支付取消退款是没有这个状态的））
         */
        created() {
            this.orderId = this.$route.query.id;
            this.isAdmin = JSON.parse(localStorage.getItem('account')).isAdmin;
            // this.accountId = this.$route.query.accountId;
            this.orderStatus = this.$route.query.status;
            this.msgId = this.$route.query.messageId;
            this.getRefundDetail();
        },
        methods: {
            getRefundDetail(){
                switch(Number(this.orderStatus)) {
                    case 6:
                        this.isForbidden = true;
                        this.isNotRefund = true;
                        this.isPassed = true;
                        break;
                    case 7:
                        this.isPassed = true;
                        this.isNotRefund = false;
                        break;
                    case 9:
                        this.isNotRefund = false;
                        this.isPassed = true;
                        break;
                    case 10:
                        this.isPassed = true;
                        break;
                    case 11:
                        this.isNotEditable = true;
                        break;
                }
                this.getRefuseDetail();
            },
            /*
             * 付款已取消状态和 拒收待审核状态 调同一个接口；
             */

            getRefuseDetail (){
                api.refuseAuditDetail(this.orderId).then( res => {
                    let info = res.data.data;
                    if(res.data.code == 1) {
                        this.previousStatus = info.prefixOrderStatus ;
                        this.receiver = info.orderReceiverName;
                        this.tableData = info.purchaseItemVoList;
                        this.refundInfo.postage = info.orderPostage;
                        this.refundInfo.payAmount = info.payAmount;
                        this.refundInfo.reasonType = info.refuseType;
                        this.refundInfo.reason = info.refuseReason;
                        this.refundInfo.sendbackNo = info.logisticsShipmentNumber;
                        this.refundInfo.pics = info.refuseImgUrl;
                        this.refuseRefundReason = info.storeRefuseReason;
                        this.deliveryMethod = info.logisticsShipMethod;
                        this.distributorName = info.distributorName;
                        this.distributorMobile = info.distributorMobile;
                        this.storeId = info.storeId;
                    } else {
                        this.$message.error('请求失败，请稍后重试！')
                    }
                }).catch(err => {
                    console.log(err)
                })
            },

            openWarning() {
                this.isShowHint = this.orderStatus == 5 ? true : false;
                this.isWarning = true;
                api.getOrderById(this.orderId).then((res) => {
                    let orderInfo = res.data.data;
                    if (res.data.code === 1) {
                        let goodsList = orderInfo.purchaseItemVoList;
                        orderInfo.orderPostage =  orderInfo.orderPostage == '包邮' ? '0' : orderInfo.orderPostage;
                        let orderPostage = orderInfo.orderPostage && orderInfo.orderPostage.slice(1) || 0;
                        if(this.isShowHint) {
                            this.currentOrderTotal = (orderInfo.payAmount - orderPostage).toFixed(2);
                        } else {
                            this.currentOrderTotal = orderInfo.payAmount;
                        }

                    } else {
                        this.$alert('请求失败');
                    }

                }).catch((err) => {
                    console.log('错误是：' + err);
                });
            },
            // 确认退款；
            backPay() {
                let id = this.orderId;
                this.isWarning = false;
                api.backPay(id).then((res) => {
                    if (res.data.code == 1) {
                        this.$alert('退款成功！');
                        // 异步执行；
                        setTimeout(() => {
                            this.$router.push({path:'/refundAudit', query: {id: this.orderId, status: 6, accountId: this.accountId, source:'adminList'}});
                        },20);
                    } else {
                        this.$message.error(res.data.message);
                    }
                }).catch(function (msg) {
                    console.log('error message is: ' + msg);
                });
            },

            back(){
                // 这里需要判断来源；
                let source = this.source;
                var routePath = '';
                /*
                 * 这个地方返回需要判断来源，包括 orderList,orderDetail, adminOrderList,adminOrderDetail
                 */
                if(this.accountId) {
                    switch(source){
                        case 'list':
                            routePath = {path:'/orderList',query:{accountId: this.accountId}};
                            this.$store.dispatch('setFlag', true);
                            break;
                        case 'detail':
                            routePath = {path:'/orderDetail',query:{id: this.orderId, status: this.orderStatus, accountId: this.accountId, source: 'list'}};
                            break;
                        default:
                            break;
                    };
                } else {
                     switch(source){
                        case 'list':
                            routePath = {path:'/orderList',query:{}};
                            this.$store.dispatch('setFlag', true);
                            break;
                        case 'detail':
                            routePath = {path:'/orderDetail',query:{id: this.orderId, status: this.orderStatus,source: 'list'}}
                            break;
                        case 'adminList':
                            routePath = {path:'/adminOrderList',query:{}};
                            this.$store.dispatch('setFlag', true);
                            break;
                        case 'adminDetail':
                            routePath = {path:'/orderDetail',query:{id: this.orderId, status: this.orderStatus, source: 'adminList'}}
                            break;
                        default:
                            break;
                    };
                }

                /*
                 *  从供应商-> 订单列表 进来，需要在路由上传入accountId;
                 *  订单详情里面过来，需要带上 orderId和orderStatus;
                 *
                 */
                this.$router.push(routePath);
            },

            refundRefuseLayer() {
                this.bOpen = true;
                if(this.orderStatus == 11) {

                }
            },

            // 审核弹层
            refundLayer() {
                this.isOpen = true;
            },

            refundAudit(status){
                // 如果当前是已退款状态，阻止后续操作；
                if(this.orderStatus == 11) {
                    this.bOpen = false;
                    return;
                }
                // 根据传值来区分是 通过了，还是拒绝了；并进行参数拼接；
                let param = {
                    status: status,
                    orderId: this.orderId,
                    storeId: this.storeId,
                    storeRefuseReason: this.refuseRefundReason,
                };

                if(status == 11 && !this.refuseRefundReason) {
                    this.$alert('拒绝退款理由不能为空！')
                    return;
                }

                if(status == 11) {
                     this.bOpen = false;
                 } else if(status == 10) {
                    this.isOpen = false;
                 }

                api.auditRefund(param).then(res => {
                        if(res.data.code == 1) {
                            switch(status) {
                                case 10:
                                    this.$alert('同意退款成功！');
                                    this.isOpen = false;
                                    this.isPassed = true;
                                    setTimeout(() => {
                                        this.$router.push({path:'/refundAudit', query: {id: this.orderId,status: 10, source: 'adminList' }});
                                    },20);
                                    break;
                                case 11:
                                    this.$alert('拒绝退款成功！');
                                    this.isNotEditable = true;
                                    this.bOpen = false;
                                    setTimeout(() => {
                                        this.$router.push({path:'/refundAudit', query: {id: this.orderId,status: 6, source: 'adminList' }});
                                    },20);
                                    break;
                                default:
                                    break;
                            }
                        } else {
                            this.$message.error(res.data.message);
                        }

                }).catch(err => {
                    console.log(err)
                })
            },

            trackLogistics() {
                /*
                 * 根据发货方式，弹出不同物流信息；
                 */
                this.isLogic = true;
                if(this.deliveryMethod == 2) {
                    this.isShowInfo = false;
                } else if (this.deliveryMethod == 1) {
                    this.isShowInfo = true;
                } else {
                    this.$alert('请输入发货方式');
                    this.logisticsData = [];
                    return;
                }
                let  sendbackNo = this.refundInfo.sendbackNo;
                api.trackLogistics(sendbackNo).then(res => {
                    if (res.data.code === 1) {
                        this.logisticsData = res.data.data;
                    } else {
                         this.logisticsData = [];
                    }
                }).catch(err => {

                })
            }
        },

        components: {
            breadNav,
        },
        computed: {
            accountId(){
                return this.$route.query.accountId;
            },
            source(){
                return this.$route.query.source;
            },
            navigationList() {
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
                                    name: '退款详情',
                                },
                        ];
                }
                /*
             * 根据不同的来源，配置对应的 面包屑导航；
             */
            let currentPath = {
                    name: '退款详情'
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
                                    name: '订单详情',
                                    route: { path: '/orderDetail', query: {accountId: this.accountId, id: this.orderId} }
                                },
                            ];
                            break;
                        default:
                            break;
                    }

                } else {
                    switch (this.source) {
                        case 'list':
                            path = [
                                {
                                    name: ' 订单管理',
                                },
                                {
                                    name: '订货列表',
                                    route: { path: '/orderList', query: {} }
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
                                    route: { path: 'orderDetail', query: {id: this.orderId,source: 'list'} }
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
                                    route: { path: '/adminOrderDetail', query: {id: this.orderId, source: 'adminList'} }
                                },
                            ];
                            break;
                        case 'barterList':
                            path = [
                                {
                                    name: ' 订单管理',
                                },
                                {
                                    name: '换货列表',
                                    route: { path: '/barterList', query: {} }
                                },
                                {
                                    name: '订单详情',
                                    route: { path: '/orderDetail', query: {id: this.orderId, source: this.source} }
                                },
                            ];
                        case 'adminBarterList':
                            path = [
                                {
                                    name: ' 订单管理',
                                },
                                {
                                    name: '换货列表',
                                    route: { path: '/adminBarterList', query: {} }
                                },
                                {
                                    name: '订单详情',
                                    route: { path: '/orderDetail', query: {id: this.orderId, source: this.source} }
                                },
                            ];
                        case 'salesReturnList':
                            path = [
                                {
                                    name: ' 订单管理',
                                },
                                {
                                    name: '退货列表',
                                    route: { path: '/salesReturnList', query: {} }
                                },
                                {
                                    name: '订单详情',
                                    route: { path: '/orderDetail', query: {id: this.orderId, source: this.source} }
                                },
                            ];
                        case 'adminSalesReturnList':
                            path = [
                                    {
                                        name: ' 订单管理',
                                    },
                                    {
                                        name: '退货列表',
                                        route: { path: '/adminSalesReturnList', query: {} }
                                    },
                                    {
                                        name: '订单详情',
                                        route: { path: '/orderDetail', query: {id: this.orderId, source: this.source} }
                                    },
                                ];
                            break;
                        default:
                            break;
                    };
              }
                path.push(currentPath);
                return path;
        },
        /*
         * 格式化 input 里面的价格；
         */
        postage() {
            return this.refundInfo.postage == 0 ? '包邮' : filter.formatMoney(this.refundInfo.postage);
            },

        payAmount() {
            return filter.formatMoney(this.refundInfo.payAmount);
        }
    },

       watch: {
            $route: {
                 handler: function() {
                    // 监听路由改变，重新获取数据；
                    this.orderId = this.$route.query.id;
                    this.isAdmin = JSON.parse(localStorage.getItem('account')).isAdmin;
                    this.orderStatus = this.$route.query.status;
                    this.getRefundDetail();
                },
            },
        },
}
</script>
