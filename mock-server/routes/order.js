var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/**
 * 供应商订单列表
 */
router.get('/search', function(req, res) {
    var order = {
        "code": 1,
        "message": "成功",
        "data": {
            "pageNum": 1,
            "pageSize": 1,
            "size": 1,
            "startRow": 1,
            "endRow": 1,
            "total": 2,
            "pages": 1,
            "list": [{
                    "orderId": "201710232101380318992986912121",
                    "orderReceiverName": "段誉",
                    "orderReceiverMobile": "15481996244",
                    "orderStatus": 2,
                    "orderPrice": "0.20",
                    "orderCreateTime": "2017-10-23 21:01:39",
                    "orderPaymentTime": null,
                    "orderPaymentMethod": 1,
                    "orderPaymentNum": "",
                    "updateTime": "2017-10-23 21:01:39",
                    "orderPostage": "￥0.01",
                    "storeName": "透云供应商"
                },
                {
                    "orderId": "201710232101380318992986912121",
                    "orderReceiverName": "段誉xxx",
                    "orderReceiverMobile": "15481996244",
                    "orderStatus": 3,
                    "orderPrice": "0.20",
                    "orderCreateTime": "2017-10-23 21:01:39",
                    "orderPaymentTime": null,
                    "orderPaymentMethod": 1,
                    "orderPaymentNum": "112121212",
                    "updateTime": "2017-10-23 21:01:39",
                    "orderPostage": "￥0.01",
                    "storeName": "透云供应商"
                }
            ]
        }
    }
    res.json(order)
});

/**
 * 供应商订单详情
 */
router.get('/purchase/:orderId', function(req, res) {
    var orderItem = {
        "code": 1,
        "message": "成功",
        "data": {
            "orderId": "201710232101380318992986912121",
            "orderReceiverName": "段誉",
            "orderAddress": "陕西省西安市",
            "orderReceiverMobile": "15481996244",
            "orderStatus": 3,
            "orderPrice": "0.20",
            "orderCreateTime": "2017-10-23 21:01:39",
            "orderPaymentMethod": 1,
            "orderPaymentTime": null,
            "orderPaymentNum": "",
            "orderShipMethod": 1,
            "drawbackTime": null,
            "distributorName": '徐良',
            "distributorMobile": 18309226683,
            "logisticsCompany": null,
            "orderShipmentNumber": null,
            "orderPostage": "￥0.01",
            "purchaseItemVoList": [{
                "goodsAttribute": "商品属性",
                "goodsId": 530,
                "code69": "691000000002",
                "goodsNumber": 10,
                "goodsTatolPrice": "0.20",
                "goodsImage": "http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpg%5Cthumbnail%5Cb7ecd767fa0543e8abbe14da00241303.jpg",
                "goodsName": "透云商品B",
                "brandName": "葱妈妈",
                "goodsUnitPrice": "0.02"
            }]
        }
    }
    res.json(orderItem);
});

/**
 * 供应商订单列表导出
 * 括号里的注释实际不显示
 */
router.get('/export', function(req, res) {
    var result = {
        "code": 0,
        "message": "成功(注：供应商订单列表导出)",
        "data": null
    }
    res.json(result)
});
/**
 * 订单发货接口
 * 括号里的注释实际不显示
 */
router.post('/deliverGoods/:orderId', function(req, res) {
    var result = {
        "code": 1,
        "message": "成功(注：发货接口)",
        "data": null
    }
    res.json(result)
});

/**
 * 删除订单，批量删除和单个删除
 * 括号里的注释实际不显示
 */
router.post('/delete/purchases', function(req, res) {
    var result = {
        "code": 0,
        "message": "成功(注：删除订单)",
        "data": null
    }
    res.json(result)
});

/**
 * 账户收入明细查询(高级查询)
 */
router.get('/account/PurchasesHigh', function(req, res) {
    var searchHigh = {
        "code": 1,
        "message": "成功",
        "data": {
            "pageNum": 1,
            "pageSize": 10,
            "size": 10,
            "startRow": 0,
            "endRow": 0,
            "total": 18,
            "pages": 2,
            "list": [{
                    "orderId": "201710231701536432819504913223",
                    "orderReceiverName": "测试刘扬西安",
                    "orderReceiverMobile": "13062688672",
                    "orderStatus": 4,
                    "orderPrice": "0.02",
                    "orderSettlemePrice": "0.01",
                    "orderCreateTime": "2017-10-23 17:01:54",
                    "orderPaymentTime": "2017-10-23 18:07:07",
                    "orderPaymentNum": "2017102321001004630298644261",
                    "orderPaymentMethod": 1,
                    "orderPostage": "0.01"
                },
                {
                    "orderId": "201710231526213479095139908766",
                    "orderReceiverName": "测试刘扬西安",
                    "orderReceiverMobile": "13062688672",
                    "orderStatus": 4,
                    "orderPrice": "0.02",
                    "orderSettlemePrice": "0.01",
                    "orderCreateTime": "2017-10-23 15:26:21",
                    "orderPaymentTime": "2017-10-23 15:26:30",
                    "orderPaymentNum": "2017102321001004630298573753",
                    "orderPaymentMethod": 1,
                    "orderPostage": "0.01"
                },
                {
                    "orderId": "201710231507468524848839236824",
                    "orderReceiverName": "测试刘扬西安",
                    "orderReceiverMobile": "13062688672",
                    "orderStatus": 4,
                    "orderPrice": "0.02",
                    "orderSettlemePrice": "0.01",
                    "orderCreateTime": "2017-10-23 15:07:47",
                    "orderPaymentTime": "2017-10-23 15:07:54",
                    "orderPaymentNum": "2017102321001004630298530406",
                    "orderPaymentMethod": 1,
                    "orderPostage": "0.01"
                },
                {
                    "orderId": "201710231505070244119617101758",
                    "orderReceiverName": "测试刘扬西安",
                    "orderReceiverMobile": "13062688672",
                    "orderStatus": 4,
                    "orderPrice": "0.02",
                    "orderSettlemePrice": "0.01",
                    "orderCreateTime": "2017-10-23 15:05:07",
                    "orderPaymentTime": "2017-10-23 15:05:17",
                    "orderPaymentNum": "2017102321001004630298571718",
                    "orderPaymentMethod": 1,
                    "orderPostage": "0.01"
                },
                {
                    "orderId": "201710231457044854104999637021",
                    "orderReceiverName": "测试刘扬西安",
                    "orderReceiverMobile": "13062688672",
                    "orderStatus": 4,
                    "orderPrice": "0.02",
                    "orderSettlemePrice": "0.01",
                    "orderCreateTime": "2017-10-23 14:57:05",
                    "orderPaymentTime": "2017-10-23 14:57:19",
                    "orderPaymentNum": "2017102321001004630298555654",
                    "orderPaymentMethod": 1,
                    "orderPostage": "0.01"
                },
                {
                    "orderId": "201710231453140204179042737081",
                    "orderReceiverName": "测试刘扬西安",
                    "orderReceiverMobile": "13062688672",
                    "orderStatus": 4,
                    "orderPrice": "0.02",
                    "orderSettlemePrice": "0.01",
                    "orderCreateTime": "2017-10-23 14:53:15",
                    "orderPaymentTime": "2017-10-23 14:53:40",
                    "orderPaymentNum": "2017102321001004630298501286",
                    "orderPaymentMethod": 1,
                    "orderPostage": "0.01"
                },
                {
                    "orderId": "201710201829178698752059626429",
                    "orderReceiverName": "测试刘扬西安",
                    "orderReceiverMobile": "13062688672",
                    "orderStatus": 4,
                    "orderPrice": "0.02",
                    "orderSettlemePrice": "0.01",
                    "orderCreateTime": "2017-10-20 18:29:17",
                    "orderPaymentTime": "2017-09-20 18:29:44",
                    "orderPaymentNum": "2017102021001004630297007504",
                    "orderPaymentMethod": 1,
                    "orderPostage": "0.01"
                },
                {
                    "orderId": "201710201446077169903728053800",
                    "orderReceiverName": "测试刘扬西安",
                    "orderReceiverMobile": "13062688672",
                    "orderStatus": 4,
                    "orderPrice": "0.02",
                    "orderSettlemePrice": "0.01",
                    "orderCreateTime": "2017-10-20 14:46:07",
                    "orderPaymentTime": "2017-09-20 14:46:17",
                    "orderPaymentNum": "2017102021001004630296884503",
                    "orderPaymentMethod": 1,
                    "orderPostage": "0.01"
                },
                {
                    "orderId": "201710201427197766999767617388",
                    "orderReceiverName": "测试刘扬西安",
                    "orderReceiverMobile": "13062688672",
                    "orderStatus": 4,
                    "orderPrice": "0.02",
                    "orderSettlemePrice": "0.01",
                    "orderCreateTime": "2017-10-20 14:27:20",
                    "orderPaymentTime": "2017-09-20 14:28:25",
                    "orderPaymentNum": "2017102021001004630296895041",
                    "orderPaymentMethod": 1,
                    "orderPostage": "0.01"
                },
                {
                    "orderId": "201710201406191485015504591989",
                    "orderReceiverName": "测试刘扬西安",
                    "orderReceiverMobile": "13062688672",
                    "orderStatus": 4,
                    "orderPrice": "0.02",
                    "orderSettlemePrice": "0.01",
                    "orderCreateTime": "2017-10-20 14:06:20",
                    "orderPaymentTime": "2017-09-20 14:06:30",
                    "orderPaymentNum": "2017102021001004630296847746",
                    "orderPaymentMethod": 1,
                    "orderPostage": "0.01"
                }
            ],
            "prePage": 0,
            "nextPage": 0,
            "isFirstPage": false,
            "isLastPage": false,
            "hasPreviousPage": false,
            "hasNextPage": false,
            "navigatePages": 0,
            "navigatepageNums": null,
            "navigateFirstPage": 0,
            "navigateLastPage": 0,
            "lastPage": 0,
            "firstPage": 0
        }
    }
    res.json(searchHigh)
});

/**
 * 账户收入明细查询(普通查询)
 */
router.get('/account/PurchasesLow', function(req, res) {
    var searchLow = {
        "code": 1,
        "message": "成功",
        "data": {
            "pageNum": 1,
            "pageSize": 10,
            "size": 10,
            "startRow": 0,
            "endRow": 0,
            "total": 18,
            "pages": 2,
            "list": [{
                    "orderId": "201710231701536432819504913223",
                    "orderReceiverName": "测试刘扬西安",
                    "orderReceiverMobile": "13062688672",
                    "orderStatus": 4,
                    "orderPrice": "0.02",
                    "orderSettlemePrice": "0.01",
                    "orderCreateTime": "2017-10-23 17:01:54",
                    "orderPaymentTime": "2017-10-23 18:07:07",
                    "orderPaymentNum": "2017102321001004630298644261",
                    "orderPaymentMethod": 1,
                    "orderPostage": "0.01"
                },
                {
                    "orderId": "201710231526213479095139908766",
                    "orderReceiverName": "测试刘扬西安",
                    "orderReceiverMobile": "13062688672",
                    "orderStatus": 4,
                    "orderPrice": "0.02",
                    "orderSettlemePrice": "0.01",
                    "orderCreateTime": "2017-10-23 15:26:21",
                    "orderPaymentTime": "2017-10-23 15:26:30",
                    "orderPaymentNum": "2017102321001004630298573753",
                    "orderPaymentMethod": 1,
                    "orderPostage": "0.01"
                },
                {
                    "orderId": "201710231507468524848839236824",
                    "orderReceiverName": "测试刘扬西安",
                    "orderReceiverMobile": "13062688672",
                    "orderStatus": 4,
                    "orderPrice": "0.02",
                    "orderSettlemePrice": "0.01",
                    "orderCreateTime": "2017-10-23 15:07:47",
                    "orderPaymentTime": "2017-10-23 15:07:54",
                    "orderPaymentNum": "2017102321001004630298530406",
                    "orderPaymentMethod": 1,
                    "orderPostage": "0.01"
                },
                {
                    "orderId": "201710231505070244119617101758",
                    "orderReceiverName": "测试刘扬西安",
                    "orderReceiverMobile": "13062688672",
                    "orderStatus": 4,
                    "orderPrice": "0.02",
                    "orderSettlemePrice": "0.01",
                    "orderCreateTime": "2017-10-23 15:05:07",
                    "orderPaymentTime": "2017-10-23 15:05:17",
                    "orderPaymentNum": "2017102321001004630298571718",
                    "orderPaymentMethod": 1,
                    "orderPostage": "0.01"
                },
                {
                    "orderId": "201710231457044854104999637021",
                    "orderReceiverName": "测试刘扬西安",
                    "orderReceiverMobile": "13062688672",
                    "orderStatus": 4,
                    "orderPrice": "0.02",
                    "orderSettlemePrice": "0.01",
                    "orderCreateTime": "2017-10-23 14:57:05",
                    "orderPaymentTime": "2017-10-23 14:57:19",
                    "orderPaymentNum": "2017102321001004630298555654",
                    "orderPaymentMethod": 1,
                    "orderPostage": "0.01"
                },
                {
                    "orderId": "201710231453140204179042737081",
                    "orderReceiverName": "测试刘扬西安",
                    "orderReceiverMobile": "13062688672",
                    "orderStatus": 4,
                    "orderPrice": "0.02",
                    "orderSettlemePrice": "0.01",
                    "orderCreateTime": "2017-10-23 14:53:15",
                    "orderPaymentTime": "2017-10-23 14:53:40",
                    "orderPaymentNum": "2017102321001004630298501286",
                    "orderPaymentMethod": 1,
                    "orderPostage": "0.01"
                },
                {
                    "orderId": "201710201829178698752059626429",
                    "orderReceiverName": "测试刘扬西安",
                    "orderReceiverMobile": "13062688672",
                    "orderStatus": 4,
                    "orderPrice": "0.02",
                    "orderSettlemePrice": "0.01",
                    "orderCreateTime": "2017-10-20 18:29:17",
                    "orderPaymentTime": "2017-09-20 18:29:44",
                    "orderPaymentNum": "2017102021001004630297007504",
                    "orderPaymentMethod": 1,
                    "orderPostage": "0.01"
                },
                {
                    "orderId": "201710201446077169903728053800",
                    "orderReceiverName": "测试刘扬西安",
                    "orderReceiverMobile": "13062688672",
                    "orderStatus": 4,
                    "orderPrice": "0.02",
                    "orderSettlemePrice": "0.01",
                    "orderCreateTime": "2017-10-20 14:46:07",
                    "orderPaymentTime": "2017-09-20 14:46:17",
                    "orderPaymentNum": "2017102021001004630296884503",
                    "orderPaymentMethod": 1,
                    "orderPostage": "0.01"
                },
                {
                    "orderId": "201710201427197766999767617388",
                    "orderReceiverName": "测试刘扬西安",
                    "orderReceiverMobile": "13062688672",
                    "orderStatus": 4,
                    "orderPrice": "0.02",
                    "orderSettlemePrice": "0.01",
                    "orderCreateTime": "2017-10-20 14:27:20",
                    "orderPaymentTime": "2017-09-20 14:28:25",
                    "orderPaymentNum": "2017102021001004630296895041",
                    "orderPaymentMethod": 1,
                    "orderPostage": "0.01"
                },
                {
                    "orderId": "201710201406191485015504591989",
                    "orderReceiverName": "测试刘扬西安",
                    "orderReceiverMobile": "13062688672",
                    "orderStatus": 4,
                    "orderPrice": "0.02",
                    "orderSettlemePrice": "0.01",
                    "orderCreateTime": "2017-10-20 14:06:20",
                    "orderPaymentTime": "2017-09-20 14:06:30",
                    "orderPaymentNum": "2017102021001004630296847746",
                    "orderPaymentMethod": 1,
                    "orderPostage": "0.01"
                }
            ],
            "prePage": 0,
            "nextPage": 0,
            "isFirstPage": false,
            "isLastPage": false,
            "hasPreviousPage": false,
            "hasNextPage": false,
            "navigatePages": 0,
            "navigatepageNums": null,
            "navigateFirstPage": 0,
            "navigateLastPage": 0,
            "lastPage": 0,
            "firstPage": 0
        }
    }
    res.json(searchLow)
});

/**
 * 根据商户ID查询订单状态，并计算总金额
 */
router.get('/findincome', function(req, res) {
    var result = {
        "code": 1,
        "message": "成功",
        "data": "0.36"
    }
    res.json(result)
});
/**
 * 添加拒收货信息
 * 括号里的注释实际不显示
 */
router.post('/refuseOrder', function(req, res) {
    var result = {
        "code": 0,
        "message": "成功(注：填写拒收信息)",
        "data": null
    }
    res.json(result)
});

/**
 * 根据订单ID获取该订单的拒收原因
 */
router.get('/scanRefuseOrderReason/:orderId', function(req, res) {
    var scanRefuseOrderReason = {
        "code": 1,
        "message": "成功",
        "data": {
            "refuseType": "商品有破损",
            "refuseReason": "还好方法",
            "refuseTime": "2017-10-23 09:41:16",
            "refuseImgUrl": [
                "http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/png%5C272fc2a37e6642268d28b32d8678e469.PNG"
            ]
        }
    }
    res.json(scanRefuseOrderReason)
});

/**
 * 新增取消订单原因
 * 括号里的注释实际不显示
 */
router.post('/insertCancelReason', function(req, res) {
    var result = {
        "code": 0,
        "message": "成功(注：新增取消订单原因)",
        "data": null
    }
    res.json(result)
});

/**
 * 查看取消订单原因
 */
router.get('/scanCancelReason/:orderId', function(req, res) {
    var scanCancelReason = {
        "code": 1,
        "message": "成功",
        "data": {
            "cancelType": "商品价格变化",
            "orderCancelReason": "和经济合同法"
        }
    }
    res.json(scanCancelReason)
});

/**
 * 更改物流信息
 * 括号里的注释实际不显示
 */
router.post('/updateLogisticInfoByOrderId', function(req, res) {
    var result = {
        "code": 1,
        "message": "成功(注：更改物流信息)",
        "data": null
    }
    res.json(result)
});

/**
 * 统计商品销售量接口
 * 统计多个商品销量时goodsId以,（半角逗号）隔开传入
 * 统计一个则直接传入goodsId
 */
router.get('/countOrderNum/:goodsId', function(req, res) {
    var countOrderNum = {
        "code": 1,
        "message": "成功",
        "data": {
            "goodsCount": [
                "89",
                "75"
            ]
        }
    }
    res.json(countOrderNum)
});

/**
 * 管理员订单列表
 */
router.get('/adminSearch', function(req, res) {
    var adminSearch = {
        "code": 1,
        "message": "成功",
        "pageNum": 1,
        "pageSize": 1,
        "size": 1,
        "startRow": 1,
        "endRow": 1,
        "total": 2,
        "pages": 1,
        "data": {
            "list": [{
                    "orderId": "201710112134369430978894870170",
                    "orderReceiverName": "农夫山泉有点甜xxx",
                    "orderReceiverMobile": "15000201277",
                    "orderStatus": 2,
                    "orderPrice": "826.80",
                    "orderCreateTime": "2017-10-11 21:34:36",
                    "orderPaymentTime": null,
                    "orderPaymentMethod": null,
                    "orderPaymentNum": "",
                    "updateTime": "2017-10-24 10:19:28",
                    "orderPostage": "包邮",
                    "storeName": "上海颂祺电子商务有限公1司"
                },
                {
                    "orderId": "201710112134369430978894870170",
                    "orderReceiverName": "农夫山泉有点甜xxx",
                    "orderReceiverMobile": "15000201277",
                    "orderStatus": 19,
                    "orderPrice": "826.80",
                    "orderCreateTime": "2017-10-11 21:34:36",
                    "orderPaymentTime": null,
                    "orderPaymentMethod": null,
                    "orderPaymentNum": "",
                    "updateTime": "2017-10-24 10:19:28",
                    "orderPostage": "包邮",
                    "storeName": "1上海颂祺电子商务有限公1司"
                },
                {
                    "orderId": "201710112134369430978894870172",
                    "orderReceiverName": "农夫山泉有点甜111",
                    "orderReceiverMobile": "15000201277",
                    "orderStatus": 3,
                    "orderPrice": "826.80",
                    "orderCreateTime": "2017-10-11 21:34:36",
                    "orderPaymentTime": null,
                    "orderPaymentMethod": 2,
                    "orderPaymentNum": "12312312",
                    "updateTime": "2017-10-24 10:19:28",
                    "orderPostage": "包邮",
                    "storeName": "上海颂祺电子商务有限公1司"
                },
            ]
        }
    }
    res.json(adminSearch)
});

/**
 * 管理员导出订单列表
 * 括号里的注释实际不显示
 */
router.get('/adminExport', function(req, res) {
    var result = {
        "code": 0,
        "message": "成功(注：管理员导出订单列表)",
        "data": null
    }
    res.json(result)
});
/**
 * 管理员根据订单ID获取订单详情
 */
router.get('/adminPurchase/:orderId', function(req, res) {
    var adminFindOrderItemById = {
        "code": 1,
        "message": "成功",
        "data": {
            "orderId": "201710112134369430978894870170",
            "orderReceiverName": "农夫山泉有点甜",
            "orderAddress": "纪蕰路90号附近",
            "orderReceiverMobile": "15000201277",
            "orderStatus": 3,
            "orderPrice": "826.80",
            "orderCreateTime": "2017-10-11 21:34:36",
            "orderPaymentMethod": null,
            "orderPaymentTime": null,
            "orderPaymentNum": "",
            "orderShipMethod": 1,
            "drawbackTime": null,
            "distributorName": '徐良',
            "distributorMobile": '18309226683',
            "logisticsCompany": null,
            "orderShipmentNumber": null,
            "orderPostage": "包邮",
            "purchaseItemVoList": [{
                "goodsAttribute": "(（2.5L+1L）*瓶）/箱",
                "goodsId": 88,
                "code69": "6921669811032",
                "goodsNumber": 12,
                "goodsTatolPrice": "826.80",
                "goodsImage": "http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpg/thumbnail/6471203a42bc4e5daa91ed36f518f532.jpg",
                "goodsName": "滴露柠檬衣物除菌液",
                "brandName": "滴露",
                "goodsUnitPrice": "68.90"
            }]
        }
    }
    res.json(adminFindOrderItemById)
});

/*下单*/
router.post('/createPurchase', function(req, res) {
    var order = {
        'code': 1,
        'message': '成功',
        'data': {
            'orderId': '1710241023487809587917784606',
            'totalMoney': 0.03
        }
    }
    res.json(order);
});

/**
 * 查询打印商品条目接口
 */
router.get('/searchPrintItems', function(req, res) {
    var searchPrintItems = {
        "code": 1,
        "message": "成功",
        "data": {
            "providerName": "上海颂祺电子商务有限公司",
            "orderId": "201710112134369430978894870170",
            "customer": "农夫山泉有点甜",
            "customerPhone": "15000201277",
            "receivingAddress": "纪蕰路90号附近",
            "orderCreateTime": 1507728876000,
            "orderCreateTimeStr": "2017年10月11日",
            "totalPrice": 826.8,
            "totalPriceFormat": "826.80",
            "totalPriceCN": "捌佰贰拾陆元捌角",
            "qrcodeUrl": 'http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpg%5Cthumbnail%5Cb7ecd767fa0543e8abbe14da00241303.jpg',
            "qrcodeStatus": 0,
            "orderStatus": 19,
            "orderPostage": "0.00",
            "orderPostageCN": "零元整",
            "discount": 0,
            discountCN: '零元整',
            orderTotalPrice: '0.00',
            orderTotalPriceCN: '零元整',
            payAmount: '826.80',
            payAmountCN: '捌佰贰拾陆元捌角',
            "purchaseItemPrintVos": [{
                "goodsName": "滴露柠檬衣物除菌液",
                "goodsId": "88",
                "code69": "6921669811032",
                "brandName": "滴露",
                "goodsAttribute": "(（2.5L+1L）*瓶）/箱",
                "goodsUnitPrice": "68.90",
                "goodsNumber": 12,
                "goodsTatolPrice": 826.8,
                "goodsTatolPriceFormat": "826.80",
                goodsUnitName: '盒子'
            }]
        }
    }
    res.json(searchPrintItems)
});

/**
 * 生成收货二维码接口
 * 括号里的注释实际不显示
 */
router.post('/createReceivingQrcode', function(req, res) {
    var result = {
        "code": 0,
        "message": "成功(注：生成收货二维码接口)",
        "data": null
    }
    res.json(result)
});

/**
 * 扫码收货接口
 * 括号里的注释实际不显示
 */
router.post('/sweepReceiving', function(req, res) {
    var result = {
        "code": 0,
        "message": "成功(注：扫码收货接口)",
        "data": null
    }
    res.json(result)
});

/**
 * 退款接口
 * 括号里的注释实际不显示
 */
router.post('/refund/:orderId', function(req, res) {
    var result = {
        "code": 0,
        "message": "成功(注：退款接口)",
        "data": null
    }
    res.json(result)
});

/**
 * 验证二维码
 */
router.get('/checkQrcode', function(req, res) {
    var checkQrcode = {
        "code": 1,
        "message": "成功",
        "data": "http://supplier-fe-test.storify.cc/#/confirmReceipt?orderId=201710112134369430978894870170"
    }
    res.json(checkQrcode)
});

/**
 * 商户各类订单数量统计接口
 */
router.get('/countOrderNumByOrderStatus', function(req, res) {
    var countOrderNumByOrderStatus = {
        "code": 1,
        "message": "成功",
        "data": {
            "issueShipOrderNum": 1,
            "rejectOrderNum": 5,
            "paymentCancelOrderNum": 20,
            "cancelOrderNum": 1,
            "totalOrderNum": 60,
            "pendingShipOrderNum": 1,
            "receivedOrderNum": 18,
            "refundedOrderNum": 12,
            "paymentOrderNum": 2
        }
    }
    res.json(countOrderNumByOrderStatus)
});
module.exports = router;
