import axios from '../utils/fetch'

export default {
    /**
     * 首页接口
     */
    //1.金额统计接口
    getMoneyCount(param) {
        return axios.get('billingDetails/countOrderMoneyRecords/', { params: param });
    },
    //2.各类订单数量统计接口
    getOrderCount() {
        return axios.get('/order/countOrderNumByOrderStatus/');
    },
    //3.商品数量统计
    getCommodityCount() {
        return axios.get('/comm/countDetail/');
    },
    //4.刷新库存量
    getInventoryCount() {
        return axios.get('/comm/updateInventory/')
    },
    //5.查询登录供应商的资质状态
    getQualificationStatus(param) {
        return axios.get('/account/qualification/getAccountQualificationStatus/', { params: param });
    },
    //6.查询是否已读
    getQualificationIsRead(param) {
        return axios.get('/account/qualification/updateQualificationMessageRead', { params: param })
    },
}
