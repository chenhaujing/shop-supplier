<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-date"></i> 账户管理</el-breadcrumb-item>
            <el-breadcrumb-item><a href="javascript:location.reload();">收入明细列表</a></el-breadcrumb-item>
        </el-breadcrumb>
        <div class="row incomeDetailList_myRow clearMargin publicHeader">
            <div class="col-xs-3 clearPadding">
                <label>下单时间:</label>
                <div class="col-xs-3 clearPadding">
                    <el-date-picker
                        v-model="createBeginTime"
                        format="yyyy-MM-dd"
                        :editable='false'
                        type="date"
                        @change="simpleIncomeSearch">
                    </el-date-picker>
                </div>
                <span class="col-xs-1 clearPadding" style="text-align: center;line-height: 36px;">~</span>
                <div class="col-xs-3 clearPadding">
                    <el-date-picker
                        v-model="createEndTime"
                        format="yyyy-MM-dd"
                        :editable='false'
                        type="date"
                        @change="simpleIncomeSearch">
                    </el-date-picker>
                </div>
            </div>

            <div class="col-xs-2">
                <el-input
                    placeholder="订单编号／付款流水号"
                    icon="search"
                    v-model="condition"
                    :on-icon-click="simpleIncomeSearch" class="fullWidth">
                </el-input>
            </div>
            &nbsp;&nbsp;
            <div class="col-xs-2 ">
                <el-button type="info" @click="incomeDetailList_search" class="incomeDeatilList_button">高级搜索</el-button>
            </div>
            <div class="col-xs-1 ">
                <!-- <el-tooltip placement="bottom">
                     <div slot="content">
                         <p style="text-align: center">结算金额说明</p>
                          <p>
                         1. 当订单状态为"已完成"状态,
                            结算金额=透云进货价小计+运费金额
                            </p>
                        <p>
                         2. 当订单是通过已支付退款审核进入到“已退款”状态时
                            结算金额=运费金额
                            </p>
                         </div>
                     <Icon type="help-circled" size=30 px color="red"></Icon>
                 </el-tooltip>-->
                <el-tooltip placement="top">
                    <div slot="content"><p style="text-align: center">结算金额说明</p>
                        <p>
                            1. 当订单状态为"已完成"状态,
                            结算金额=透云进货价小计+运费金额
                        </p>
                        <p>
                            2. 当订单是通过已拒收退款审核进入到“已退款”状态时
                            结算金额=运费金额
                        </p></div>
                    <el-button style="color: red">提示</el-button>
                </el-tooltip>

            </div>
            <div class="col-xs-2">
                <p style="width: 150px">结算金额:{{this.income | formatPrice}}</p>
            </div>
            <div class="col-xs-1">
                <p style="width: 150px"> 账户余额:{{this.balance | formatPrice}}</p>
            </div>
        </div>
        <!--点击高级搜索遮罩-->
        <div v-show="dialogFormVisible" class="incomeDeatilList_advancedSearch publicModelSearch">
            <div class="row">
                <div class="col-xs-4 ">
                    <label>支付时间:</label>
                    <div class="col-xs-4">
                        <el-date-picker v-model="AccountPurchaseInput.payBeginTime" format="yyyy-MM-dd"
                                        :editable='false' placeholder="请输入日期" type="date">
                        </el-date-picker>
                    </div>
                    <span class="col-xs-1 clearPadding">~</span>
                    <div class="col-xs-4">
                        <el-date-picker v-model="AccountPurchaseInput.payEndTime" format="yyyy-MM-dd"
                                        :editable='false' placeholder="请输入日期" type="date">
                        </el-date-picker>
                    </div>
                </div>
                <div class="col-xs-4">
                    <label>支付类型:</label>
                    <div class="col-xs-6">
                        <el-select style="width: 100%;" v-model="AccountPurchaseInput.orderPaymentMethod"
                                   placeholder="请选择">
                            <el-option v-for="payType in payTypes" :key="payType.id"
                                       :label="payType.name" :value="payType.id">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-4">
                    <label>下单时间:</label>
                    <div class="col-xs-4">
                        <el-date-picker v-model="AccountPurchaseInput.createBeginTime"
                                        format="yyyy-MM-dd" :editable='false' placeholder="请输入日期"
                                        type="date">
                        </el-date-picker>
                    </div>
                    <span class="col-xs-1 clearPadding">~</span>
                    <div class="col-xs-4">
                        <el-date-picker v-model="AccountPurchaseInput.createEndTime" format="yyyy-MM-dd"
                                        :editable='false' placeholder="请输入日期" type="date">
                        </el-date-picker>
                    </div>
                </div>
                <div class="col-xs-4">
                    <label>订单编号:</label>
                    <div class="col-xs-6">
                        <input type="text" v-model="AccountPurchaseInput.orderId"
                               class="form-control" placeholder="请输入订单编号" maxlength="30"/>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <div class="col-xs-2 col-xs-offset-8">
                        <el-button style="padding: 0 15px;" type="info" @click="multiSearch">查询</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row clearMargin incomeDetailList_dialog">
            <div class="table-responsive mainTableParent">
                <table class="table table-bordered table-hover incomeDetail_table mainTable">
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

                        <th>支付时间<i class="el-icon-arrow-down"
                                   :class="{incomeDetailArrowUp: sortType==1, incomeDetailArrowDown: sortType==0}"
                                   @click="sortByType()"></i>
                            <!--<i class="el-icon-arrow-up"></i>-->
                        </th>

                        <th>支付类型</th>
                        <th>付款流水号</th>

                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-if="result.length===0">
                        <td colspan="14"> 没有数据记录</td>
                    </tr>
                    <tr v-else v-for="(item,index) in result">
                        <td>{{index + 1}}</td>
                        <td>{{item.orderId}}</td>
                        <td>{{getOrderStatus(item.orderStatus)}}</td>
                        <td>{{item.orderPrice | formatPrice}}</td>
                        <td v-if="item.orderPostage == '0.00'  ">包邮</td>
                        <td v-else>{{item.orderPostage | formatPrice}}</td>
                        <td>{{item.discount}}</td>
                        <td>{{item.orderTotalPrice | formatPrice}}</td>
                        <td>{{item.payAmount | formatPrice}}</td>
                        <td>{{item.orderDealerPrice | formatPrice}}</td>
                        <td>{{item.tempSettlemePrice | formatPrice}}</td>
                        <td>{{item.orderPaymentTime}}</td>
                        <td>{{item.orderPaymentMethod==1?'支付宝':'微信'}}</td>
                        <td>{{item.orderPaymentNum}}</td>
                        <td style="text-align:left;width:35px;">
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <table class="table table-bordered table-hover incomeDetail_editTable">
                <thead>
                <tr>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in result">
                    <td>
                        <a href="javascript:;"><img src="../../../static/img/details.png" alt=""></a>
                        <div>
                            <a href="javascript:;" @click="incomeDetailList_lookDetail(item.orderId,1)">查看明细</a>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <!--点击查看详情弹出的模态框-->
        <el-dialog :visible.sync="dialogTableVisible" width="80%">
            <ul class="incomeDetail_lookSearch">
                <li>订单编号:{{purchaseInListVo.orderId}}</li>
                <li>商品金额小计:{{purchaseInListVo.orderPrice | formatPrice}}</li>
                <li>收货人:{{purchaseInListVo.orderReceiverName}}</li>
            </ul>
            <div class="table-responsive">
                <table class="table table-bordered table-hover incomeDetailListDia_table1">
                    <thead>
                    <tr>
                        <th>商品图片</th>
                        <th>商品名称</th>
                        <th>商品品牌</th>
                        <th>商品条码</th>
                        <th>规格值</th>
                        <th>商品数量</th>
                        <th>app订货价(¥)</th>
                        <th style="min-width: 100px">折扣优惠(¥)</th>
                        <th>总额(¥)</th>
                        <th>是否退换货</th>
                        <th style="min-width: 100px">退款金额(¥)</th>
                        <th>状态</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in orderDetail">
                        <td>
                            <img :src="item.goodsImage" style=" width: 50px;
                                    height: 50px;"></td>
                        <td style=" min-width: 150px">{{item.goodsName}}</td>
                        <td>{{item.brandName}}</td>
                        <td>{{item.code69}}</td>
                        <td style="min-width: 180px">{{item.goodsAttribute}}</td>
                        <td>{{item.goodsNumber}}</td>
                        <td>{{item.goodsUnitPrice | formatPrice}}</td>
                        <td>￥{{item.goodsDiscount}}</td>
                        <td>{{item.goodsTatolPrice | formatPrice}}</td>
                        <td>{{item.type != null ? '是': ''}}</td>
                        <td>{{item.returnMoney | formatPrice}}</td>
                        <td v-if="item.type == 0 && item.status == 5">
                            <div>
                                <el-button size="small" type="info" @click="goReturnDetails(item.detailsId)">已退货查看
                                </el-button>
                            </div>
                        </td>
                        <td v-else-if="item.type == 1 && item.status == 5">
                            <div>
                                <el-button size="small" type="info" @click="goBarterDetail(item.detailsId)">已换货查看
                                </el-button>
                            </div>
                        </td>
                        <td v-else="item.type == null">
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div class="incomeDetail_paging">
                <paging ref="page" :page-num="dialogPageTotal" :current-page="dialogCurrentPage"
                        :pageSize="dialogPageSize"
                        @change="changeDialog" v-on:changeR="changeDialogRows" :is-select="false"></paging>
            </div>
        </el-dialog>
        <div v-if="result.length > 0">
            <div class="incomeDetailList_pagingWrap">
                <paging v-show="queryType==1" ref="page" :page-num="simplePageTotal" :current-page="simpleCurrentPage"
                        :pageSize="simplePageSize"
                        @change="change" v-on:changeR="changeRows"></paging>
                <paging v-show="queryType==2" ref="page" :page-num="pageTotal" :current-page="currentPage"
                        :pageSize="pageSize"
                        @change="change" v-on:changeR="changeRows"></paging>
            </div>
        </div>
    </div>
</template>

<script>
    import '../../../static/css/incomeDetailList.less';
    import api from '../../api/billingDetails';
    import paging from '../../components/page';
    import {format} from 'date-fns';
    import {zh_cn} from 'date-fns/locale/zh_cn';
    import filter from '../../utils/filter.js';

    export default {
        data() {
            return {

                payTypes: [
                    {
                        id: 0,
                        name: '全部'
                    },
                    {
                        id: 1,
                        name: '支付宝'
                    },
                    {
                        id: 2,
                        name: '微信'
                    }
                ],
                sortType: 1,//排序的次序（必传，且只能传0或1，0代表正序 1代表逆序）
                simplePageSize: 10,
                simpleCurrentPage: 1,
                simplePageTotal: 5,
                simplePageNum: 1,

                dialogPageTotal: 5, //总页码
                dialogPageNum: 1,
                dialogCurrentPage: 1, //当前页
                dialogPageSize: 10,
                purchaseInListVo: {},
                sortName: 0,
                queryType: 1,                        //1-简易查询，2-高级查询
                createBeginTime: '',
                createEndTime: '',
                condition: '',
                pageTotal: 5, //总页码
                pageNum: 1,
                currentPage: 1, //当前页
                title: '收入明细列表',
                pageSize: 10,
                AccountPurchaseInput: {
                    sortType: 1,
                    sortName: 0,
                    createBeginTime: '',        //开始时间（创建时间）
                    createEndTime: '',          //截止时间（创建时间)
                    payBeginTime: '',           //开始时间（支付时间）
                    payEndTime: '',             //截至时间（支付时间）
                    orderPaymentMethod: '',      //支付方式(1.支付宝/2.微信)
                    orderReceiverName: '',      //收货人姓名
                    orderReceiverMobile: '',    //收货人电话
                    orderId: '',                 //订单编号
                },
                accountId: '',
                result: [],
                balance: '',
                income: '',
                orderDetail: [],
                dialogFormVisible: false,
                dialogTableVisible: false,
                orderId: '',
                searchNum: 1,

            };
        },
        methods: {
            changeDialog(index) {
                this.dialogCurrentPage = index;
                this.incomeDetailList_lookDetail();

            },
            changeDialogRows(row) {
                this.dialogCurrentPage = 1;
                this.dialogPageSize = row;
                this.incomeDetailList_lookDetail();
            },
            change(index) {
                if (this.queryType && this.queryType == 1) {
                    this.simpleCurrentPage = index;
                    this.getSimpleData();
                } else if (this.queryType && this.queryType == 2) {
                    this.currentPage = index;
                    this.getMultiPurchasesHigh();
                }
            },
            //每页显示条数
            changeRows(row) {
                if (this.queryType && this.queryType == 1) {
                    this.simpleCurrentPage = 1;
                    this.simplePageSize = row;
                    this.getSimpleData();
                } else if (this.queryType && this.queryType == 2) {
                    this.currentPage = 1;
                    this.pageSize = row;
                    this.getMultiPurchasesHigh();
                }
            },
            goBarterDetail(detailsId) {
                this.$router.push({
                    path: '/barterListDetail',
                    query: { detailsId: detailsId, recordId: this.recordId, source: "incomeDetailList" }
                });
            },
            goReturnDetails(detailsId) {
                this.$router.push({
                    path: '/salesReturnAuditDetails',
                    query: { detailsId: detailsId, recordId: this.recordId, source: "incomeDetailList" }
                });
            },
            //列表排序
            sortByType() {
                this.sortType === 0 ? this.sortType = 1 : this.sortType = 0;
                if (this.searchNum == 1) {
                    this.getSimpleData();
                } else if (this.searchNum == 2) {
                    this.getMultiPurchasesHigh();
                }
            },
            incomeDetailList_search() {
                this.dialogFormVisible = !this.dialogFormVisible;
                for (let prop in this.AccountPurchaseInput) {
                    this.AccountPurchaseInput[prop] = '';
                }
//                this.multiSearch();
            },

            incomeDetailList_lookDetail(orderId, flag) {
                if (orderId) {
                    this.orderId = orderId;
                }
                if (flag == 1) {
                    this.dialogTableVisible = !this.dialogTableVisible;
                    this.dialogCurrentPage = 1;
                }
                let param = {
                    pageNum: this.dialogCurrentPage,
                    pageSize: this.dialogPageSize,
                };
                let paramOrderId = orderId ? orderId : this.orderId;
                api.getUnsettlementDetailsByOrderId(paramOrderId, param).then(
                    (response) => {
                        if (response.data.code == 1) {
                            let data = response.data.data;
                            if (data) {
                                let pageInfo = data.pageInfo;
                                this.purchaseInListVo = data.purchaseInListVo;
                                this.orderDetail = pageInfo ? pageInfo.list : [];
                                let pageTotal = (pageInfo.total % this.dialogPageSize) == 0 ? pageInfo.total / this.dialogPageSize : (pageInfo.total / this.dialogPageSize) + 1;
                                this.dialogPageTotal = Math.floor(pageTotal);
                            }
                        } else if (response.data.code == 0) {
                            this.$alert(response.data.message);
                        }
                    });

            },
            simpleIncomeSearch() {
                this.queryType = 1;
                this.simpleCurrentPage = 1;
                if (this.dialogFormVisible) {
                    this.dialogFormVisible = !this.dialogFormVisible;
                }
                this.getSimpleData();

            },
            getAccountBalanceByAccountId() {
                api.getAccountBalanceByAccountId(this.accountId).then(
                    response => {
                        let data = response.data.data;
                        this.balance = data.balance;
                    }
                );
            },
            findIncome() {
                api.getIncomeByAccountId(this.accountId).then(
                    response => {
                        let data = response.data.data;
//                        this.income = data.income
                        this.income = data;
                    }
                );
            },
            multiSearch() {
                this.currentPage = 1;
                this.queryType = 2;
                this.getMultiPurchasesHigh();
            },

            getOrderStatus(value) {
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
            getSimpleData() {
                let createBeginTime = this.createBeginTime ? format(this.createBeginTime, 'YYYY-MM-DD', { locale: zh_cn }) : '';//开始时间（创建时间）
                let createEndTime = this.createEndTime ? format(this.createEndTime, 'YYYY-MM-DD', { locale: zh_cn }) : '';//截止时间（创建时间)

                if (createBeginTime && createEndTime && createBeginTime > createEndTime) {
                    this.$alert('创建时间起始时间不能大于终止时间');
                    return;
                }

                let accountPurchaseLowInput = {
                    pageNum: this.simpleCurrentPage,
                    pageSize: this.simplePageSize,
                    sortName: this.sortName,
                    sortType: this.sortType,
                    storeId: this.accountId,
                    createBeginTime: createBeginTime,//开始时间（创建时间）
                    createEndTime: createEndTime,  //截止时间（创建时间)
                    condition: this.condition,      //查询条件(收货人名称/订单编号/支付流水号)
                };

                api.SimSearchPurchasesLow(accountPurchaseLowInput).then(
                    (response) => {
                        this.searchNum = 1;
                        let data = response.data.data;
                        this.result = data ? data.list : [];
                        if (data) {
                            let pageTotal = (data.total % this.simplePageSize) == 0 ? data.total / this.simplePageSize : (data.total / this.simplePageSize) + 1;
                            this.simplePageTotal = Math.floor(pageTotal);
                        } else {
                            this.simplePageTotal = 1;
                        }
                    });
            },
            getMultiPurchasesHigh() {
                let createBeginTime = this.AccountPurchaseInput.createBeginTime ? format(this.AccountPurchaseInput.createBeginTime, 'YYYY-MM-DD', { locale: zh_cn }) : '';
                let createEndTime = this.AccountPurchaseInput.createEndTime ? format(this.AccountPurchaseInput.createEndTime, 'YYYY-MM-DD', { locale: zh_cn }) : '';
                let payBeginTime = this.AccountPurchaseInput.payBeginTime ? format(this.AccountPurchaseInput.payBeginTime, 'YYYY-MM-DD', { locale: zh_cn }) : '';
                let payEndTime = this.AccountPurchaseInput.payEndTime ? format(this.AccountPurchaseInput.payEndTime, 'YYYY-MM-DD', { locale: zh_cn }) : '';
                let orderId = this.AccountPurchaseInput.orderId;
                let orderReceiverMobile = this.AccountPurchaseInput.orderReceiverMobile;
                let sortName = this.AccountPurchaseInput.sortName;
                let sortType = this.AccountPurchaseInput.sortType;

                if (orderReceiverMobile && !/^[0-9]*$/.test(orderReceiverMobile)) {
                    this.$alert('收货人电话应为数字格式');
                    return;
                }

                if (orderId && !/^[0-9]{30}$/.test(orderId)) {
                    this.$alert('订单编号应为30位数字');
                    return;
                }

                if (createBeginTime && createEndTime && createBeginTime > createEndTime) {
                    this.$alert('创建时间起始时间不能大于终止时间');
                    return;
                }

                if (payBeginTime && payEndTime && payBeginTime > payEndTime) {
                    this.$alert('支付时间起始时间不能大于终止时间');
                    return;
                }

                let accountPurchaseInput = {};
                for (let prop in this.AccountPurchaseInput) {
                    accountPurchaseInput[prop] = this.AccountPurchaseInput[prop];
                }

                accountPurchaseInput.createBeginTime = createBeginTime;
                accountPurchaseInput.createEndTime = createEndTime;
                accountPurchaseInput.payBeginTime = payBeginTime;
                accountPurchaseInput.payEndTime = payEndTime;
                accountPurchaseInput.pageNum = this.currentPage;
                accountPurchaseInput.pageSize = this.pageSize;
                accountPurchaseInput.sortName = this.sortName;
                accountPurchaseInput.sortType = this.sortType;

                api.multiPurchasesHigh(accountPurchaseInput).then(
                    (response) => {
                        this.searchNum = 2;
                        let data = response.data.data;
                        this.result = data ? data.list : [];
                        if (data) {
                            let pageTotal = (data.total % this.pageSize) == 0 ? data.total / this.pageSize : (data.total / this.pageSize) + 1;
                            this.pageTotal = Math.floor(pageTotal);
                        } else {
                            this.pageTotal = 1;
                        }
                    });
            }

        },
        computed: {},
        created() {
//            this.accountId = JSON.parse(localStorage.getItem('account')).accountId;
            this.accountId = JSON.parse(sessionStorage.getItem('vuex')).user.account.accountId;
            this.simpleIncomeSearch();
            this.getAccountBalanceByAccountId();
            this.findIncome();
        },
        components: {
            paging
        }
    };
</script>
