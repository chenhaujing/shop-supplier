import axios from '../utils/fetch'
export default {


    /**
     * 账户结算明细列表已结算接口
     */
    getUnsettlementList(param) {
        return axios.get('billingDetails/orderMoneyRecords/', { params: param });
    },

    /**
     *收入明细列表接口（普通搜索）
     */
    SimSearchPurchasesLow(param) {
        return axios.get('/order/account/PurchasesLow', { params: param });
    },

    /**
     *收入明细列表接口（高级搜索）
     */
    multiPurchasesHigh(param) {
        return axios.get('/order/account/PurchasesHigh', { params: param });
    },

    /**
     *根据供应商ID查询用户余额接口
     */
    getAccountBalanceByAccountId(accountId) {
        return axios.get('/account/selectAccountBalance');
    },

    /**
     *根据供应商ID查询供应商结算金额
     */
    getIncomeByAccountId(accountId) {
        return axios.get('/order/findincome');
    },

    /**
     *账户结算明细列表中-已结算订单详情接口
     */
    getUnsettlementDetails(param) {
        return axios.get('/billingDetails/orderMoneyRecord/searchPurchasesByRecordId', { params: param });
    },

    /**
     * 账户结算明细列表中的已结算订单详情接口-根据订单编号查看订单详情列表
     */
    getUnsettlementDetailsByOrderId(orderId, param) {
        return axios.get('/orderItem/purchase/' + orderId + '/PurchaseItems', { params: param });
    },

    //---------------------------------------------------------------------------------

    /**
     *账户结算明细列表中-已结算订单详情接口
     */
    getSettlementDetails(param) {
        return axios.get('/billingDetails/orderMoneyRecord/searchPurchasesByRecordId', { params: param });
    },

    /**
     * 账户结算明细列表中的已结算订单详情接口-根据订单编号查看订单详情列表
     */
    getSettlementDetailsByOrderId(orderId, param) {
        return axios.get('/orderItem/purchase/' + orderId + '/PurchaseItems/', { params: param });
    },

    /**
     * 账户结算明细列表结算接口
     */
    getSettlementList(param) {
        return axios.get('billingDetails/orderMoneyRecords/', { params: param });
    },

    /*
     *财务管理模块接口；
     * 1. 供应商结算明细列表   通过条件获取 表格数据；
     * 2,已结算金额
     * 3,待结算金额  日期；
     * 4,结算 接口； {recorderId:xx,serialNumber:xx}
     * 5,列表导出接口；window.location.href;
     * 6,详情页面， 获取表格数据；
     * 7,根据订单号，获取订单详情；
     */

    getBillingList(param) {
        return axios.get('/billingDetails/search', { params: param });
    },

    getSettledMoney(param) {
        return axios.get('/billingDetails/orderMoneyRecord/settlement', { params: param });
    },

    getUnsettledMoney(param) {
        return axios.get('/billingDetails/orderMoneyRecord/unsettled', { params: param });
    },

    settleAccount(param) {
        return axios.post('/billingDetails/orderMoneyRecord/updateState', param);
    },

    getDetails(param) {
        return axios.get('/billingDetails/orderMoneyRecord/searchPurchasesByRecordId', { params: param });

    },

    getOrderDetails(id, param) {
        return axios.get('orderItem/purchase/' + id + '/PurchaseItems', { params: param });
    },




}
