import axios from '../utils/fetch'

export default {
    //退换货列表查询接口
    getSalesReturnList(param) {
        return axios.get('/returnAndExchange/searchReturnItem', { params: param });
    },
    //退换货详情查询接口
    getReturnDetails(id) {
        return axios.get('/returnAndExchange/details/' + id);
    },

    //退换货审核接口 ---刘述
    setReturnAudit(param) {
        return axios.put('/returnAndExchange/audit', param);
    },
    //退换货审核接口   ----宁金鑫
    shopperCheck(param) {
        return axios.put('/returnAndExchange/audit', param)
    },
    //换货物流
    logistics(param) {
        return axios.post('/returnAndExchange/deliverGoods', param)
    },
    //获取物流公司
    getLogisticsName() {
        return axios.get('/dict/searchExpress');
    },

}
