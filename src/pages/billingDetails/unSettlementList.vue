<template>
    <div>
        <div>
            <div class="unSettlementList_headWrap">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-date"></i> 账户管理</el-breadcrumb-item>
                    <el-breadcrumb-item class="breadNav">
                        <a href="javascript:location.reload()">待结算列表</a>
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="row unSettlementList_myRow clearMargin publicHeader">
                <div class=" col-xs-4 clearPadding">
                    <label>结账时间:</label>
                    <div class="col-xs-4 clearPadding" >
                        <el-date-picker
                            v-model="startTime"
                            format="yyyy-MM-dd"
                            :editable='false'
                            @change="searchWithDate"
                            type="date" class="fullWidth">
                        </el-date-picker>
                    </div>
                    <span class="col-xs-1 clearPadding">~</span>
                    <div class="col-xs-4">
                        <el-date-picker
                            v-model="endTime"
                            format="yyyy-MM-dd"
                            :editable='false'
                            type="date"
                            @change="searchWithDate">
                        </el-date-picker>
                    </div>
                </div>
                <div class="col-xs-2 clearPadding" style="margin-left: 200px" >
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
                <div class="col-xs-3 clearPadding"  >
                    <p class="clearMargin">待结算总额:{{money | formatPrice}}</p>
                </div>
            </div>

        </div>
        <div style="margin-top:20px;" class="unSettlementList">
            <div class="table-responsive">
                <table class="table table-bordered table-hover unSettlementList_table ">
                    <thead>
                    <tr>
                        <th>序号</th>
                        <th>结账时间<i class="el-icon-arrow-down" :class="{UnsettlementArrowUp: sortType==1, UnsettlementArrowDown: sortType==0}" @click="sort(0)"></i>
                        </th>
                        <th>结算金额 (¥) <i class="el-icon-arrow-down" :class="{UnsettlementArrowUp: sortType2==1, UnsettlementArrowDown: sortType2==0}" @click="sort2(1)"></i>
                        </th>
                        <th>开户行姓名</th>
                        <th>开户行名称</th>
                        <th>开户账号</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-if="unSettlementDataList && unSettlementDataList.length===0">
                        <td colspan="7"> 没有数据记录</td>
                    </tr>
                    <tr   v-else v-for="(supplier,index) in unSettlementDataList">
                        <td>{{index + 1}}</td>
                        <td>{{supplier.checkoutAt}}</td>
                        <td>{{supplier.totalMoney | formatPrice}}</td>
                        <td>{{supplier.bankUserName}}</td>
                        <td>{{supplier.bankName}}</td>
                        <td>{{supplier.bankAccount}}</td>
                        <td>
                            <div >
                                <router-link
                                    :to="{path: '/unSettlementListDetail', query: {recordId: supplier.recordId}}">
                                    查看明细
                                </router-link>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="unSettlementDataList.length > 0">
                <paging ref="page" :page-num="pageTotal" :current-page="currentPage" :pageSize='10' @change="change"
                        v-on:changeR="changeRows" style="margin-left: 350px"></paging>
            </div>
        </div>
    </div>
</template>

<script>
    import '../../../static/css/unSettlementList.css';
    import axios from 'axios';
    import api from '../../api/billingDetails';
    import paging from '../../components/page';
    import parse from 'date-fns/parse';
    import { format } from 'date-fns';
    import { zh_cn } from 'date-fns/locale/zh_cn';

    export default {
        data () {
            return {
                sortName: 0, /*排序字段（必传，且只能传0或1或2，0代表结账时间，1代表待结算金额，2代表结算时间，3代表结算金额，
                 每次只按一个字段排序，已结算列表默认按结算时间倒序，待结算列表默认按照结账时间倒序*/
                sortType: 1,//排序的次序（必传，且只能传0或1，0代表正序 1代表逆序）
                sortType2:1,
                money: '',//待结算总额
                userId: '',
                startTime: '',//起始时间
                endTime: '',//结束时间
                dialogFormVisible: false,
                v_model: false,
                title: '待结算列表',
                pageNum: 1,
                pageTotal: 1,
                pageSize: 10,
                currentPage: 1,
                unSettlementData: {},
                unSettlementDataList: [],//列表数据集合
            };
        },
        created: function () {
//            this.userId = JSON.parse(localStorage.getItem('account')).accountId;
            this.userId = JSON.parse(sessionStorage.getItem('vuex')).user.account.accountId;
            this.query();
        },
        methods: {
            /**
             * 2 .通过日期来过滤待结算列表数据；
             *   2.1起始日期不能大于终止日期；
             *   2.2在比较大小的时候，需要转换成时间戳
             */
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
            change (index) {
                this.currentPage = index;
                this.query();
            },
            //每页显示条数
            changeRows (row) {
                this.currentPage = 1;
                this.pageSize = row;
                this.query();
            },
            /**
             * 列表查询方法（state:0待结算；1已结算）
             */
            query (params) {
                let param = {
                    state: 0,
                    startTime: this.startTime ? format(this.startTime, 'YYYY-MM-DD', {locale: zh_cn}) : '',
                    endTime: this.endTime ? format(this.endTime, 'YYYY-MM-DD', {locale: zh_cn}) : '',
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                    sortName: this.sortName,
                    sortType: params == null ? 1:params,
                };

                api.getUnsettlementList(param).then(
                    (response) => {
                        console.log(response);
                        this.money = response.data.data.money;
                        let data = response.data.data;
                        this.unSettlementData = data ? data.pageInfo : [];
                        if (this.unSettlementData) {
                            this.unSettlementDataList = this.unSettlementData.list;
                            this.pageTotal = Math.floor((this.unSettlementData.total % this.pageSize) == 0 ? (this.unSettlementData.total / this.pageSize) : (this.unSettlementData.total / this.pageSize) + 1);
                        } else {
                            this.unSettlementDataList = [];
                            this.pageTotal = 0;
                        }
                    });
            },
        },
        components: {
            paging
        },
    };
</script>
<style>
    .unSettlementList_wrap .breadNav .el-breadcrumb__item__inner a {
        color: #48576a;
    }

    .unSettlementList_wrap .breadNav .el-breadcrumb__item__inner a:hover {
        color: #20a0ff;
        cursor: pointer;
    }
</style>
