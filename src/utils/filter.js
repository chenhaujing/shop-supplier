
export default{
    //千分位方法,针对使用element-ui组件(比如 input输入框)不能直接使用过滤器,那么可以使用vue计算属性来处理价格显示
    formatMoney(data) {
        if (Number(data) === 0) {
            return '￥0.00';
        }
        let price_Num = Number(data).toFixed(2); //number对象；
        let price_int = price_Num.split('.')[0]; //整数部分
        let price_dec = price_Num.split('.')[1]; //小数部分
        let price = `￥${ price_int.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}.${price_dec}`;
        return price;
    },

}
