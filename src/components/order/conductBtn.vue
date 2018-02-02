<template>
    <table class="table table-bordered table-hover orderList_editTable">
        <thead>
            <tr>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item,index) in statusList">
                <td>
                    <a href="javascript:;"><img src="../../../static/img/details.png" alt=""></a>
                    <div>
                        <el-button @click="goDetail(item.orderId, item.orderStatus)" v-has:orderList_orderDetail>
                            查看详情
                        </el-button>
                        <el-button  v-if=" item.orderStatus == 3 || item.orderStatus == 4 || item.orderStatus == 19 || item.orderStatus == 12" @click="seeLogics(item.orderId)" v-has:orderList_seeLogics>
                            查看物流
                        </el-button>
                        <el-button class="deactive" v-else>
                            查看物流
                        </el-button>
                        <el-button  v-if="item.orderStatus == 2" @click="goLogistics(item.orderId, item.orderStatus)" v-has:orderList_confirmOrder>
                            确认发货
                        </el-button>
                        <el-button class="deactive" v-else>
                            确认发货
                        </el-button>
                        <el-button  v-has:refundAudit_cancelDetail v-if="item.orderStatus == 5 || item.orderStatus == 6 || item.orderStatus == 7 || item.orderStatus == 9 || item.orderStatus == 10 || item.orderStatus == 11" @click="goToRefund(item.orderId,item.orderStatus)">
                            退款审核
                        </el-button>
                        <el-button class="deactive" v-else>
                            退款审核
                        </el-button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>

    export default {
        data: function () {
            return {

            }
        },
        methods: {
            goDetail(id,status){
                this.$emit('goDetail', id, status)
            },
            seeLogics(id){
                 this.$emit('seeLogics', id);
            },
            goToRefund(id, status){
                this.$emit('goToRefund',id, status);
            },
            goLogistics(id, status) {
                this.$emit('goLogistics', id,status)
            }
        },

        props: {
            statusList:{
                type: Array,
                required: true,
                default: []
            },
        },

        computed: {

        },

        created () {

        },
        watch: {

        },

    }

</script>
<style scoped lang="less">
.orderList_editTable {
    position: absolute;
    width: 100px;
    text-align: center;
    right: 0;
    top: 0;
    background: #fff;
    >tbody {
        tr {
            td {
                text-align: center;
                position: relative;
                padding: 0 !important;
                >a {
                    width: 100%;
                    height: 100%;
                    display: block;
                    padding: 2px 2px;
                }
                div {
                    display: none;
                    position: absolute;
                    right: 50px;
                    top: 20px;
                    width: 100px;
                    border: 1px solid #ccc;
                    z-index: 100;
                    a,button{
                        outline: none;
                        display: block;
                        padding: 8px 2px;
                        width:100%;
                        background: #fff;
                        border:none;
                        color:#337ab7;
                        &:hover {
                            background: #ccc;
                        }
                    }

                }
                .is-disabled,.is-disabled:hover{
                    color:#ccc;
                    cursor: auto;
                    background: #fff;
                }
                .el-button+.el-button{
                    margin-left: 0;
                }
                &:hover div {
                            display: block;
                            background: #fff;
                }
            }
        }
    }
    .deactive {
        color: #ccc;
        &:hover{
            background: #fff;
            cursor: auto;
        }
    }
}
</style>