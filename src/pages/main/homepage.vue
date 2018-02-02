<template>
    <div>
        <div>
            <div>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-date"></i> 首页</el-breadcrumb-item>
                </el-breadcrumb>
                <hr>
            </div>
        </div>
        <div class="row homePage_navWarp clearMargin publicHeader">
            <div class="col-xs-6">
                <div class="inventory_infos_style" style="width:800px;">
                   <div class="" style="width:31px;display:inline-block;">
                       <Icon type="android-warning" size=25 px color="orange"></Icon>
                   </div>
                    <div style="min-width:300px;display:inline-block;">
                        <label>库存提醒:</label>
                        <div v-if=" this.commodityData.inventoryStatusNum === 0">
                            <label>暂无库存预警</label>
                        </div>
                        <div v-else>
                            <router-link :to="{path:'/commInventoryManage', query:{accountId: this.accountId }}">
                                <label>有{{this.commodityData.inventoryStatusNum}}条库存预警，请点击查看</label>
                            </router-link>
                        </div>
                    </div>
                    <div class="" style="width:20px;display:inline-block;">
                        <a @click="Refresh()"> <Icon type="refresh" size=25 px  ></Icon></a>
                    </div>

                </div>

            </div>
        </div>

        <div class="col-xs-4">
            <div style="margin-top:30px;" class="homepage">
                <div>
                    <table class="table table-striped" style="margin-left: -14px">
                        <thead>
                        <tr>
                            <th colspan="3" style="line-height: 36px">订单统计</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td style="text-align: left">待付款</td>
                            <td style="text-align: center">{{this.orderData.paymentOrderNum}}</td>
                        </tr>
                        <tr>
                            <td style="text-align: left">待发货</td>
                            <td>{{this.orderData.pendingShipOrderNum}}</td>
                        </tr>
                        <tr>
                            <td style="text-align: left">已发货</td>
                            <td>{{this.orderData.issueShipOrderNum}}</td>
                        </tr>
                        <tr>
                            <td style="text-align: left">已完成</td>
                            <td>{{this.orderData.receivedOrderNum}}</td>
                        </tr>
                        <tr>
                            <td style="text-align: left">已退款</td>
                            <td>{{this.orderData.refundedOrderNum}}</td>
                        </tr>
                        <tr>
                            <td style="text-align: left">待付款已取消</td>
                            <td>{{this.orderData.paymentCancelOrderNum}}</td>
                        </tr>
                        <tr>
                            <td style="text-align: left">已拒收待审核</td>
                            <td>{{this.orderData.rejectOrderNum}}</td>
                        </tr>
                        <tr>
                            <td style="text-align: left">已取消待审核</td>
                            <td>{{this.orderData.cancelOrderNum}}</td>
                        </tr>
                        <tr>
                            <td style="text-align: left">订单总数</td>
                            <td>{{this.orderData.totalOrderNum}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>


        <div class="col-xs-4 ">
            <div style="margin-top:30px;" class="homepage">
                <div>
                    <table class="table table-striped homepage_table ">
                        <thead>
                        <tr>
                            <th colspan="3" style="line-height: 36px">商品统计</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td style="text-align: left">已上架</td>
                            <td>{{this.commodityData.onShelvesNum}}</td>
                        </tr>
                        <tr>
                            <td style="text-align: left">已下架</td>
                            <td>{{this.commodityData.offShelvesNum}}</td>
                        </tr>
                        <tr>
                            <td style="text-align: left">上架待审核</td>
                            <td>{{this.commodityData.onShelvesAuditNum}}</td>
                        </tr>
                        <tr>
                            <td style="text-align: left">下架待审核</td>
                            <td>{{this.commodityData.offShelvesAuditNum }}</td>
                        </tr>
                        <tr>
                            <td style="text-align: left">编辑待审核</td>
                            <td>{{this.commodityData.editAuditNum }}</td>
                        </tr>
                        <tr>
                            <td style="text-align: left">SKU总数</td>
                            <td>{{this.commodityData.skuNum}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="col-xs-4" style="padding-left: 28px;">
            <div style="margin-top:30px;margin-right: -15px;" class="homepage" >
                <div>
                    <table class="table table-striped homepage_table ">
                        <thead>
                        <tr>
                            <th colspan="3"><span>金额统计</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-select v-model="searchCondition.status" placeholder="本周" >
                                <el-option
                                    v-for="item in timeStatus"
                                    :key="item.status"
                                    :label="item.type"
                                    :data-status="item.status"
                                    :value="item.status">
                                </el-option>
                            </el-select></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td style="text-align: left">已结算金额</td>
                            <td>{{this.moneyData.settledMoney}}</td>
                        </tr>
                        <tr>
                            <td style="text-align: left">待结算金额</td>
                            <td>{{this.moneyData.pendingSettlementMoney}}</td>
                        </tr>
                        <tr>
                            <td style="text-align: left">订单总金额</td>
                            <td>{{this.moneyData.orderTotalMoney}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <el-dialog title="提示" :visible.sync="dialog" size="tiny" >
            <span>您好，您尚未通过资质审核。</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" style="text-align: center" @click="jump">资质信息</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import '../../../static/css/homePage.less';
    import axios from 'axios';
    import api from '../../api/homepage';
    import paging from '../../components/page';
    import parse from 'date-fns/parse';
    import { format } from 'date-fns';
    import { zh_cn } from 'date-fns/locale/zh_cn';
    import ElIcon from "../../../node_modules/element-ui/packages/icon/src/icon";
    import ElButton from "../../../node_modules/element-ui/packages/button/src/button";

    export default {
        data () {
            return {
                message:'暂无库存预警',
                timeStatus: [
                    {
                        status: '1',
                        type: '本周'
                    },
                    {
                        status: '2',
                        type: '当月'
                    },
                    {
                        status: '3',
                        type: '近三个月'
                    },
                ],
                searchCondition: {status: null},
                changeSta: '',
                commodityData : {},
                orderData : {},
                moneyData : {},
                qualifications:'',
                dialog: false,
                isPolling: true,
                time :0,
            };
        },
        created: function () {
//            this.token = localStorage.getItem('token');
            this.token = JSON.parse(sessionStorage.getItem('vuex')).user.token;
//            this.accountId = JSON.parse(localStorage.getItem('account')).accountId;
            this.accountId = JSON.parse(sessionStorage.getItem('vuex')).user.account.accountId;
            this.getStatus();
            this.getMoneyData();
            this.getOrderData();
            this.getCommodityData();
            this.timedRefresh();
        },
        methods:{
            timedRefresh : function () {
                this.time = window.setInterval(() => {
                    if (this.isPolling) {
                         this.getCommodityData();
                         this.getMoneyData();
                         this.getOrderData();
                    }
                }, 60000);
            },
            /**
             * 清除时间对象
             */
            clearTimes: function () {
                this.isPolling = false;
                this.time = this.timedRefresh();
                window.clearTimeout(this.time);
            },

            clearTimes1: function () {
                window.clearInterval(this.time);
            },
            Refresh() {
                   this.getMoneyData();
                 this.getOrderData();
                 this.getCommodityData();
                 this.clearTimes1();
                 this.timedRefresh();
            },

            jump(){
                this.$router.push({path: '/commonSupplierInfoEdit', query: {accountId: this.accountId,routeSupplier:1}});
            },
            getStatus(){
                let param = {
                    accountId  : this.accountId ?this.accountId:1,
                };
                api.getQualificationIsRead(param).then(
                    (response) => {
                        let data =response.data.data;
                        if(data === 0){
                            this.dialog = true;
                        }else {
                            this.dialog = false;
                        }
                    });

            },


            getOrderData(){
                api.getOrderCount().then(
                    (response) => {
                        let data =response.data.data;
                        this.orderData = data ? data:[];
                    });
            },
            getCommodityData(){
                api.getCommodityCount().then(
                    (response) => {
                        let data =response.data.data;
                        this.commodityData = data ? data :[];
                    });

            },
            getMoneyData(){
                if(! this.searchCondition.status ){
                    this.searchCondition.status = '1'
                }
                let param = {
                    timeType :this.searchCondition.status ,
                };
                api.getMoneyCount(param).then(
                    (response) => {
                        let data =response.data.data;
                        this.moneyData = data ? data:[];
                    });
            },
            changeStatus: function () {
                this.getMoneyData();
            },
        },

        watch: {
            'searchCondition.status': {
                handler: function (newVal, oldVal) {
                    if (newVal != oldVal) {
                        this.changeStatus();
                    }
                }
            },
        },

        components: {
            ElButton, ElIcon, paging
        },

        computed: {},
        destroyed: function () {
            this.clearTimes();
        },
    };

</script>
<style>
    .inventory_infos_style label{
        line-height: 20px;
    }
</style>


