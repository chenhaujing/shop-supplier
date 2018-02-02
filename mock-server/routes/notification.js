var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
/**
 * 消息发送
 */
router.post('/createNotifi', function(req, res, next) {
    var result =
        {
            "code": 1,
            "message": "成功",
            "data": null
        }
    res.json(result)
});
/**
 * 查询消息通知列表
 */
router.get('/getPage', function(req, res, next) {
    var data =
        {
            "code": 1,
            "message": "成功",
            "data": {
                "pageNum": 1,
                "pageSize": 10,
                "size": 10,
                "startRow": 1,
                "endRow": 10,
                "total": 198,
                "pages": 20,
                "list": [
                    {
                        "notifiId": 1244,
                        "accountId": 262,
                        "notifiType": 0,
                        "orderId": "201710231012259347059945281546",
                        "notifiDetail": "您好:您有一笔订单状态已变成<待付款已取消>,订单编号:201710231012259347059945281546",
                        "comment": null,
                        "createdAt": "2017-10-24 11:00:00",
                        "sigin": null,
                        "notifiStatus": 0,
                        "title": null,
                        "content": null
                    },
                    {
                        "notifiId": 1234,
                        "accountId": 262,
                        "notifiType": 0,
                        "orderId": "201710232001317212050557719813",
                        "notifiDetail": "您好:您有一笔待付款订单,订单编号:201710232001317212050557719813",
                        "comment": null,
                        "createdAt": "2017-10-23 20:01:31",
                        "sigin": null,
                        "notifiStatus": 0,
                        "title": null,
                        "content": null
                    }
                ],
                "prePage": 0,
                "nextPage": 2,
                "isFirstPage": true,
                "isLastPage": false,
                "hasPreviousPage": false,
                "hasNextPage": true,
                "navigatePages": 8,
                "navigatepageNums": [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8
                ],
                "navigateFirstPage": 1,
                "navigateLastPage": 8,
                "firstPage": 1,
                "lastPage": 8
            }
        }
    res.json(data)
});
/**
 * 获取未读消息总数
 */
router.get('/getTotal', function(req, res, next) {
    var data =
        {
            "code": 1,
            "message": "成功",
            "data": 189
        }
        res.json(data)
});

/**
 * 点击🔔获取订单/系统前五条消息 不区分已读未读
 */
router.get('/searchUnread', function(req, res, next) {
    var data =
        {
            "code": 1,
            "message": "成功",
            "data": [
                {
                    "notifiId": 1244,
                    "accountId": 262,
                    "notifiType": 0,
                    "orderId": "201710231012259347059945281546",
                    "notifiDetail": "您好:您有一笔订单状态已变成<待付款已取消>,订单编号:201710231012259347059945281546",
                    "comment": null,
                    "createdAt": "2017-10-24 11:00:00",
                    "sigin": null,
                    "notifiStatus": 0,
                    "title": "您好:您有一笔订单状态已变成<待付款已取消>",
                    "content": "订单编号:201710231012259347059945281546"
                },
                {
                    "notifiId": 1243,
                    "accountId": 262,
                    "notifiType": 0,
                    "orderId": "201710241023488631518338723556",
                    "notifiDetail": "您好:您有一笔待付款订单,订单编号:201710241023488631518338723556",
                    "comment": null,
                    "createdAt": "2017-10-24 10:23:49",
                    "sigin": null,
                    "notifiStatus": 0,
                    "title": "您好:您有一笔待付款订单",
                    "content": "订单编号:201710241023488631518338723556"
                }
            ]
        }
        res.json(data)
});

/**
 * 获取某条记录详细信息
 */
router.get('/getNotificationById/:notifiId', function(req, res, next) {
    var data =
        {
            "code": 1,
            "message": "成功",
            "data": {
                "notifiId": 1243,
                "notifiDetail": "您好:您有一笔待付款订单,订单编号:201710241023488631518338723556",
                "comment": null,
                "createdAt": "2017-10-24 10:23:49",
                "notifiStatus": 0
            }
        }
        res.json(data)
});

/**
 * 系统消息删除接口
 */
router.post('/deleteBySigin', function(req, res, next) {
    var data =
        {
            "code": 1,
            "message": "成功",
            "data": null
        }
        res.json(data)
});

/**
 * 供应商更改消息状态
 */
router.post('/updateStatus/:notifiId', function(req, res, next) {
    var data =
        {
            "code": 1,
            "message": "成功",
            "data": null
        }
        res.json(data)
});

/**
 * 消息跑马灯显示
 */
router.get('/marqueeShow', function(req, res, next) {
    var data =
        {
            "code": 1,
            "message": "成功",
            "data": "五一放假"
        }
    res.json(data)
});
module.exports = router;
