<template>
    <div>
        <el-table :data="matchHistoryList" border style="width: 100%;margin-bottom:20px;">
            <el-table-column type="index" label="序号" width="80" header-align="center"></el-table-column>
            <el-table-column prop="payId" label="商户订单号" header-align="center" min-width="120"></el-table-column>
            <el-table-column prop="orderPaymentNum" label="支付宝流水号" header-align="center" min-width="120"></el-table-column>
            <el-table-column prop="paymentTime" label="支付时间" header-align="center"></el-table-column>
            <el-table-column label="实收金额"  header-align="center">
                <template scope="scope">
                    {{scope.row.paymentMoney | formatPrice}}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        props: {
            matchHistoryList: Array
        },
        created() {

        }
    }
</script>
