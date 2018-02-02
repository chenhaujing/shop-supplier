<template>
    <div id="salesReturnList">
        <mybreadcrumb :navigationList="navigationList"></mybreadcrumb>
        <!--普通搜索-->
        <div class="publicHeader">
            <div>
                <label>审核时间</label>
                <el-date-picker
                    v-model="simpleSearchObj.beginDate"
                    type="date"
                    style="width:120px;"
                    @change="simpleSearch"
                    placeholder="开始时间">
                </el-date-picker>
                <el-date-picker
                    v-model="simpleSearchObj.endDate"
                    type="date"
                    style="width:120px;"
                    @change="simpleSearch"
                    placeholder="结束时间">
                </el-date-picker>
            </div>
            <el-input
                placeholder="收货人姓名/电话"
                icon="search"
                v-model="simpleSearchObj.inputValue"
                style="width: 210px;margin-left:15px;"
                :on-icon-click="simpleSearch">
            </el-input>
            <div class="margin-left15">
                <label>退货单状态</label>
                <el-select v-model="simpleSearchObj.status" placeholder="审核状态" style="width:150px;"
                           @change="simpleSearch">
                    <el-option
                        v-for="item in status"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <el-button class="margin-left15" type="info" @click="changeMol">高级搜索</el-button>

        </div>
        <!--高级搜索-->
        <div class="publicModelSearch" v-show="dialogFormVisible">
            <el-row style="margin-bottom: 2px;">
                <el-col :span="8">
                    <label>退货单号</label>
                    <input class="form-control" placeholder="退货单号" style="width:244px;"
                           v-model="searchObj.returnNumber"/>
                </el-col>
                <el-col :span="8">
                    <label>支付时间</label>
                    <el-date-picker
                        v-model="searchObj.orderPaymentBeginTime"
                        type="date"
                        style="width:120px;"
                        placeholder="开始时间">
                    </el-date-picker>
                    <el-date-picker
                        v-model="searchObj.orderPaymentEndTime"
                        type="date"
                        style="width:120px;"
                        placeholder="结束时间">
                    </el-date-picker>
                </el-col>
                <el-col :span="8">
                    <label>收货人姓名</label>
                    <input class="form-control" placeholder="收货人姓名"
                           v-model="searchObj.orderReceiverName" maxlength="10" style="width:244px;"/>
                </el-col>
            </el-row>
            <el-row style="margin-bottom: 2px;">
                <el-col :span="8">
                    <label>合计金额</label>
                    <input type="number" step="0.01" min="0" class="form-control" v-model="searchObj.beginMoney"
                           style="width:120px;display: inline-block;">
                    <input type="number" step="0.01" min="0" class="form-control" v-model="searchObj.endMoney"
                           style="width:120px;display: inline-block;">
                </el-col>
                <el-col :span="8">
                    <label>支付类型</label>
                    <el-select v-model="searchObj.orderPaymentMethod" placeholder="支付类型" style="width:244px;">
                        <el-option
                            v-for="item in typePayment"
                            :label="item.name"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="8">
                    <label>收货人电话</label>
                    <input placeholder="收货人电话" class="form-control" v-model="searchObj.orderReceiverMobile"
                           style="width:244px;">
                </el-col>
            </el-row>
            <el-row style="margin-bottom: 20px;">
                <el-col :span="8">
                    <label>审核时间</label>
                    <el-date-picker
                        v-model="searchObj.beginDate"
                        type="date"
                        style="width:120px;"
                        placeholder="开始时间">
                    </el-date-picker>
                    <el-date-picker
                        v-model="searchObj.endDate"
                        type="date"
                        style="width:120px;"
                        placeholder="结束时间">
                    </el-date-picker>
                </el-col>
                <el-col :span="8">
                    <label>收货时间</label>
                    <el-date-picker
                        v-model="searchObj.orderReceiveBeginTime"
                        type="date"
                        style="width:120px;"
                        placeholder="开始时间">
                    </el-date-picker>
                    <el-date-picker
                        v-model="searchObj.orderReceiveEndTime"
                        type="date"
                        style="width:120px;"
                        placeholder="结束时间">
                    </el-date-picker>
                </el-col>
                <el-col :span="8">
                    <label>支付流水号</label>
                    <input placeholder="支付流水号" class="form-control" v-model="searchObj.orderPaymentNum"
                           style="width:244px;">
                </el-col>
            </el-row>
            <el-row style="margin-bottom: 2px;">
                <el-col style="float:right;" :span="4">
                    <el-button type="info" @click="search">查询</el-button>
                </el-col>
            </el-row>
        </div>
        <!--table-->
        <el-table
            :data="tableData"
            style="margin:20px 0;"
            border>
            <el-table-column
                prop="num"
                label="序号"
                align="center"
                min-width="80">
            </el-table-column>
            <el-table-column
                prop="returnNumber"
                label="退货单号"
                align="center"
                min-width="300">
            </el-table-column>
            <el-table-column
                prop="returnNumberStatus"
                label="退货单状态"
                align="center"
                min-width="120">
            </el-table-column>
            <el-table-column
                label="商品金额小计"
                align="center"
                min-width="130">
                <template scope="scope">
                    {{scope.row.goodsTatolPrice | formatPrice}}
                </template>
            </el-table-column>
            <el-table-column
                label="抵扣优惠"
                align="center"
                min-width="120">
                <template scope="scope">
                    {{scope.row.goodsDiscount | formatPrice}}
                </template>
            </el-table-column>
            <el-table-column
                prop="totalPrice"
                label="合计金额"
                align="center"
                min-width="120">
                <template scope="scope">
                    {{scope.row.totalPrice | formatPrice}}
                </template>
            </el-table-column>
            <el-table-column
                label="退款金额"
                align="center"
                min-width="120">
                <template scope="scope">
                    {{scope.row.returnMoney | formatPrice}}
                </template>
            </el-table-column>
            <el-table-column
                prop="applyForTime"
                label="审核时间"
                align="center"
                min-width="180">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                min-width="80"
                align="center">
                <template scope="scope">
                    <el-popover trigger="hover" placement="left">
                        <el-button style="display: block;text-align: center;margin: 0 auto;"
                                   @click="orderDetail(scope.row.orderId)"
                                   v-has:salesReturnList_orderDetails
                                   type="text" size="small">订单详情
                        </el-button>
                        <el-button style="display: block;text-align: center;margin: 0 auto;"
                                   @click="returnAudit(scope.row.detailsId)"
                                   v-has:salesReturnList_returnAudit
                                   type="text" size="small">退货审核
                        </el-button>
                        <div slot="reference" class="name-wrapper">
                            <img src="../../../static/img/details.png">
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
        </el-table>


        <!--分页-->
        <el-pagination
            v-show="isShow"
            style="float:right;"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="this.queryType === 0?simpleSearchObj.pageNum:searchObj.pageNum"
            :page-sizes="pageSizeList"
            :page-size="this.queryType === 0?simpleSearchObj.pageSize:searchObj.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>`

<style lang="less" type="text/less">
    #salesReturnList {
        .publicHeader {
            > div {
                display: inline-block;
            }
        }

        .publicModelSearch {
            .row {
                margin: 0;
                margin-bottom: 5px;
                div {
                    padding: 0;
                    margin: 0;
                }
                input {
                    display: inline-block;
                }
            }
            .refundNum {
                width: 200px;
                display: inline-block;
            }

        }
        .butPopover {
            display: block !important;
            text-align: center !important;
            margin: 0 auto !important;
        }
    }

</style>

<script>
    import vue from 'vue';
    import mybreadcrumb from '../../components/Breadcrumb.vue';
    import salesReturnListBut from '../../components/order/salesReturnListBut.vue';
    import {mapGetters} from 'vuex';
    import rae from '../../api/returnAndExchange.js';
    import orderR from '../../utils/orderReturn.js';
    import {format} from 'date-fns';
    import {zh_cn} from 'date-fns/locale/zh_cn';


    export default {
        data() {
            return {
                pageSizeList: [10, 20, 40],
                dialogFormVisible: false,
                simpleSearchObj: orderR.simpleSearchObj,
                searchObj: orderR.searchObj,
                typePayment: orderR.typePayment,
                status: orderR.status,
                currentPage: 1,
                total: null,
                tableData: [],
                queryType: 0,
                isShow: false,
            }
        },
        created() {
//            this.accountId = JSON.parse(localStorage.getItem('account')).accountId;
            this.accountId = JSON.parse(sessionStorage.getItem('vuex')).user.account.accountId;
            if (this.$store.getters.returnFlag) {
                if (this.$store.getters.pageInfo.type === 1) {
                    this.simpleSearch();
                } else if (this.$store.getters.pageInfo.type === 2) {
                    this.search();
                }
                this.$store.dispatch('setFlag', false);
            } else {
                this.simpleSearch();
            }


        },
        methods: {
            /**
             * 高级搜索和普通搜索切换
             * */
            changeMol() {
                this.dialogFormVisible = this.dialogFormVisible ? false : true;
            },
            /**
             * 普通查询
             * */
            simpleSearch() {
                let res = "",
                    param = null;
                this.queryType = 0;
                if (this.$store.getters.returnFlag) {
                    param = this.$store.getters.pageInfo;
                    for (let i in this.simpleSearchObj) {
                        this.simpleSearchObj[i] = param[i];
                    }
                    this.currentPage = param.pageNum;
                    this.$store.dispatch('setFlag', false);
                } else {
                    if (this.dialogFormVisible) {
                        this.dialogFormVisible = !this.dialogFormVisible;
                    }
                }
                res = orderR.changeReturnSimSearch(this.simpleSearchObj, this.searchObj);
                if (typeof res === "string") {
                    this.$alert(res);
                    return;
                }
                rae.getSalesReturnList(res).then(response => {
                    if (response.data.code === 1) {
                        this.total = response.data.data.total;
                        this.isShow = response.data.data.list.length === 0 ? false : true;
                        this.tableData = orderR.changeReturnListData(response.data.data.list);
                    }
                });
            },
            /**
             * 高级查询
             * */
            search() {
                let res = "",
                    param = null;
                this.queryType = 1;
                if (this.$store.getters.returnFlag) {
                    param = this.$store.getters.pageInfo;
                    for (let i in this.searchObj) {
                        this.searchObj[i] = param[i];
                    }
                    this.currentPage = param.pageNum;
                    this.$store.dispatch('setFlag', false);
                }
                res = orderR.changeReturnSearch(this.searchObj);
                if (typeof res === "string") {
                    this.$alert(res);
                    return;
                }
                rae.getSalesReturnList(res).then(response => {
                    this.total = response.data.data.total;
                    this.isShow = response.data.data.list.length === 0 ? false : true;
                    this.tableData = orderR.changeReturnListData(response.data.data.list);
                });
            },
            /**
             * 当前页
             * */
            handleCurrentChange(page) {
                if (this.queryType === 1) {
                    this.searchObj.pageNum = page;
                    this.search();
                } else if (this.queryType === 0) {
                    this.simpleSearchObj.pageNum = page;
                    this.simpleSearch();
                }
                this.currentPage = page;

            },
            /**
             * 每页显示的条数
             * */
            handleSizeChange(row) {
                if (this.queryType === 1) {
                    this.searchObj.pageSize = row;
                    this.search();
                } else if (this.queryType === 0) {
                    this.simpleSearchObj.pageSize = row;
                    this.simpleSearch();
                }
                this.pageSize = row;
            },
            /**
             * 订单详情跳转
             */
            orderDetail(orderId) {
                let pageInfo = {};
                //普通查询
                if (this.queryType === 0) {
                    pageInfo = this.simpleSearchObj;
                    pageInfo.type = 1;
                } else if (this.queryType === 1) {
                    pageInfo = this.searchObj;
                    pageInfo.type = 2;
                }
                this.$store.dispatch('setPageInfo', pageInfo);

                this.$router.push({
                    path: 'orderDetail',
                    query: {
                        id: orderId,
                        // accountId: this.accountId,
                        source: "saleReturnList"
                    }
                });
            },
            /**
             * 退货审核详情跳转
             * */
            returnAudit(id) {
                let pageInfo = {};
                //普通查询
                if (this.queryType === 0) {
                    pageInfo = this.simpleSearchObj;
                    pageInfo.type = 1;
                } else if (this.queryType === 1) {
                    pageInfo = this.searchObj;
                    pageInfo.type = 2;
                }
                this.$store.dispatch('setPageInfo', pageInfo);

                this.$router.push({
                    path: 'salesReturnAuditDetails',
                    query: {
                        detailsId: id,
                        source: "saleReturnList"
                    }
                });
            }
        },
        computed: {
            ...mapGetters([
                'pageInfo',
                'returnFlag'
            ]),
            navigationList() {
//                this.isAdmin = JSON.parse(localStorage.getItem('account')).isAdmin;
                this.isAdmin = JSON.parse(sessionStorage.getItem('vuex')).user.account.isAdmin;
                if (this.isAdmin == 0) {
                    return [{ name: ' 订单管理' }, { name: '退货列表' }]
                } else if (this.isAdmin == 1) {
                    return [{ name: ' 订单管理' }, { name: '退货列表', route: { path: '/salesReturnList' } }];
                }
            }
        },
        components: {
            mybreadcrumb,
            salesReturnListBut
        }
    }
</script>
