import Vue from 'vue'

/* 简单说明：
 * 价格过滤器，1，千分位；2，人民币符号；3, 精确小数两位；
 *  elementui 属性不支持这种直接过滤器，所以需要这么调用；
 *		refundAudit.vue
 *     <template scope="scope">
 *        {{scope.row.appPrice|formatPrice}}
 *     </template>
 */

/*
 * 判断入参，是小数还是整数，然后精确两位；（需要number对象）
 * 处理整数部分，保留小数部分；
 * 最后的值需要 处理后的整数部分和小数部分拼接；
 */
Vue.filter('formatPrice', (args) => {
    if (Number(args) === 0) {
        return '￥0.00';
    }
    let price_Num = Number(args).toFixed(2); //number对象；
    let price_int = price_Num.split('.')[0]; //整数部分
    let price_dec = price_Num.split('.')[1]; //小数部分
    let price = `￥${ price_int.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}.${price_dec}`;
    return price;
})
