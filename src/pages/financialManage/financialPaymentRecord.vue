<template>
    <div>
        <mybreadcrumb :navigationList="navigationList"></mybreadcrumb>
        <el-row class="containers">
            <el-col :span="12">
                <div class="containers-layout">
                    <div class="containers-layout-title">支付宝账单</div>
                    <div class="firstCol-style">
                        <el-col :span="24">
                            <label>商户订单号：</label><span>{{payRecordlist.alipay.payId}}</span>
                        </el-col>
                    </div>
                    <el-row class="row-style">
                        <el-col :span="12">
                            <label>支付流水号：</label><span>{{payRecordlist.alipay.orderPaymentNum}}</span>
                        </el-col>
                    </el-row>
                    <el-row class="row-style">
                        <el-col :span="12">
                            <label>支付时间：</label><span>{{payRecordlist.alipay.paymentTime}}</span>
                        </el-col>
                        <el-col :span="12">
                            <label>支付金额：</label>
                            <span v-if="payRecordlist.alipay.paymentMoney">
                                {{payRecordlist.alipay.paymentMoney | formatPrice}}
                            </span>
                        </el-col>
                    </el-row>
                    <el-table :data="payRecordlist.alipay.list">
                        <el-table-column prop="drawbackTime" label="退款时间" align="left"></el-table-column>
                        <el-table-column prop="drawbackPrice" label="退款金额" align="left">
                             <template scope="scope">
                                {{scope.row.drawbackPrice | formatPrice}}
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="containers-layout">
                    <div class="containers-layout-title">平台账单</div>
                    <div class="firstCol-style">
                        <el-col :span="24">
                            <label>订单编号：</label><span>{{payRecordlist.payment.orderId}}</span>
                        </el-col>
                    </div>
                    <el-row class="row-style">
                        <el-col :span="12">
                            <label>支付流水号：</label><span>{{payRecordlist.payment.orderPaymentNum}}</span>
                        </el-col>
                    </el-row>
                    <el-row class="row-style">
                        <el-col :span="12">
                            <label>支付时间：</label><span>{{payRecordlist.payment.paymentTime}}</span>
                        </el-col>
                        <el-col :span="12">
                            <label>支付金额：</label>
                            <span v-if="payRecordlist.payment.paymentMoney">
                                {{payRecordlist.payment.paymentMoney | formatPrice}}
                            </span>
                        </el-col>
                    </el-row>
                    <el-table :data="payRecordlist.payment.list">
                        <el-table-column prop="drawbackTime" label="退款时间" align="left"></el-table-column>
                        <el-table-column prop="drawbackPrice" label="退款金额" align="left">
                            <template scope="scope">
                                {{scope.row.drawbackPrice | formatPrice}}
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
        </el-row>
        <div class="container-bottom">
            <div class="footer">
                <el-button type="info" @click="back">返回上一级</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '../../api/financialManage';
    import vue from 'vue';
    import mybreadcrumb from '../../components/Breadcrumb.vue';
    import {mapGetters} from 'vuex';
    export default {
        data() {
            return {
                orderId:'',
                //数据模型
                payRecordlist:{
                    //支付宝
                    alipay:{
                        paymentTime:'',
                        paymentMoney:'',
                        orderPaymentNum:'',
                        payId:'',
                        list:[]
                    },
                    //平台
                    payment:{
                        paymentTime:'',
                        paymentMoney:'',
                        orderPaymentNum:'',
                        orderId:'',
                        list:[]
                    }
                }
            }
        },

        created: function () {
            this.orderId = this.$route.query.orderId;
            this.simpleSearch();
        },

        methods: {
            // 查询列表信息
            simpleSearch(){
                let param = {
                    orderId : this.orderId
                };
                api.getPayRecordDetail(param).then(
                    (response) => {
                        if (response.data.code === 1){
                            let data =response.data.data;
                            //给支付宝数据模型赋值
                            this.payRecordlist.alipay = data.alipay ? data.alipay:[];
                            //给平台数据模型赋值
                            this.payRecordlist.payment = data.payment ? data.payment:[];
                        }else {
                            this.$alert("请求失败！");
                        }
                    });
            },

            //返回上一级
            back(){
                this.$store.dispatch('setFlag', true);
                this.$router.push({path:'/financialOrderList'});
            }
        },

        computed: {
            navigationList() {
                return [{ name: '财务管理' }, { name: '财务订单列表', route: { path: '/financialOrderList' }},{ name: '支付记录' }];
            }
        },
        components: {
            mybreadcrumb
        }
    }
</script>
<style scoped lang="less" type="text/less">
    .containers{  margin-top: 20px; }
    .containers-layout{
        margin: 10px;
        border: 1px solid #dfe6ec;
        padding: 25px;
    }
    .containers-layout-title{
        float: left;
        margin-top: -41px;
        padding: 5px;
        background: #fff;
    }
    label{
        width: 125px;
        padding-left:20px;
    }
    .firstCol-style{
        height: 40px;
        line-height: 36px;
        font-size: 1.1em;
        background: #eef1f6;
        color: #1f2d3d;
        border: 1px solid #dfe6ec;
    }
    .row-style{
        margin: 10px 0 10px 0;
        height: 40px;
        line-height: 36px;
    }
    .container-bottom{
        display: block;
        width: 100%;
        margin-top: 20px;
    }
    .footer{
        width:100px;
        margin:0px auto;
    }
</style>



