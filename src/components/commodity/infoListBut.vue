<template>
    <div class="infoListBut_wrap">
        <!--commodityList页面的button-->
        <el-button v-show="type === 2" type="text" v-has:commodityList_uploadCommodity
                   :disabled="commodityList.statusNum === 2 || commodityList.statusNum === 4 || commodityList.statusNum === 5 || commodityList.statusNum === 6"
                   @click="goodsShelves(commodityList.id)">上架
        </el-button>

        <el-button v-show="type === 2" type="text" v-has:commodityList_cancelCommodity
                   :disabled="commodityList.statusNum === 3 || commodityList.statusNum === 4 || commodityList.statusNum === 5 || commodityList.statusNum === 6"
                   @click="goodsOffShelf(commodityList.id)">下架
        </el-button>

        <el-button v-show="type === 2" type="text" v-has:commodityList_commodityDetail
                   @click="commodityDetail(commodityList.id)">查看详情
        </el-button>

        <el-button v-show="type === 2" type="text" v-has:commodityList_openWarning
                   @click="openWarning(commodityList.id)"
                   :disabled="commodityList.statusNum === 2 || commodityList.statusNum === 4 || commodityList.statusNum === 5 || commodityList.statusNum === 6">
            删除
        </el-button>

        <!--adminCommodityList页面的button-->
        <el-button v-show="type === 1" type="text" v-has:adminCommodityList_uploadCommodity
                   :disabled="commodityList.statusNum === 2 || commodityList.statusNum === 4 || commodityList.statusNum === 5 || commodityList.statusNum === 6"
                   @click="goodsShelves(commodityList.id)">上架
        </el-button>
        <el-button v-show="type === 1" type="text" v-has:adminCommodityList_cancelCommodity
                   :disabled="commodityList.statusNum === 3 || commodityList.statusNum === 4 || commodityList.statusNum === 5 || commodityList.statusNum === 6"
                   @click="goodsOffShelf(commodityList.id)">下架
        </el-button>
        <el-button v-show="type === 1" type="text" v-has:adminCommodityList_delCommodity
                   @click="commodityDetail(commodityList.id,commodityList.supplierId)">查看详情
        </el-button>
        <el-button v-show="type === 1" type="text" v-has:adminCommodityList_delCommodity
                   @click="openWarning(commodityList.id)"
                   :disabled="commodityList.statusNum === 2 || commodityList.statusNum === 4 || commodityList.statusNum === 5 || commodityList.statusNum === 6">
            删除
        </el-button>
    </div>
</template>
<script>

    export default {
        data: function () {
            return {}
        },
        methods: {
            goodsOffShelf(id) {
                this.$emit('goodsOffShelf', id)
            },
            goodsShelves(id) {
                this.$emit('goodsShelves', id);
            },
            commodityDetail(id, supperId) {
                this.$emit('commodityDetail', id, supperId);
            },
            openWarning(id) {
                this.$emit('openWarning', id)
            }
        },

        props: {
            commodityList: {
                type: Object,
                required: true,
            },
            type: {
                type: Number
            }
        },

        computed: {},

        created() {
        },
        watch: {},

    }

</script>
<style scoped>
    .infoListBut_wrap {
        background: #fff;
        border: 1px solid #ccc;
    }

    .infoListBut_wrap > button {
        display: block;
        margin: 0 auto;
        padding: 4px 0;
    }
</style>
