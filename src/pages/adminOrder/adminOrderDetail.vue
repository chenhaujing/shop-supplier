<template>
    <div id="adminOrderDetail" ref="orderDetail">
        <div class="crumbs" v-if="isBtn">
            <div>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-date"></i> 订单管理</el-breadcrumb-item>
                    <el-breadcrumb-item>
                        <router-link :to="{path:'/adminOrderList'}">
                            订单列表
                        </router-link>
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>
                        <a href="javascript:location.reload()">订单详情</a>
                    </el-breadcrumb-item>
                    <img class="resize" alt="打印" title="打印" @click="exportorders"
                         src="../../../static/img/icon/print.png" v-has:adminOrderDetail_printOrder>
                </el-breadcrumb>
            </div>
        </div>
        <h4 class="pageTitle">订单详情</h4>
        <!--更改状态按钮-->
        <div class="row form-group form_group" v-if="isBtn">
            <div class="pull-left">
                <button class="btn btn-info" @click="openOrderConfirmDetails"
                        :disabled="orderStatus == 0 || orderStatus == 1 || orderStatus == 2 || orderStatus == 8">查看发货单
                </button>
            </div>
            <div class="pull-left">
                <button class="btn btn-info" @click="confirmOrder" :disabled="this.orderStatus !== 2" v-has:adminOrderDetail_confirmOrder>确认发货</button>
            </div>
            <div class="pull-left">
                <button class="btn btn-info" @click="seeLogics"
                        :disabled="orderStatus !== 3 && orderStatus !== 4 && orderStatus !== 19">查看物流
                </button>
            </div>
            <div class="pull-left">
                <button class="btn btn-info" @click="goToRefund" :disabled="orderStatus !== 7 && orderStatus !== 5" v-has:adminOrderDetail_backPay>
                    退款审核
                </button>
            </div>
            <div class="pull-left">
                <button class="btn btn-info" @click="changeLogicsNumLayer" :disabled="orderStatus !==3" v-has:adminOrderDetail_updateLogics>修改物流信息</button>
            </div>
        </div>
        <div class="adminOrderDetail_row clearfix">
            <div class="col-xs-6">
                <div class="form-horizontal">
                     <div class="form-group">
                        <label class="col-xs-4 text-right">订单编号:</label>
                        <div class="col-xs-6">
                            <span>{{detailWrap.orderId}}</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-4 text-right">下单时间:</label>
                        <div class="col-xs-6">
                            <span>{{detailWrap.orderCreateTime}}</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-4 text-right">支付类型:</label>
                        <div class="col-xs-6">
                            <span v-if="detailWrap.orderPaymentMethod == 1">支付宝</span>
                            <span v-if="detailWrap.orderPaymentMethod == 2">微信</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-4 text-right">支付流水号:</label>
                        <div class="col-xs-6">
                            <span>{{detailWrap.orderPaymentNum}}</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-4 text-right">收货人姓名:</label>
                        <div class="col-xs-6">
                            <span>{{detailWrap.orderReceiverName}}</span>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-xs-4 text-right">收货人电话:</label>
                        <div class="col-xs-6">
                            <span>{{detailWrap.orderReceiverMobile}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xs-6">
                <div class="form-horizontal">
                   <div class="form-group">
                        <label class="col-xs-4 text-right">订单状态:</label>
                        <div class="col-xs-6">
                            <span>{{getOrderStatusName}}</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-4 text-right">商品金额小计:</label>
                        <div class="col-xs-6">
                            <span>{{detailWrap.orderPrice|formatPrice}}</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-4 text-right">运费金额:</label>
                        <div class="col-xs-6">
                           <span v-if="orderFreight == '包邮'">{{orderFreight}}</span>
                           <span v-else>{{orderFreight|formatPrice}}</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-4 text-right">折扣优惠:</label>
                        <div class="col-xs-6">
                            <span>{{detailWrap.discount|formatPrice}}</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-4 text-right">收货地址:</label>
                        <div class="col-xs-6">
                            <span>{{detailWrap.orderAddress}}</span>
                        </div>
                    </div>
                    <div class="form-group" v-if="isBtn">
                        <label class="col-xs-4 control-label">
                            <el-button type="info" @click="checkInvoiceInfos" size="small" :disabled="isReceipt == 0 ? true : false" v-has:adminOrderDetail_invoiceDetail> 发票详情 </el-button>
                        </label>
                    </div>

                </div>
            </div>
        </div>
        <hr>
     <div class="order_table_title print_css">
            <h4 class="col-xs-2">订单商品列表</h4>
            <div class="col-xs-8 order_list_style">
                <div class="form-group col-xs-6">
                        <label class="text-right">合计金额：</label>
                        <div>
                           <span>{{detailWrap.orderTotalPrice|formatPrice}}</span>
                        </div>
                </div>
                <div class="form-group col-xs-6">
                    <label class="text-right">实付金额：</label>
                    <div>
                        <span>{{detailWrap.payAmount|formatPrice}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="order_table">
            <div class="order_table_content">
                <el-row>
                    <div class="col-xs-12 order_table_header">
                        <div class="col-md-6 col-xs-12">
                            <label>订单编号:</label>
                            <div class="col-xs-8">
                                <span>{{detailWrap.orderId}}</span>
                            </div>
                        </div>
                        <div class="col-md-3 col-xs-6">
                            <label>商品金额小计:</label>
                            <div class="col-xs-6">
                                <span>{{detailWrap.orderPrice|formatPrice}}</span>
                            </div>
                        </div>
                        <div class="col-md-3 col-xs-6">
                            <label>收货人:</label>
                            <div class="col-xs-6">
                                <span>{{detailWrap.orderReceiverName}}</span>
                            </div>
                        </div>
                    </div>
                </el-row>
                <table class="table table-bordered table-hover text-center" id="orders" ref="tableH">
                    <thead>
                    <tr class="list">
                        <td>商品图片</td>
                        <td>商品名称</td>
                        <td>商品品牌</td>
                        <td>商品条码</td>
                        <td>规格值</td>
                        <td>商品数量</td>
                        <td>App订货价</td>
                        <td>抵扣优惠</td>
                        <td>总额</td>
                        <td>是否退换货</td>
                        <td>退款金额</td>
                        <td>状态</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in detailWrap.purchaseItemVoList">
                        <td style="position:relative;">
                            <img :src="item.goodsImage" alt="" style="width:50%; max-width:50px;max-height:50px"
                                @mouseover="showImg(item.goodsImage,$event)" @mouseout="hiddenImg($event)">
                            <img class="orderDetail_tableImgHidden">
                        </td>
                        <td>{{item.goodsName}}</td>
                        <td>{{item.brandName}}</td>
                        <td>{{item.code69}}</td>
                        <td>{{item.goodsAttribute}}</td>
                        <td>{{item.goodsNumber}}</td>
                        <td>{{item.goodsUnitPrice|formatPrice}}</td>
                        <td>{{item.goodsDiscount|formatPrice}}</td>
                        <td>{{item.goodsTatolPrice|formatPrice}}</td>
                        <td>{{(item.type == 0 || item.type == 1) ? '是' : ''}}</td>
                        <td>{{item.returnMoney|formatPrice}}</td>
                        <td >
                            <span v-if="item.status == 5 && item.type == 1" @click="goToExchangeGoods(item.detailsId)">已换货</span>
                            <span v-if="item.status == 5 && item.type == 0" @click="goToReturnGoods(item.detailsId)">已退货</span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- 发票信息对话框 -->
        <el-dialog title="增值税普通发票（个人／企业）" :visible.sync="dialogInvoiceChange" size="small">
            <el-form :model="invoiceFormData">
                <!-- 发票类型: 0增值税个人发票,1增值税单位发票,2增值税专用发票 -->
                <el-form-item  class="col-xs-6">
                    <label class="dialog_label_style">发票抬头 </label>
                    <el-input class="col-xs-7" v-model="invoiceFormData.receiptType" :readonly="true" ></el-input>
                </el-form-item>
                <el-form-item class="col-xs-6">
                    <label class="dialog_label_style">开户银行 </label>
                    <el-input class="col-xs-7" v-model="invoiceFormData.depositBank" :readonly="true" ></el-input>
                </el-form-item>
                <el-form-item  class="col-xs-6" style="margin-bottom:16px;">
                    <label class="dialog_label_style">发票内容 </label>
                    <el-input class="col-xs-7" v-model="invoiceFormData.receiptContent" :readonly="true" ></el-input>
                </el-form-item>
                <el-form-item class="col-xs-6">
                    <label class="dialog_label_style">银行账户 </label>
                    <el-input class="col-xs-7" v-model="invoiceFormData.bankAmount" :readonly="true" ></el-input>
                </el-form-item>
                <el-form-item  class="col-xs-6">
                    <label class="dialog_label_style">纳税人识别号 </label>
                    <el-input class="col-xs-7" v-model="invoiceFormData.taxpayerNumber" :readonly="true" ></el-input>
                </el-form-item>
                <el-form-item class="col-xs-6">
                    <label class="dialog_label_style">电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话 </label>
                    <el-input class="col-xs-7" v-model="invoiceFormData.registerPhone" :readonly="true" ></el-input>
                </el-form-item>
                    <el-form-item class="col-xs-12">
                    <label class="dialog_label_style">公司地址 </label>
                    <el-input class="col-xs-7" v-model="invoiceFormData.registerAdress" :readonly="true" ></el-input>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 修改物流信息-->
             <el-dialog :title="myTitle" :visible.sync="isConfirm" class="myModal" :before-close="handleClose">
                <!-- 选择发货方式 -->
                <el-form :model="forms">
                    <template>
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <!-- 自配送 -->
                            <el-tab-pane label="自配送" name="selfSend" :disabled="receiveMethod === 2">
                                <el-form-item label="配送人姓名" :label-width="formLabelWidth" class="col-xs-12">
                                    <el-input v-model="forms.senderName" auto-complete="off" class="col-xs-6"
                                              placeholder="请输入姓名"></el-input>
                                </el-form-item>

                                <el-form-item label="配送人手机号" :label-width="formLabelWidth" class="col-xs-12">
                                    <el-input v-model="forms.senderNumber" auto-complete="off"
                                              class="col-xs-6" placeholder="请输入配送人手机号"></el-input>
                                </el-form-item>
                            </el-tab-pane>
                            <!-- 物流配送 -->
                            <el-tab-pane label="物流配送" name="logisticsCompany" :disabled="receiveMethod === 1">
                                <div>
                                    <el-form-item label="物流公司" :label-width="formLabelWidth" class="col-xs-12">
                                        <el-select v-model="forms.logistics" placeholder="请选择物流公司" class="col-xs-6"
                                                   @visible-change="getLogisticsName">
                                            <el-option v-for="(firm,index) in logisticsFirm"
                                                       :key="index"
                                                       :label="firm.name"
                                                       :value="firm.name"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="物流单号" :label-width="formLabelWidth" class="col-xs-12">
                                        <el-input v-model="forms.logisticsNumber" auto-complete="off"
                                                  class="col-xs-6" placeholder="请输入物流单号"></el-input>
                                    </el-form-item>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </template>
                </el-form>
                   <button class="btn btn-info pull-right reviseLogicsInfo" @click="reviseLogicsInfo" v-if="isRevise">修改</button>
            </el-dialog>

        <!-- 查看物流模态框-->
        <el-dialog title="物流信息" :visible.sync="seeLogicsVisible" size="tiny">
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
                    <div class="form-group orderDetail-inputLogicsNum">
                        <input type="text" class="form-control pull-left" placeholder="请输入物流单号" v-model="logisticsNum">
                        <button type="submit" class="btn btn-info pull-right" @click="trackLogisticsInfo(-1)">查询
                        </button>
                    </div>
                    <!-- 物流信息表单 -->
                    <template>
                        <el-table :data="logisticsData" stripe style="width: 100%" border>
                            <el-table-column prop="ftime" label="时间"></el-table-column>
                            <el-table-column prop="context" label="地点和跟踪进度"></el-table-column>
                        </el-table>
                    </template>
                </div>

            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="autoReceiveGoods" v-if="isAuto && orderStatus == 3 || orderStatus == 19" :disabled="isClicked" v-has:adminOrderDetail_invoiceDetail>确认送达</el-button>
            </span>
        </el-dialog>
       <!-- 退款已移到退款详情页面 -->
        <footer class="text-center" v-if="isBtn">
            <button class="btn btn-info" @click="back">返回上一级</button>
        </footer>
    </div>
</template>
<!-- 删除style改为 less  -->
<script>
    import '../../../static/css/adminOrderDetail.less';
    import api from '../../api/order';
    import { mapGetters } from 'vuex';

    export default {
        data() {
            return {
                // 敏感操作警告框；
                isWarning: false,
                orderStatus: '',
                orderId: '',
                detailWrap: {},
                isBtnShow: true,
                //模态框里信息详情的数据
                productDetailModal: null,

                // 导出部分模态框 start
                dialogVisible: false,
                radio: '1',
                // 确认发货模态框
                //当前的id;
                currentId: '',
                dialogFormVisible: false,
                formLabelWidth: '120px',
                text: '下一步',
                myTitle: '修改物流信息',
                // 表格类
                gridData: [],
                forms: {
                    senderName: '', //配送人姓名
                    logistics: '', //物流公司
                    senderNumber: '', //配送人电话
                    logisticsNumber: '' //物流单号

                },
                // dialogTableVisible: false,
                isShow: true,
                // 默认自配送
                receiveMethod: 0,
                isConfirm: false,
                activeName: 'selfSend',
                // 获取物流公司名称
                logisticsFirm: [],

                // 确认发货模态框结束

                // 物流信息查看；
                seeLogicsVisible: false,
                isShowLogics: true,
                //第一页一个，后面公用一个；
                isShowInfo: false,
                //这个是查看物流里面的数据物流公司和电话，因为是二选一，所以只用两个变量去处理；
                distributorName: '',
                distributorMobile: '',

                // 物流跟踪信息；
                logisticsNum: null,
                // 跟踪物流信息
                logisticsData: [{
                    ftime: '',
                    context: '',
                },
                ],
                /*
                 * 确定退款，需要当前的订单号，和当前的订单总金额；
                 * 当前订单号，使用currentId;
                 */
                currentOrderTotal: 0,
                // 订单消息 id;
                msgId: 0,
                // 打印时候隐藏操作按钮；
                isBtn: true,
                accountId: '',
                // 运费金额；
                orderFreight: 0,
                // 修改单号，复用确认发货第二步，这个用来隐藏其他的按钮；
                isRevise: true,
                // 是否开启自动发货按钮；默认为false;
                isAuto: false,
                // 点击确认送达后，返回状态为19，这个按钮置灰；
                isClicked: false,
                //发票信息
                dialogInvoiceChange: false,
                invoiceFormData:{},
                isReceipt: '', //是否有发票；
            };
        },
        created() {
            // 从路由里面的取的状态不准确，会在修改后刷页面时候，不更新；
            // this.orderStatus = this.$route.query.status;
            this.orderId = this.$route.query.id;
            this.msgId = this.$route.query.messageId;
            this.currentId = this.orderId;
            let source = this.$route.query.source;
            this.accountId = this.$route.query.accountId;
            let callback = this.confirmOrder;
//            this.token = window.localStorage.getItem('token');
            this.token = JSON.parse(sessionStorage.getItem('vuex')).user.token;
            let isBtnGroup = this.$route.query.isBtn;
            this.queryOrderDetail();
        },
        methods: {
            //缩略图显示方法
            showImg(data, event) {
                event.target.nextElementSibling.src = data;
            },
            //缩略图隐藏方法
            hiddenImg(event) {
                event.target.nextElementSibling.src = '';
            },
            // tab切换事件；
            handleClick() {
                if (this.activeName == 'selfSend') {
                    this.forms.logisticsNumber = '';
                    this.forms.logistics = '';
                } else {
                    this.forms.senderName = '';
                    this.forms.senderNumber = '';
                }
            },

            queryOrderDetail() {
                api.getAdminOrderDetail(this.orderId).then((res) => {
                        if (res.data.code == 1) {
                            this.detailWrap = res.data.data;
                            this.orderStatus = this.detailWrap.orderStatus;
                            this.isReceipt = this.detailWrap.isReceipt;
                            // 设置当orderStatus等于19，禁止自动发货按钮
                            if (this.orderStatus == 19) {
                                this.isClicked = true;
                            }
                            // 处理支付金额
                            this.orderFreight = this.detailWrap.orderPostage == 0 ? '包邮' : this.detailWrap.orderPostage;

                        } else {
                            console.log('获取失败');
                        }

                        // 判断是否有回调函数，进行调用；
                        // if (cb && typeof cb == 'function') {
                        //     cb();
                        // }

                        // 修改订单消息状态；
                        if (this.msgId) {
                            api.updateMessageStatus(this.msgId).then((res) => {
                                if (res.data.code == 1) {
                                    console.log('已读');
                                } else {
                                    console.log('已读失败');
                                }
                            });
                        }

                    },
                ).catch(
                    function (msg) {
                        console.log('error message is: ' + msg);
                    },
                );
            },
            exportorders() {
                this.isBtnShow = false;
                this.isBtn = false;
                setTimeout(() => {
                    let orderDetailHml = this.$refs.orderDetail.innerHTML;
                    window.document.body.innerHTML = orderDetailHml;
                    window.print();
                    window.location.reload();
                }, 50);
            },

            // 确认订单；
            confirmOrder() {
                this.$router.push({path:'/orderLogistics', query: {id : this.orderId,status: this.orderStatus,source:'adminDetail'}});
            },

            // 通过接口获取物流公司名称；
            getLogisticsName() {
                api.getLogisticsName().then((res) => {
                    // 获取物流公司名称，并进行保存；
                    this.logisticsFirm = res.data;
                });
            },

            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                        // tab置回；
                        this.activeName = 'selfSend';
                    })
                    .catch(_ => {
                    });
            },

            // 查看物流；
            seeLogics() {
                //初始化弹窗里面内容状态；
                this.isShowLogics = true;
                //这里需要发送请求拿物流信息；
                api.getOrderById(this.currentId).then((res) => {
                    var info = res.data.data;
                    if (res.data.code == 1) {
                        if (info.orderShipMethod === 1) {
                            this.isShowInfo = true;
                            this.distributorName = info.distributorName;
                            this.distributorMobile = info.distributorMobile;
                            this.isAuto = true;
                        } else if (info.orderShipMethod === 2) {
                            this.isAuto = false;
                            //其他物流
                            this.logisticsNum = info.orderShipmentNumber;
                            // 传参调用一次查询功能；
                            this.trackLogisticsInfo(this.logisticsNum);
                        } else {
                            this.$alert('请填写发货方式！');
                            return;
                        }
                        // 打开弹窗，查看物流信息
                        this.seeLogicsVisible = true;
                    }


                }).catch(function (msg) {
                    console.log('error message is: ' + msg);
                });

            },
                /*
             * 原来为弹窗退款，现在跳转到退款详情页；
             */
            goToRefund(){
                this.$router.push({path:'/refundAudit', query: {id: this.orderId,status: this.orderStatus, accountId: this.supplierId,source:'adminDetail'}});

                // if(orderStatus === 5) {
                //     this.$router.push({path:'/salesReturnAuditDetails', query: {id: this.orderId, accountId: this.supplierId, source:'adminDetail'}});
                // } else {
                //     this.$router.push({path:'/refundAudit', query: {id: this.orderId,status: this.orderStatus, accountId: this.supplierId, source:'adminDetail'}});
                // }
            },

              /*
             * 从订单详情跳向 退货详情， 换货详情；出入detailsId即可；
             */
             goToExchangeGoods(detailsId) {
                this.$router.push({path: '/barterListDetail',query: {detailsId: detailsId}});
             },

             goToReturnGoods (detailsId) {
                this.$router.push({path: '/salesReturnAuditDetails',query: {detailsId: detailsId}});
             },

            // 返回上一级；
            back(){
                  for(let item in this.$store.getters.pageInfo){
                        if(item){
                             this.$store.dispatch('setFlag', true);
                             break;
                        } else {
                            this.$store.dispatch('setFlag', false);
                            break;
                        }
                    }
                      /*
                 *修改flag标记为true,在第一个从vuex里面获取搜索条件，搜索一次，重置为false,然后清空vuex条件；
                 */
                this.$router.push('/adminOrderList');

            },
            //发票信息弹出框
            checkInvoiceInfos(){
                this.dialogInvoiceChange = true;
                api.getInvoiceInfos({orderId: this.orderId}).then((response) => {
                    if (response.data.code === 1) {
                        if(!response.data.data) {
                            this.$alert('暂无数据');
                            return;
                        }
                        this.invoiceFormData = response.data.data;
                        // 发票类型--0增值税个人发票,1增值税单位发票,2增值税专用发票
                        if(this.invoiceFormData.receiptType === 0){
                            this.invoiceFormData.receiptType="个人";
                        }else if(this.invoiceFormData.receiptType === 1 || this.invoiceFormData.receiptType === 2){
                            this.invoiceFormData.receiptType = this.invoiceFormData.company;
                        }
                    } else if (response.data.code === 0) {
                        this.$alert(response.data.message)
                    }
                });
            },
            //物流信息跟踪；
            trackLogisticsInfo(logNum) {
                   // 每次出来的时候，先置空；
                this.logisticsData = [{}];
                /*
                 * 1.调用跟踪物流接口，默认当前的快递单号，查询对应物流信息
                 * 2.用户输入快递单号，可以查询物流信息；
                 * 用传参来判断是进入页面查询，还是用户手动查询；
                 *
                 */
                var logNumber;
                if (logNum == -1) {
                    // 用户手动查询
                    logNumber = this.logisticsNum;
                } else {
                    // 刚进入查询自动查询；
                    logNumber = logNum;
                }

                api.trackLogistics(logNumber).then((res) => {
                    if (res.data.code === 1) {
                        // 物流跟踪消息；
                        this.logisticsData = res.data.data.data;

                    } else {
                        this.$alert('暂无数据');
                    }

                });
            },
            // 确认收货，点击跳转到一个orderConfirmDetails打印；订单确认详情
            openOrderConfirmDetails() {
                /*
                1.点击跳转到对应的订单详情打印页面，并把当前的orderId通过路由传过去；
                2.在新的页面，发送请求，获取数据，渲染页面
                3，在新的页面进行打印操作，
                4，点击返回，跳回当前页面，并回到当前弹窗打开的状态；
                5,需要两个参数，一个是orderId，另一个是orderStatus;
                 */
                // 缓存当前的订单id
                let orderId = this.currentId;
                let orderStatus = this.orderStatus;
                  /*
                 * 这里只有2的时候，才是弹层跳转，其他都是页面的跳转；
                 */
                if (orderStatus == 2) {
                    // 关闭当前的弹窗，并进行页面跳转；
                    this.isConfirm = false;
                    // 进行跳转到一个新的页面，通过路由把orderId传过去；source代表来源，details代表详情页，list代表列表页
                    this.$router.push({path: '/orderConfirmDetails', query: {id: orderId, status: this.orderStatus,source: 'adminOrderDetail'}});
                } else {
                    this.$router.push({path: '/orderConfirmDetails', query: {id: orderId, status: this.orderStatus,source: 'adminOrderDetail_btn'}});
                };
            },

            // 修改物流单号；
            changeLogicsNumLayer() {
                // 先调用订单详情接口，进行反查；
                // 这个是确认发货第二步，可以进行公用；（先查出当前的物流信息,从订单详情接口里面拿）
                this.isConfirm = true;
                this.isShow = false;
                this.isRevise = true;
                api.getAdminOrderDetail(this.orderId).then((res) => {
                    if (res.data.code === 1) {
                        let contents = res.data.data;
                        this.receiveMethod = this.detailWrap.orderShipMethod;
                        // 根据物流方式,设置运送方式，和具体的信息；
                        if (this.receiveMethod == 1) {
                            this.activeName = 'selfSend';
                            this.forms.senderName = contents.distributorName;
                            this.forms.senderNumber = contents.distributorMobile;
                        } else if (this.receiveMethod == 2) {
                            this.activeName = 'logisticsCompany';
                            this.forms.logistics = contents.logisticsCompany;
                            this.forms.logisticsNumber = contents.orderShipmentNumber;
                        } else {
                            this.$alert('运送方式不能为空！');
                        }
                    } else {
                        this.$alert('物流信息获取失败，请重试！');
                    }
                });


            },
            // 修改单号；修改之前先反查；
            reviseLogicsInfo() {
                let logisticsInfo = {
                    orderId: this.orderId,
                    name: this.logisticsInfo().name,
                    number: this.logisticsInfo().number,
                    orderShipMethod: this.logisticsInfo().receiveMethod,
                };
                this.isConfirm = false;
                this.isShow = true;
                api.reviseLogicsInfo(logisticsInfo).then((res) => {
                    if (res.data.code === 1) {
                        this.$alert('物流信息修改成功！');
                        // 重置状态；以免 影响确认发货部分；
                        for (let item in this.forms) {
                            this.forms[item] = '';
                        }
                        this.activeName = 'selfSend';
                    } else {
                        this.$alert('物流信息修改失败，请重试！');
                    }

                });
            },

            // 自动收货；
            autoReceiveGoods() {
                this.seeLogicsVisible = false;
                let param = {orderId: this.orderId};

                api.autoReceiveGoods(param).then((res) => {
                    if (res.data.code === 1) {
                        this.isClicked = true;
                        this.$alert('确认送达成功!');
                        this.orderStatus = 19;
                        // 更新订单状态；
                        this.$router.push({path: '/adminOrderDetail', query: {id: this.orderId, status: this.orderStatus}});
                    } else {
                        this.$alert('确认送达失败，请重试！');
                    }
                });
            },

            //封装出来；
            /*
             * 物流信息选择，以及判断
             * 在确认发货，和 修改物流信息里面会使用，
             */
            logisticsInfo() {
                let receiveMethod = this.receiveMethod;
                let name = '';
                let number = 0;
                if (this.activeName == 'selfSend') {
                    // 非空校验；
                    if (!this.forms.senderName) {
                        this.$alert('配送人姓名不能为空！');
                        return;
                    } else if (!this.forms.senderNumber) {
                        this.$alert('配送人手机号不能为空！');
                        return;
                    }
                    // 数据类型长度和类型校验；
                    if (this.forms.senderName.length > 20) {
                        this.$alert('配送人姓名不能超过20位');
                        return;
                    } else if (!/^\d{11}$/g.test(this.forms.senderNumber)) {
                        this.$alert('配送人电话必须是11位数字');
                        return;
                    }

                    //自配送；获取对应的参数，
                    name = this.forms.senderName;
                    number = this.forms.senderNumber;
                    receiveMethod = 1;
                } else if (this.activeName == 'logisticsCompany') {
                    // 非空校验
                    if (!this.forms.logistics) {
                        this.$alert('物流公司名不能为空！');
                        return;
                    } else if (!this.forms.logisticsNumber) {
                        this.$alert('物流单号不能为空！');
                        return;
                    }

                    if (!/^\d{0,20}$/g.test(this.forms.logisticsNumber)) {
                        this.$alert('物流单号必须是20位以内数字！');
                        return;
                    }

                    // 物流公司配送
                    name = this.forms.logistics;
                    number = this.forms.logisticsNumber;
                    receiveMethod = 2;
                };
                return {
                    name: name,
                    number: number,
                    receiveMethod: receiveMethod,
                };
            },

        },
        computed: {
            // vuex存储 pageInfo;
            ...mapGetters([
                'searchItems',
                'returnFlag'
            ]),
            getOrderStatusName() {
                //根据状态设置不同的值；以及是否显示；
                switch(Number(this.orderStatus)) {
                    case 1:
                        return '待付款';
                        break;
                    case 2:
                        return '待发货';
                        break;
                    case 3:
                    case 19:
                         return '已发货';
                        break;
                    case 4:
                        return '已完成';
                        break;
                    case 5:
                        return '已拒收退款审核';
                        break;
                    case 6:
                        return '已退款';
                        break;
                    case 7:
                        return '已支付退款审核';
                        break;
                    case 8:
                        return '待付款已取消';
                        break;
                    case 9:
                        return '退款中';
                        break;
                    case 10:
                        return '审核通过';
                        break;
                    case 11:
                        return '拒绝退款';
                        break;
                    case 12:
                        return '已收货';
                        break;
                    default:
                        break;
                }
            },
            supplierId() {
                return this.accountId;
            },
        },
        beforeMount() {

        },
        watch: {
            $route: {
                handler: function () {
                    // 路由改变，重设信息id和orderId，并发送请求；
                    this.msgId = this.$route.query.messageId;
                    this.orderId = this.$route.query.id;
                    this.queryOrderDetail();
                },
            },
        },
    };
</script>
