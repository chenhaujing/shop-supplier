<template>
    <div>
        <div class="settlementList_headWrap">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 账户管理</el-breadcrumb-item>
                <el-breadcrumb-item class="breadNav">
                    <a href="javascript:location.reload()">已结算列表</a>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="row settlementList_navWarp clearMargin publicHeader">
            <div class="col-xs-4 clearPadding">
                <div>
                    <label>结算时间:</label>
                    <div class="col-xs-4 clearPadding">
                        <el-date-picker
                            v-model="startTime"
                            format="yyyy-MM-dd"
                            :editable='false'
                            @change="searchWithDate"
                            type="date" class="fullWidth">
                        </el-date-picker>
                    </div>
                    <span class="col-xs-1 clearPadding">~</span>
                    <div class="col-xs-4 clearPadding">
                        <el-date-picker
                            v-model="endTime"
                            format="yyyy-MM-dd"
                            :editable='false'
                            type="date" style="width:100%"
                            @change="searchWithDate">
                        </el-date-picker>
                    </div>
                </div>
            </div>
            <div class="col-xs-2" style="margin-left: 150px">
                <el-tooltip placement="top">
                    <div slot="content">   <p style="text-align: center">结算金额说明</p>    <p>
                        1. 当订单状态为"已完成"状态,
                           结算金额=透云进货价小计+运费金额
                           </p>   <p>
                        2. 当订单是通过已拒收退款审核进入到“已退款”状态时
                           结算金额=运费金额
                           </p></div>
                    <el-button style="color: red">提示</el-button>
                </el-tooltip>
            </div>
            <div class="col-xs-3">
                <p>已结算总额：{{money | formatPrice}}</p>
            </div>
        </div>
        <div style="margin-top:20px;">
            <div class="table-responsive">
                <table class="table table-bordered table-hover SettlementList_table " style="min-width: 1200px">
                    <thead>
                    <tr>
                        <th>序号</th>
                        <th>结算时间<i class="el-icon-arrow-down" :class="{settlementArrowUp: sortType==1, settlementArrowDown: sortType==0}" @click="sort(2)"></i>
                        </th>
                        <th>结算金额 (¥) <i class="el-icon-arrow-down" :class="{settlementArrowUp: sortType2==1, settlementArrowDown: sortType2==0}" @click="sort2(3)"></i>
                        </th>
                        <th>结账时间 (¥) <i class="el-icon-arrow-down" :class="{settlementArrowUp: sortType3==1, settlementArrowDown: sortType3==0}" @click="sort3(0)"></i>
                        </th>
                        <th>银行账户</th>
                        <th>开户行名称</th>
                        <th>开户账号</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-if="settlementDataList && settlementDataList.length===0">
                        <td colspan="9"> 没有数据记录</td>
                    </tr>
                    <tr  v-else v-for="(supplier,index) in settlementDataList">
                        <td>{{index+1}}</td>
                        <td>{{supplier.settledAt}}</td>
                        <td>{{supplier.settledAmount | formatPrice}}</td>
                        <td>{{supplier.checkoutAt}}</td>
                        <td>{{supplier.bankUserName}}</td>
                        <td>{{supplier.bankName}}</td>
                        <td>{{supplier.bankAccount}}</td>
                        <td>
                            <!-- <img src="../../../static/img/details.png" alt="">-->
                            <div>
                                <router-link
                                    :to="{path: '/settlementListDetail', query: {recordId: supplier.recordId}}">
                                    查看明细
                                </router-link>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="settlementDataList.length > 0">
                <paging ref="page" :page-num="pageTotal" :current-page="currentPage" :pageSize='10' @change="change"
                        v-on:changeR="changeRows" style="margin-left: 350px"></paging>
            </div>
        </div>
    </div>
</template>

<script>
    import '../../../static/css/settlementList.less';
    import axios from 'axios';
    import api from '../../api/billingDetails';
    import paging from '../../components/page';
    import parse from 'date-fns/parse';
    import { format } from 'date-fns';
    import { zh_cn } from 'date-fns/locale/zh_cn';

    export default {
        data () {
            return {
                money: '',
                contractResponsible: '',
                userId: '',
                token: '',
                startTime: '',
                endTime: '',
                dialogFormVisible: false,
                v_model: false,
                show: false,
                title: '已结算列表',
                pageNum: 1,
                pageTotal: 1, //总页码
                pageSize: 10, //每页条数
                currentPage: 1, //当前页
                settlementData: {},
                settlementDataList: [],
                money: '',
                sortName: 2, /*排序字段（必传，且只能传0或1或2，0代表结账时间，1代表待结算金额，2代表结算时间，3代表结算金额，
                 每次只按一个字段排序，已结算列表默认按结算时间倒序，待结算列表默认按照结账时间倒序*/
                sortType: 1,//排序的次序（必传，且只能传0或1，0代表正序 1代表逆序）
                sortType2:1,
                sortType3:1,
            };
        },
        created: function () {
//            this.userId = JSON.parse(localStorage.getItem('account')).accountId;
            this.userId = JSON.parse(sessionStorage.getItem('vuex')).user.account.accountId;
            //this.token = window.localStorage.getItem('token')
            this.query();
        },
        methods: {

            // 通过日期来进行过滤；
            searchWithDate () {
                let startTime = this.startTime ? format(this.startTime, 'YYYY-MM-DD', {locale: zh_cn}) : '';//开始时间（创建时间）
                let endTime = this.endTime ? format(this.endTime, 'YYYY-MM-DD', {locale: zh_cn}) : '';//截止时间（创建时间)
                if (startTime && endTime && startTime > endTime) {
                    this.$alert('创建时间起始时间不能大于终止时间');
                    return;
                }
                this.query();
            },

            //列表排序
            sort (sortName) {
                this.sortType === 1 ? this.sortType = 0 : this.sortType = 1;
                this.sortName = sortName;
                this.query(this.sortType);
            },
            sort2 (sortName) {
                this.sortType2 === 1 ? this.sortType2 = 0 : this.sortType2 = 1;
                this.sortName = sortName;
                this.query(this.sortType2);
            },
            sort3 (sortName) {
                this.sortType3 === 1 ? this.sortType3 = 0 : this.sortType3 = 1;
                this.sortName = sortName;
                this.query(this.sortType3);
            },

            change (index) {
                this.currentPage = index;
                this.query();
            },
            //每页显示条数
            changeRows (row) {
                this.currentPage = 1;
                //this.userList.pageSize = row
                this.pageSize = row;
                this.query(null);
            },

            query (params) {
                let param = {
                    state: 1,
                    startTime: this.startTime ? format(this.startTime, 'YYYY-MM-DD', {locale: zh_cn}) : '',
                    endTime: this.endTime ? format(this.endTime, 'YYYY-MM-DD', {locale: zh_cn}) : '',
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                    sortName: this.sortName,
                    sortType: params == null ? 1:params,
                };
                api.getSettlementList(param).then(
                    (response) => {
                        console.log(response);
                        this.money = response.data.data.money;
                        let data = response.data.data;
                        this.settlementData = data ? data.pageInfo : [];
                        if (this.settlementData) {
                            this.settlementDataList = this.settlementData.list;
                            this.pageTotal = Math.floor((this.settlementData.total % this.pageSize) == 0 ? (this.settlementData.total / this.pageSize) : (this.settlementData.total / this.pageSize) + 1);
                        } else {
                            this.settlementDataList = [];
                            this.pageTotal = 0;
                        }
                    });
            },
        },

        components: {
            paging
        },

        computed: {}

    };

</script>

<style>
    .settlementList_wrap .breadNav .el-breadcrumb__item__inner a {
        color: #48576a;
        cursor: pointer;
    }

    .settlementList_wrap .breadNav .el-breadcrumb__item__inner a:hover {
        color: #20a0ff;
        cursor: pointer;
    }

</style>
