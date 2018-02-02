
import axios from './utils/fetch'

export default {

    /**
     * 获取用户权限
     */
    getUserPermission() {
        return axios.get('/account/isAdmin');
    },

    login(param) {
        return axios.post('/account/auth', param);
    },
    //获取用户名字
    getUserInfo(){
        return axios.get('/account/username/');
    },
    //获取跑马灯信息
    getMessage(){
        return axios.get('/notification/marqueeShow/');
    },
    //消息的获取
    getMessageCount(){
        return axios.get('/notification/getTotal/')
    },
    // 获取菜单
    getMenus(param) {
        return axios.get('/subaccount/findMenuPermission/');
    },
    // 获取所有权限
    getPermissions(param) {
        return axios.get('/subaccount/findPermissionByUser/');
    },
    // 获取所有权限-树状结构
    getAllPermissionsTree(param) {
        return axios.get('/subaccount/findButtonPermission/'+param);
    },

    //获取子账号列表
    getAccountList(param) {
        return axios.get('/subaccount/list', {params:param});
    },
    //新增账号接口
    addUser(param) {
        return axios.post('/subaccount/save',  param );
    },
    //启用禁用接口
    accountUpdataStatus(param){
        return axios.put('/subaccount/updateUserStatus',param)
    },
    //根据id查询管理员子账号详情接口
    getAccountById(id){
        return axios.get('/subaccount/details/'+id)
    },
    //更新管理员子账号接口
    updateAccountById(param){
        return axios.put('/subaccount',param)
    },
    //重置密码
    updataPass(param){
        return axios.put('/subaccount/updatePassword',param)
    },
     //获取角色下拉列表
    getRoleSelect(){
        return axios.get('/role/searchAllRole');
    },
    //角色列表
    getRoleList(param) {
        return axios.get('/role/search', {params:param});
    },
    // 角色创建
    createRole(param) {
        return axios.post('/role/create', param);
    },
    updateRole(param) {
        return axios.put('/role/update', param);
    },
    deleteRole(id) {
        return axios.delete('/role/delete/' + id);
    },
    getRoleById(id) {
        return axios.get('/role/get/'+id);
    },
    //获取用户手机号码
    getUserPhone() {
        return axios.get('/account/LoginPhone');
    },
    //获取供应商资质状态
    getSupplierState(param){
        return axios.get('/account/qualification/search/',{params:param})
    },
    //首页加载获取商品信息
    getCommodity(param){
        return axios.get('/comm/findApproval/',{params:param})
    },
    //获取供应商资质信息
    getSupplierAptitudeStatus(param){
        return axios.get('/account/qualification/getByAccountId?accountId='+param)
    },
    //获取供应商信息
    getBasicInfo(param){
        return axios.get('/account/search/',{params:param})
    },
    // 获取地区列表
    getAreaList(param) {
        return axios.get('/account/get/', { params: param });
    },
    //获取行业列表
    getIndustry(param) {
        return axios.get('/account/selectHangYeDict/');
    },
    // 获取银行列表
    getBanks(param) {
        return axios.get('/account/selectBank/');
    },

    //获取供应商
    getUserAccount(param) {
        return axios.get('/account/search0', { params: param });
    },
    //商品批量审核请求
    getbulk(param){
        return axios.post('/comm/audit/bulk/',{data:param});
    },
    //消息发送
    messageSend(param){
            return axios.post('/notification/createNotifi/', { data: param });
    },
    //退出登录

    logout() {
        return axios.post('/account/logout');
    },
    //提交供应商信息(编辑)
    submitSupplierInfo(data) {
        return axios.post('/account/save/',data);
    },
    /**
     * 获取供应商总数
     */
    getAccountNum() {
        return axios.get('/account/AccountNumber');
    },
    //删除供应商
    deleteSupplier(id) {
        return axios.delete('/account/delete/' + id);
    },
    //供应商列表查询
    getSupplierList(param) {
        return axios.get('/account/findAccount', { params: param });
    },
    //修改供应商状态
    /**
     *
     * 商品管理模块
     */
    //商品列表简易查询接口
    simplesearch(param) {
        return axios.get('/comm/simplesearch', { params: param });
    },
    getCommodityInfo(id) {
        return axios.get('/comm/get/' + id);
    },
    //商品详情查询---管理员
    getAdminCommodityInfo(id) {
        return axios.get('/comm/getAudit/' + id);
    },
    //新增商品
    newCommodity(param) {
        return axios.post('/comm/save/', { data: param });
    },
    //下架商品sku
    cancelCommoditySku(commodityId) {
        return axios.put('/comm/offShelves/' + commodityId);
    },
    //删除商品sku
    deleteCommoditySku(commodityId) {
        return axios.delete('/comm/delete/' + commodityId);
    },
    //根据商品条码查询商品信息接口
    findByCode69(code69) {
        return axios.get('/comm/findByCode69/' + code69);
    },
    //单个商品上架
    goodsShelves(id) {
        return axios.put('/comm/onShelves/' + id);
    },
    //获得商品品牌
    getCommodityBrand() {
        return axios.get('/commBrand/search');
    },


    //获取消息列表接口
    getMessageList(param) {
        return axios.get('/notification/getPage', { params: param });
    },

    /**
     * 商品标签模块
     */
    //查询商品标签
    getCommTag(accountId) {
        return axios.get('/commTag/search?supplierId=' + accountId);
    },

    /**
     * 计量规格模块
     */
    //查询商品单位
    getCommMeasureSpec(accountId) {
        return axios.get('/commMeasureSpec/searchCommMeasureSpec?supplierId=' + accountId);
    },

    /**
     * 商品单位模块
     */
    //查询商品单位
    getCommUnit(accountId) {
        return axios.get('/commUnit/search?supplierId=' + accountId);
    },

    /**
     * 箱规模块
     */
    //查询商品箱规
    // getCommCarton() {
    //     return axios.get('/commCarton/search');
    // },
    getCommCarton(accountId) {
        return axios.get('/commCarton/search?supplierId=' + accountId);

    },

    /**
     *商品管理模块
     */




    /**
     * 发票设置查询接口
     * */
    getInvoiceSetting() {
        return axios.get('/invoiceSetting/get');
    },
    /**
     * 发票设置接口
     * */
    invoiceUpdate(param) {
        return axios.put('/invoiceSetting/update', param)
    },
    /**
     * 商品类型查询
     */
    getCommodityCategory(param) {
        return axios.get('/commType/searchCommCategory', { params: param });
    },

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
     * 7,退款接口  点击确认退款  参数；   暂时没有接口，先用目前的替代 TODO；
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

    updateMessageStatus: function (param) {
        return axios.post('/notification/updateStatus/' + param);
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
     */
    searchOrderListAdmin(param) {
        return axios.get('/order/adminSearch', { params: param });
    },

    reviseLogicsInfo(param) {
        return axios.post('/order/updateLogisticInfoByOrderId', param);
    },

    getAdminOrderDetail(orderId) {
        return axios.get('/order/adminPurchase/' + orderId);
    },

    autoReceiveGoods(param) {
        return axios.post('/logistics/artificialAutomaticRecive', param);
    },

    /*
     * 供应商管理-运费规则设置模块
     *
     */

    // 获取配送地区物流运费规则
    getGeneralRules(param){
        return axios.get('/freightrules/queryAll', {params:param});
    },
    //根据id获取配送地区物流运费规则
    getLocalRuleById(id){
        return axios.get('/freightrules/query/'+id);
    },
    //切换默认运费规则的方法
    updateFreightRules(param){
        return axios.post('/account/updateFreightRules/'+param);
    },
    //新建通用规则
    createGeneralRules(param){
        return axios.post('/freightrules/insert', param);
    },
    //新建、编辑配送地区物流费用规则
    createOrUpdateLocalRules(id,param){
        return axios.post('/freightrules/update/'+id, param);
    },
    //库存管理接口
    inventorySearch(param) {
        return axios.get('/commInventory/search', { params: param });
    },
    //根据id获取库存信息
    getInventoryById(param) {
        return axios.get('/commInventory/getInventoryById/' + param);
    },
    //库存设置
    updateInventory(param) {
        return axios.post('/commInventory/updateInventory', param);
    },


};
