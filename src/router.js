import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
    // mode:'history',
    routes: [
        //  登录页
        { path: '/login', name: 'login', component: resolve => require(['pages/login/login.vue'], resolve) },
        { path: '/forgetPassword', component: resolve => require(['pages/login/forgetPassword.vue'], resolve) },
        //首页
        {
            path: '/',
            meta: { requireAuth: true },
            component: resolve => require(['./common/home'], resolve),
            children: [{
                path: '/homepage',
                meta: { requireAuth: true },
                component: resolve => require(['pages/main/homepage.vue'], resolve)
            },
                {
                    path: '/basicInfo',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/supplier/basicInfo.vue'], resolve)
                },
            ]
        },
        //供应商管理
        {
            path: '/supplierInfo',
            meta: { requireAuth: true },
            component: resolve => require(['./common/home'], resolve),
            children: [
                //管理员信息列表
                {
                    path: '/supplierInfoList',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/supplier/supplierInfoList.vue'], resolve)
                },
                //管理员编辑
                {
                    path: '/supplierInfoEdit',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/supplier/adminInfoEdit.vue'], resolve)
                },
                //管理员资质审核
                {
                    path: '/aptitudeAudit',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/supplier/aptitudeAudit.vue'], resolve)
                },
                //添加管理员
                {
                    path: '/addOneSupplier',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/supplier/addOneSupplier.vue'], resolve)
                },
                //管理员商品审核
                {
                    path: '/commodityAudit',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/supplier/commodityAudit.vue'], resolve)
                },
                //供应商编辑
                {
                    path: '/commonSupplierInfoEdit',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/supplier/commonSupplierInfoEdit.vue'], resolve)
                }
            ]
        },
        //订单管理
        {
            path: '/orderList',
            meta: { requireAuth: true },
            component: resolve => require(['./common/home'], resolve),
            children: [{
                path: '/orderList',
                meta: { requireAuth: true },
                component: resolve => require(['pages/order/orderList.vue'], resolve)
            },
                {
                    path: '/orderDetail',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/order/orderDetail.vue'], resolve)
                },
                // 订单确认详情页面；
                {
                    path: '/orderConfirmDetails',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/order/orderConfirmDetails.vue'], resolve)
                },
                {
                    path: '/adminOrderList',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/adminOrder/adminOrderList.vue'], resolve)
                },
                {
                    path: '/adminOrderDetail',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/adminOrder/adminOrderDetail.vue'], resolve)
                },
                // 填写物流信息页面，确认发货页面；
                // 订单 退款审核页面；
                {
                    path: '/refundAudit',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/order/refundAudit.vue'], resolve)
                },
                //换货列表(供应商)
                {
                    path: '/barterList',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/order/barterList.vue'], resolve)
                },
                //换货列表详情(管理员)
                {
                    path: '/adminBarterList',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/order/adminBarterList.vue'], resolve)
                },
                //换货列表详情
                {
                    path: '/barterListDetail',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/order/barterListDetail.vue'], resolve)
                },
                {
                    path: '/orderLogistics',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/order/orderLogistics.vue'], resolve)
                },
                {
                    path: '/deliverGoods',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/order/deliverGoods.vue'], resolve)
                },
                //供应商退货列表
                {
                    path: '/salesReturnList',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/order/salesReturnList.vue'], resolve)
                },
                //管理员退货列表
                {
                    path: '/adminSalesReturnList',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/adminOrder/adminSalesReturnList.vue'], resolve)
                },
                //退货审核详情
                {
                    path: '/salesReturnAuditDetails',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/order/salesReturnAuditDetails.vue'], resolve)
                }
            ]
        },
        //商品信息
        {
            path: '/commodityInfo',
            meta: {
                requireAuth: true
            },
            component: resolve => require(['./common/home'], resolve),
            children: [{
                path: '/commodityList',
                meta: { requireAuth: true },
                component: resolve => require(['pages/commodity/commodityList.vue'], resolve)
            },
                {
                    path: '/commodityInfo',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/commodity/commodityInfo.vue'], resolve)
                },
                {
                    path: '/commodityEdit',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/commodity/commodityEdit.vue'], resolve)
                },
                {
                    path: '/addCommodity',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/commodity/addCommodity.vue'], resolve)
                },
                //管理员 商品列表
                {
                    path: '/adminCommodityList',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/commodity/adminCommodityList.vue'], resolve)
                },
                //管理员 商品审核--商品详情
                {
                    path: '/commodityAuditInfo',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/commodity/commodityAuditInfo.vue'], resolve)
                },
            ]
        },
        //系统信息
        {
            path: '/systemInfo',
            meta: { requireAuth: true },
            component: resolve => require(['./common/home'], resolve),
            children: [{
                path: '/updatePassword',
                meta: { requireAuth: true },
                component: resolve => require(['pages/login/updatePassword.vue'], resolve)
            },
                {
                    path: '/systemAuxiliarySetting',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/systemManage/auxiliarySetting.vue'], resolve)
                },
                {
                    path: '/systemStaffList',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/systemManage/staffList.vue'], resolve)
                },
                {
                    path: '/systemAddStaff',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/systemManage/addStaff.vue'], resolve)
                },
                // 消息路由start
                {
                    path: '/messageList',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/messageManage/messageList.vue'], resolve)
                },
                {
                    path: '/systemStaffList',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/messageManage/messageList.vue'], resolve)
                },
                {
                    path: '/systemMessageDetail',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/messageManage/systemMessageDetail.vue'], resolve)
                },
                {
                    path: '/productCoupleBack',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/messageManage/productCoupleBack.vue'], resolve)
                },
                // 消息路由end
                {
                    path: '/incomeDetailList',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/billingDetails/incomeDetailList.vue'], resolve)
                },
                // 发送消息
                {
                    path: '/messageSend',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/supplier/messageSend.vue'], resolve)
                },
                // 配送范围
                {
                    path: '/systemDistributionScope',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/systemManage/distributionScope.vue'], resolve)
                },
                /* 运费规则配置 */
                {
                    path: '/systemFreightRules',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/systemManage/systemFreightRules.vue'], resolve)
                },
                //账户设置
                {
                    path: '/systemAccountSetting',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/systemManage/accountSetting.vue'], resolve)
                },
                {
                    path: '/systemAddAccount',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/systemManage/addAccount.vue'], resolve)
                },
                {
                    path: '/systemUpdateAccount',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/systemManage/updateAccount.vue'], resolve)
                },
                //角色设置
                {
                    path: '/systemRoleSetting',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/systemManage/roleSetting.vue'], resolve)
                },
                {
                    path: '/systemCreateRole',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/systemManage/roleSettingCreate.vue'], resolve)
                },
                {
                    path: '/systemEditRole',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/systemManage/roleSettingEdit.vue'], resolve)
                },
                //售后设置
                {
                    path: '/afterSetting',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/systemManage/afterSetting.vue'], resolve)
                },

            ]
        },
        //账户管理
        {
            path: '/settlementInfo',
            meta: {
                requireAuth: true
            },
            component: resolve => require(['./common/home'], resolve),
            children: [
                // 已结算
                {
                    path: '/settlementList',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/billingDetails/settlementList.vue'], resolve)
                },
                // 已结算详情路由
                {
                    path: '/settlementListDetail',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/billingDetails/settlementListDetail.vue'], resolve)
                },
                // 待结算路由
                {
                    path: '/unSettlementList',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/billingDetails/unSettlementList.vue'], resolve)
                },
                // 待结算路由详情
                {
                    path: '/unSettlementListDetail',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/billingDetails/unSettlementListDetail.vue'], resolve)
                },
            ]
        },
        //库存管理模块
        {
            path: '/commInventoryManage', //
            meta: {
                requireAuth: true
            },
            component: resolve => require(['./common/home'], resolve),
            children: [{
                path: '/commInventoryManage',
                meta: { requireAuth: true },
                component: resolve => require(['pages/inventoryManage/commInventoryManage.vue'], resolve)
            }, ]
        },
        // 配置财务管理模块
        {
            path: '/financialManageList',
            meta: {
                requireAuth: true
            },
            component: resolve => require(['./common/home'], resolve),
            children: [{
                path: '/financialManageList',
                meta: { requireAuth: true },
                component: resolve => require(['pages/financialManage/financialManageList.vue'], resolve)
            },
                {
                    path: '/financialManageDetails',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/financialManage/financialManageDetails.vue'], resolve)
                },
                {
                    path: '/financialOrderList',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/financialManage/financialOrderList.vue'], resolve)
                },
                {
                    path: '/financialOrderMatchHistory',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/financialManage/financialOrderMatchHistory.vue'], resolve)
                },
                {
                    path: '/financialPaymentRecord',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/financialManage/financialPaymentRecord.vue'], resolve)
                },
                {
                    path: '/financialCommodity',
                    meta: { requireAuth: true },
                    component: resolve => require(['pages/financialManage/financialCommodity.vue'], resolve)
                }
            ],
        },
        // 手机h5页面；
        {
            path: '/confirmReceipt',
            component: resolve => require(['pages/confirmReceipt/confirmReceipt.vue'], resolve)
        },
        // 手机页面，拒收理由添加；
        {
            path: '/confirmReceiptRefuse',
            component: resolve => require(['pages/confirmReceipt/confirmReceiptRefuse.vue'], resolve)
        },
        // 扫描后，404页面；
        {
            path: '/confirmRecipt404',
            component: resolve => require(['pages/confirmReceipt/confirmRecipt404.vue'], resolve)
        },
    ]
});

// router.beforeEach((to, from, next) => {
//     let token = window.localStorage.getItem('token')
//     if (to.matched.some(res => res.meta.requireAuth)) {
//         if (token) {
//             next()
//         } else {
//             // 没登录则跳转到登录界面
//             next({
//                 path: '/login',
//                 query: { redirect: to.fullPath }
//             })
//         }
//     } else {
//         next()
//     }
// })

export default router;
