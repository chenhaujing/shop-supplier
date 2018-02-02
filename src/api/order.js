import axios from '../utils/fetch'
/*
 * 订单列表模块；
 * 1.查询打印商品信息接口  入口： 确定发货->打印详情接口； 需要传入参数 orderId
 * 2,生成二维码接口  入口：确认发货-> 下一步 -> 物流配送 -> 扫码输入；（暂时不做），
 * 3,查询拒收订单原因接口  入口：点击已拒收    参数： orderId;
 * 4，物流跟踪   入口： 查看物流（当是物流公司的时候，显示这个部分） 需要传入快递单号； {num:1111}
 * 5,确认发货，根据当前id，获取订单信息；
 * search值需要 params;
 * path参数需要字符串拼接；
 * 6,查询 取消订单接口： 点击 已取消，  参数  orderId;
 * 7,退款接口  点击确认退款  参数；
 * 8,搜索订单接口：
 * 9,获取物流公司名字 接口；
 * 10,更新订单消息通知状态；
 * 11, 扫码收货 h5页面  - 确认收货接口，传入{orderId: id}
 * 12, 扫码收货 h5页面 - 拒绝收货接口； 参数；{orderId,refuseReason,refuseImgUrlA...};
 * 13，退款；
 * 14,确认发货接口；
 * 15,刷新重新获取二维码(当生成二维码失败时候，用户手动刷新，生成二维码；)
 * 16,订单详情获取 发票详情；
 */
export default {
    searchPrintItems(param) {
        return axios.get('/order/searchPrintItems', { params: param });
    },

    scanRefuseOrderReason(param) {
        return axios.get('/order/scanRefuseOrderReason/' + param);
    },

    trackLogistics(param) {
        return axios.get('/logistics/' + param);
    },

    getOrderById(id) {
        return axios.get('/order/purchase/' + id);
    },

    scanCancelReason(param) {
        return axios.get('/order/scanCancelReason/' + param);
    },

    backPay(id) {
        return axios.post('/order/refund/' + id);
    },

    searchOrderList(param) {
        return axios.get('/order/search', { params: param });
    },

    getLogisticsName() {
        return axios.get('/dict/searchExpress');
    },

    sweepReceiving(param) {
        return axios.post('/order/sweepReceiving', param);
    },

    sweepRefusing(param) {
        return axios.post('/order/refuseOrder', param);
    },

    deliverGoods(id, param) {
        return axios.post('/order/deliverGoods/' + id, param);
    },

    regenerateQr(param) {
        return axios.post('/order/createReceivingQrcode', param);
    },

    getInvoiceInfos(param) {
        return axios.get('/order/receiptItem', { params: param });
    },

    /*
     * 管理员账号下面的订单管理模块；
     * 1.管理员订单列表接口
     * 2,修改物流信息接口  orderId,logisticsCompany,orderShipmentNumber
     * 3. 管理员订单详情接口；
     * 4. 自动收货；传入orderId;
     * 5. 更新订单信息阅读状态；
     *
     */

    reviseLogicsInfo(param) {
        return axios.post('/order/updateLogisticInfoByOrderId', param);
    },

    getAdminOrderDetail(orderId) {
        return axios.get('/order/adminPurchase/' + orderId);
    },

    autoReceiveGoods(param) {
        return axios.post('/logistics/artificialAutomaticRecive', param);
    },

    updateMessageStatus(param) {
        return axios.post('/notification/updateStatus/' + param);
    },

    /*
     * 退换货部分：
     * 1. 换货列表查询
     * 2.换货详情接口
     * 3.退款审核接口，同意传入 10，拒绝传入11；拒绝原因必填； {status: 11||10 ,storeRefuseReason: '',orderId:''}
     * 4. （拒收待审核,付款已取消） 退款详情接口
     */
    getBarterListArr(param) {
        return axios.get('/returnAndExchange/exchangeSearch', { params: param })
    },

    getBarterListDeatil(param) {
        return axios.get('/returnAndExchange/details/' + param)
    },

    auditRefund(param) {
        return axios.put('/order/checkApplication', param)
    },

    refuseAuditDetail(orderId) {
        return axios.get('/order/refuseOrderDetails/' + orderId)
    },

}
