import axios from '../utils/fetch'

export default {
    //财务管理商品列表
   financialCommodityByCondition(param) {
        return axios.get('/checkingCommodity/searchCommodities', { params: param })
    },

    //财务订单列表查询
    getFinancialOrderList(param) {
        return axios.get('/checkingResult/search', { params: param });
    },
    //匹配历史
    getFinancialOrderMatchHistory(param) {
        return axios.get('/checkingResult/selectMatchingRecordByCheckType', { params: param });
    },
    //支付记录
    getPayRecordDetail(param){
        return axios.get('/checkingResult/selectPayment', { params: param });
    },
    //开始匹配
    getMatchingRecordByCheckType() {
        return axios.post('/checkingResult/checking')
    },


}
