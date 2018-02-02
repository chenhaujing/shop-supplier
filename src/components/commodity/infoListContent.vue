<template>
    <div ref="content" class="col-xs-8">
        <div class="col-xs-12">
            <h3>{{commodityDetails.name}} {{commodityDetails.ruleVal}}</h3>
        </div>
        <div class="col-xs-12" style="background:#ccc;line-height:46px;">
            <div class="col-xs-6" style="padding-left: 0;">
                <h4>
                    <b>透云进货价:</b>¥{{commodityDetails.unitPrice |toFloat}}
                </h4>
            </div>
            <div class="col-xs-6">
                <h4>
                    <b>APP订货价:</b>¥{{commodityDetails.price | toFloat}}
                </h4>
            </div>
        </div>
        <div class="col-xs-6 commodityInfo_list">
            <div class="col-xs-12">
                <h5>
                    <b>商品科属:</b>{{commodityDetails.categoryOneName}}--{{commodityDetails.categoryTwoName}}--{{commodityDetails.categoryThreeName}}
                </h5>
            </div>
            <div class="col-xs-12">
                <h5>
                    <b>商品品牌:</b>{{commodityDetails.brandName}}
                </h5>
            </div>
            <div class="col-xs-12">
                <h5>
                    <b>商品条码:</b>{{commodityDetails.code69}}
                </h5>
            </div>
            <div class="col-xs-12">
                <h5>
                    <b>库存单位:</b>{{commodityDetails.unitName}}
                </h5>
            </div>
            <div class="col-xs-12">
                <h5>
                    <b>生产日期:</b>{{commodityDetails.productionDate}}
                </h5>
            </div>
            <div class="col-xs-12">
                <h5>
                    <b>是否失效:</b>
                    <span v-if="commodityDetails.invalidStatus === 0">失效</span>
                    <span v-if="commodityDetails.invalidStatus === 1">正常</span>
                </h5>
            </div>
        </div>
        <div class="col-xs-6 commodityInfo_list" style="padding-left:0;">
            <div class="col-xs-12">
                <h5>
                    <b>商品标签:</b>{{commodityDetails.tagName}}
                </h5>
            </div>
            <div class="col-xs-12">
                <h5>
                    <b>商品产地:</b>{{commodityDetails.originPlace}}</h5>
            </div>
            <div class="col-xs-12">
                <h5>
                    <b>企业名称:</b>{{commodityDetails.companyName}}</h5>
            </div>

            <div class="col-xs-12">
                <h5>
                    <b>有效期:</b>{{commodityDetails.guaranteePeriod}}{{commodityDetails.guaranteePeriodUnit}}
                </h5>
            </div>
            <div class="col-xs-12">
                <h5>
                    <b>库存量:</b>{{commodityDetails.inventory}}
                </h5>
            </div>
            <div class="col-xs-12">
                <h5>
                    <b>起订量:</b>{{commodityDetails.minOrderQuantity}}{{commodityDetails.unitName}}
                </h5>
            </div>

        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        props: {
            commodityDetails: {
                type: Object
            }
        },
        filters: {
            toFloat(args) {
                if (args) {
                    return args.toFixed(2);
                }
            },
        },
    }
</script>
