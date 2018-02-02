<template>

    <div class="col-xs-3">
        <span v-if="commodityStatus=== 2">该商品已上架</span>
        <span v-if="commodityStatus === 0 || commodityStatus === 3">该商品已下架</span>
        <span v-if="commodityStatus === 4">该商品上架待审核</span>
        <span v-if="commodityStatus === 5">该商品下架待审核</span>
        <span v-if="commodityStatus === 6">该商品编辑待审核</span>
    </div>

</template>
<script>
    export default {
        data() {
            return {}
        },
        props: {
            commodityStatus: {
                type: Number
            }
        }
    }
</script>
