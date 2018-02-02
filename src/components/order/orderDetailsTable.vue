<template>
    <div>
        <div class="basicsInfo">
            <span class="order_title">订单编号:</span><span>{{orderNum}}</span>
            <span v-if="saleReturnNum" class="order_title">退货单号:</span>
            <span v-if="barterReturnNum" class="order_title">换货单号:</span>
            <span
                v-if="saleReturnNum">{{saleReturnNum}}</span>
            <span
                v-if="barterReturnNum">{{barterReturnNum}}</span>
            <span class="order_title">收货人:</span><span>{{consignee}}</span>
        </div>
        <el-table
            :data="orderDetails"
            border
            style="width: 100%;margin-bottom:20px;">
            <el-table-column
                prop="goodsImage"
                label="商品图片"
                align="center"
                min-width="100">
                <template scope="scope">
                    <img :src="scope.row.goodsImage" style="height: 50px;margin: 2px auto;">
                </template>
            </el-table-column>
            <el-table-column
                prop="goodsName"
                label="商品名称"
                align="center"
                min-width="180">
            </el-table-column>
            <el-table-column
                prop="brandName"
                label="商品品牌"
                align="center"
                min-width="150">
            </el-table-column>
            <el-table-column
                prop="code69"
                label="商品条码"
                min-width="180"
                align="center">
            </el-table-column>
            <el-table-column
                prop="goodsAttribute"
                label="规格值"
                align="center"
                min-width="180">
            </el-table-column>
            <el-table-column
                prop="goodsNumber"
                label="商品数量"
                align="center"
                min-width="100">
            </el-table-column>
            <el-table-column
                label="APP订货价"
                align="center"
                min-width="120">
                <template scope="scope">
                    {{scope.row.goodsUnitPrice | formatPrice}}
                </template>
            </el-table-column>
            <el-table-column
                label="折扣优惠"
                align="center"
                min-width="120">
                <template scope="scope">
                    {{scope.row.goodsDiscount|formatPrice}}
                </template>
            </el-table-column>
            <el-table-column
                label="总额"
                align="center"
                min-width="120">
                <template scope="scope">
                    {{scope.row.goodsTotalPrice | formatPrice}}
                </template>
            </el-table-column>
        </el-table>

        <!--退货信息-->
        <div class="refundInfo" v-if="saleReturnNum">
            <p>
                <span>运费金额</span>
                <el-input style="width:100px"
                          v-model="reOrderPostage"
                          :disabled="true"></el-input>
                <span style="margin-left:70px;">实付金额</span>
                <el-input style="width:100px"
                          v-model="reTotalPrice"
                          :disabled="true"></el-input>
            </p>
            <p>
                <span>退款理由</span>
                <el-input style="width:150px"
                          v-model="orderDetails[0].returnReason"
                          :disabled="true">
                </el-input>
            </p>
            <p>
                <span>退款描述</span>
                <el-input style="width:500px"
                          v-model="orderDetails[0].returnRemarks"
                          :disabled="true">
                </el-input>
            </p>
            <p>
                <span>寄回单号</span>
                <el-input style="width:300px"
                          v-model="orderDetails[0].returnLogisticsNumber"
                          :disabled="true">
                </el-input>
                <el-button v-if="orderDetails[0].returnLogisticsNumber" style="margin-left:10px;" v-has:salesReturnAuditDetails_number type="info"
                           @click="showShipmentNum">查看寄回单号
                </el-button>
                <el-button v-else="orderDetails[0].returnLogisticsMethod === 1" style="margin-left:10px;" v-has:salesReturnAuditDetails_number type="info"
                           @click="showShipmentNum">查看寄回单号
                </el-button>
            </p>
            <p v-if="orderDetails[0].imagesList">
                <span style="float:left;line-height: 100px;">图片展示</span>
                <span>
                    <ul>
                        <li v-for="item in orderDetails[0].imagesList"><img :src="item.minImgUrl" alt=""></li>
                    </ul>
                </span>
            </p>
        </div>
    </div>
</template>

<style type="text/less" lang="less" scoped>
    .basicsInfo {
        margin: 10px auto;
    }

    .order_title {
        margin: 0 5px 0 30px;
    }

    table {
        background: #fff;
        margin-bottom: 20px;
    }

    .refundInfo {
        margin-left: 100px;
        > p {
            margin-bottom: 20px;
            overflow: hidden;
            span:nth-of-type(1) {
                margin-right: 5px;
            }
            ul {
                float: left;
                li {
                    float: left;
                    margin-right: 5px;
                    img {
                        margin-bottom:;
                        width: 100px;
                    }
                }
            }
        }
    }
</style>

<script>
    import filter from '../../utils/filter.js';

    export default {
        props: {
            orderNum: {
                type: String,
            },
            saleReturnNum: {
                type: String
            },
            barterReturnNum: {
                type: String
            },
            consignee: {
                type: String
            },
            orderDetails: {
                type: Array
            }
        },
        data() {
            return {}
        },
        created() {
        },
        methods: {
            showShipmentNum() {
                this.$emit('showShipmentNum', true);
            }
        },
        computed: {
            reOrderPostage() {
                return filter.formatMoney(this.orderDetails[0].orderPostage);

            },
            reTotalPrice() {
                return filter.formatMoney(this.orderDetails[0].totalPrice);
            },
        }
    }
</script>
