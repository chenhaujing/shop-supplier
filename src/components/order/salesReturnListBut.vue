<template>
    <div>
        <el-button type="text"
                   @click="returnAudit(10)">退货审核
        </el-button>

        <el-button type="text"
                   @click="orderDetail(10)">订单详情
        </el-button>
    </div>
</template>

<style scoped lang="less" type="text/less">
    div {
        button {
            display: block;
            margin: 0 auto!important;
            padding: 4px 0;
        }
    }
</style>

<script>
    export default {
        data() {
            return {}
        },
        props: {},
        methods: {
            orderDetail(id) {
                this.$emit('orderDetail', id);
            },
            returnAudit(id) {
                this.$emit('returnAudit', id);
            }
        }
    }
</script>
