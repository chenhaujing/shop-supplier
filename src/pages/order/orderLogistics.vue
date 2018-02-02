<template>
     <!-- 发货模态框 -->
     <div id="orderLogistics">
            <div class="orderLogistics_nav crumbs">
                <bread-nav :navigationList="navigationList"></bread-nav>
            </div>
            <div class="logistics">
                <el-form :model="form">
                    <template>
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <!-- 自配送 -->
                            <el-tab-pane label="自配送" name="selfSend">
                                <el-form-item label="配送人姓名" :label-width="formLabelWidth" class="col-xs-12">
                                    <el-input v-model="form.senderName" auto-complete="off" class="col-xs-9" placeholder="请输入姓名"></el-input>
                                </el-form-item>
                                <el-form-item label="配送人手机号" :label-width="formLabelWidth" class="col-xs-12">
                                    <el-input v-model="form.senderNumber" auto-complete="off"
                                              class="col-xs-9" placeholder="请输入配送人手机号"></el-input>
                                </el-form-item>
                            </el-tab-pane>
                            <!-- 物流配送 -->
                            <el-tab-pane label="物流配送" name="logisticsCompany">
                                <div>
                                    <el-form-item label="物流公司" :label-width="formLabelWidth" class="col-xs-12">
                                        <el-select v-model="form.logistics" placeholder="请选择物流公司" class="col-xs-9"
                                                   @visible-change="getLogisticsName">
                                            <el-option v-for="(firm,index) in logisticsFirm"
                                                       :key="index"
                                                       :label="firm.name"
                                                       :value="firm.name"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="物流单号" :label-width="formLabelWidth" class="col-xs-12">
                                        <el-input v-model="form.logisticsNumber" auto-complete="off"
                                                  class="col-xs-9" placeholder="请输入物流单号"></el-input>
                                    </el-form-item>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </template>
                </el-form>
            </div>
            <footer>
                <el-button @click="cancel">取  消</el-button>
                <el-button @click="goToDelivery">下一步</el-button>
            </footer>
    </div>
</template>
<!-- 从外部导入less -->
<script>
    import api from '../../api/order';
    import '../../../static/css/orderLogistics.less';
    import { mapGetters } from 'vuex';
    import breadNav from '../../components/Breadcrumb.vue'

    export default {
        data() {
            return {
                myTitle : '请选择发货方式',
                     form: {
                        senderName: '', //配送人姓名
                        logistics: '', //物流公司
                        senderNumber: '', //配送人电话
                        logisticsNumber: '', //物流单号
                    },
                    receiveMethod: 0,
                    isConfirm: false,
                    activeName: 'selfSend', // 默认自配送
                    formLabelWidth: '120px',
                    logisticsFirm: [], // 获取物流公司名称
                    orderId : '',
                    orderStatus : '',//订单状态
                    source: '',
                    msgId: '',//消息列表过来；

            };
        },
        created() {
            this.orderId = this.$route.query.id; // 从路由里面获取orderId;
            this.orderStatus = this.$route.query.status;
            this.source = this.$route.query.source;
            this.msgId = this.$route.query.messageId;
            if(this.$store.getters.isRemember) {
                this.resume();
            }
        },
        methods: {
            // 切换tab，重置 发货方式；
            handleClick() {
                if (this.activeName == 'selfSend') {
                    this.form.logisticsNumber = '';
                    this.form.logistics = '';
                } else {
                    this.form.senderName = '';
                    this.form.senderNumber = '';
                }
            },

                 // 通过接口获取物流公司名称；
            getLogisticsName() {
                api.getLogisticsName().then((res) => {
                    // 获取物流公司名称，并进行保存；
                    if(res.data.length) {
                    this.logisticsFirm = res.data;
                    }
                });
            },

            goToDelivery() {
                //根据自身带的id来判断是那种物流；准备参数；
                let receiveMethod = this.receiveMethod;
                let orderId = this.orderId;
                let name = '';
                let number = 0;
                if (this.activeName == 'selfSend') {
                    // 非空校验；
                    if (!this.form.senderName) {
                        this.$alert('配送人姓名不能为空！');
                        return;
                    } else if (!this.form.senderNumber) {
                        this.$alert('配送人手机号不能为空！');
                        return;
                    }
                    // 数据类型长度和类型校验；
                    if (this.form.senderName.length > 20) {
                        this.$alert('配送人姓名不能超过20位');
                        return;
                    } else if (!/^\d{11}$/g.test(this.form.senderNumber)) {
                        this.$alert('配送人电话必须是11位数字');
                        return;
                    }

                    //自配送；获取对应的参数，
                    name = this.form.senderName;
                    number = this.form.senderNumber;
                    receiveMethod = 1;

                    } else if (this.activeName == 'logisticsCompany') {
                        // 非空校验
                        if (!this.form.logistics) {
                            this.$alert('物流公司名不能为空！');
                            return;
                        } else if (!this.form.logisticsNumber) {
                            this.$alert('物流单号不能为空！');
                            return;
                        }

                        if (!/^\d{0,20}$/g.test(this.form.logisticsNumber)) {
                            this.$alert('物流单号必须是20位以内数字！');
                            return;
                        }

                        // 其他配送
                        name = this.form.logistics;
                        number = this.form.logisticsNumber;
                        receiveMethod = 2;
                    };

                    // this.isConfirm = false;
                    //发送更新物流的信息的请求；
                    // 存储用户是输入；
                    let logisticsInfo = {
                            receiveMethod: receiveMethod,
                            name: name,
                            number: number
                    }
                    var deliverParams = '';
                    /*
                     * 单独处理订单消息列表过来的 面包屑；
                     */
                    if(this.msgId) {
                        deliverParams = {
                            id: this.orderId,
                            status: this.orderStatus,
                            messageId: this.msgId
                        }
                    } else {
                        deliverParams = {id: this.orderId,
                                         status: this.orderStatus,
                                         accountId : this.accoundId,
                                         source : this.source,
                        };
                    }
                    // 在这个之前去存用户输入；
                    this.$store.dispatch('setLogs', logisticsInfo);
                    this.$router.push({
                        path: '/deliverGoods',
                        query: deliverParams,
                    });

            },

            cancel (){
                /*
                 * 消息列表单独处理
                 */
                 if(this.msgId) {
                    this.$router.push({path:'/orderDetail',query:{id: this.orderId, status: this.orderStatus,messageId: this.msgId}});
                    return;
                 }


                /*
                 * 根据来源判断；orderList -> 可以直接进来；
                 * 其他的只能调到订单详情页面；
                 */
                 if(this.accountId) {
                    switch(this.source) {
                        case 'list':
                            this.$store.dispatch('setFlag', true);
                            this.$router.push({path:'/orderList',query:{accountId: this.accountId}});
                            break;
                        case 'detail':
                            this.$router.push({path:'/orderDetail',query:{id: this.orderId, status: this.orderStatus, accountId: this.accountId,source: 'list'}});
                            break;
                        default:
                            break;
                    }

                 } else {
                    switch(this.source) {
                        case 'list':
                            this.$router.push({path:'/orderList',query:{}});
                            this.$store.dispatch('setFlag', true);
                            break;
                        case 'adminList':
                            this.$router.push({path:'/adminOrderList',query:{}});
                            break;
                        case 'detail':
                            this.$router.push({path:'/orderDetail',query:{id: this.orderId, status: this.orderStatus,source: 'list'}});
                            break;
                        case 'adminDetail':
                            this.$router.push({path:'/adminOrderDetail',query:{id: this.orderId, status: this.orderStatus,source: 'adminList'}});
                            break;
                        default:
                            break;
                    }
                 }
            },

            resume (){
                    //重置之前的操作；
                    let deliverParams = this.$store.getters.logiticsInfo;
                    this.receiveMethod = deliverParams.receiveMethod;
                    if( this.receiveMethod == 1) {
                        this.activeName = 'selfSend';
                        this.form.senderName = deliverParams.name;
                        this.form.senderNumber = deliverParams.number;
                    } else {
                        this.activeName = 'logisticsCompany';
                        this.form.logistics = deliverParams.name;
                        this.form.logisticsNumber = deliverParams.number;
                    }
                     this.$store.dispatch('setRemember', false);
                }

        },
         components: {
            breadNav,
        },
        computed: {
            ...mapGetters([
                'searchItems',
                'returnFlag'
            ]),
            accountId (){
                return this.$route.query.accountId;
            },

            /*
             * 各种路由 来源
             * 管理员账号： 订货列表，订单详情，退货详情，换货详情
             * 供应商账号： 订货列表，订单详情，退货详情，换货详情
             * 财会账号： 财务管理-财务订单列表
             *
             */

            navigationList() {
                if(this.msgId){
                   return  [
                            {
                                name: ' 消息',
                            },
                            {
                                name: '订单消息列表',
                                route: { path: '/messageList', query: {activelabel: 'order'} }
                            },
                            {
                                name: '订单详情',
                                route: { path: '/orderDetail', query: {id: this.orderId,status: this.orderStatus, messageId: this.msgId} }
                            },
                            {
                                name: '添加物流信息',
                            },
                    ];
                }
                let currentPath = {
                    name: '添加物流信息'
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
                                    route: { path: '/orderDetail', query: {id: this.orderId, source: 'adminList'} }
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
                    }

                };
                path.push(currentPath);
                return path;
              }


        },
    };
</script>
