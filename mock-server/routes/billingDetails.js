var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});


/* 根据账期时间、结算状态查询结算明细列表 */
router.get('/search', function (req, res) {
    var result =
        {
            "code": 1,
            "message": "成功",
            "data": {
                "pageInfo": {
                    "pageNum": 1,
                    "pageSize": 10,
                    "size": 1,
                    "startRow": 1,
                    "endRow": 1,
                    "total": 1,
                    "pages": 1,
                    "list": [
                        {
                            "recordId": "20170919141737M69N4Lqw",
                            "providerName": "郑振海",
                            "checkoutAt": "2017-09-19",
                            "totalMoney": "1,832,238.00",
                            "settledAmount": "0.00",
                            "settledAt": "",
                            "state": "0",
                            "bankAccount": "610202195641548",
                            "serialNumber": "",
                            "postageTotalAmount": "7,100.00",
                            "orderTotalAmount": "1,825,138.00"
                        }
                    ],
                    "prePage": 0,
                    "nextPage": 0,
                    "isFirstPage": true,
                    "isLastPage": true,
                    "hasPreviousPage": false,
                    "hasNextPage": false,
                    "navigatePages": 8,
                    "navigatepageNums": [
                        1
                    ],
                    "navigateFirstPage": 1,
                    "navigateLastPage": 1,
                    "lastPage": 1,
                    "firstPage": 1
                }
            }
        }
    res.json(result);
});


/* 结算 */
router.post('/orderMoneyRecord/updateState', function (req, res) {
    var result =
        {
            "code": 1,
            "message": "成功",
            "data": null
        }
    res.json(result);
});


/* 根据根据申请人账户查询满足结算时间条件的已结算/待结算明细，并根据pageNum和pageSize进行分页 */
router.get('/orderMoneyRecords', function (req, res) {
    var result =
        {
            "code": 1,
            "message": "成功",
            "data": {
                "money": "1,905,554.00",
                "pageInfo": {
                    "pageNum": 1,
                    "pageSize": 10,
                    "size": 1,
                    "startRow": 1,
                    "endRow": 1,
                    "total": 1,
                    "pages": 1,
                    "list": [
                        {
                            "recordId": "20170919141736ZXgWzTrH",
                            "checkoutAt": "2017-05-19",
                            "totalMoney": "18,329.00",
                            "settledAmount": "0.00",
                            "settledAt": null,
                            "bankAccount": "610202195641548",
                            "bankUserName": "郑振海",
                            "bankName": "邮政储蓄银行",
                            "bankNameBranch": "",
                            "serialNumber": null,
                            "postageTotalAmount": "150.00",
                            "orderTotalAmount": "18,179.00"
                        }
                    ],
                    "prePage": 0,
                    "nextPage": 0,
                    "isFirstPage": true,
                    "isLastPage": true,
                    "hasPreviousPage": false,
                    "hasNextPage": false,
                    "navigatePages": 8,
                    "navigatepageNums": [
                        1
                    ],
                    "navigateFirstPage": 1,
                    "navigateLastPage": 1,
                    "lastPage": 1,
                    "firstPage": 1
                }
            }
        }
    res.json(result);
});


/* 根据结算明细id查询该明细所对应的订单列表 */
router.get('/orderMoneyRecord/searchPurchasesByRecordId', function (req, res) {
    var result =
        {
            "code": 1,
            "message": "成功",
            "data": {
                "pageInfo": {
                    "pageNum": 1,
                    "pageSize": 10,
                    "size": 10,
                    "startRow": 1,
                    "endRow": 10,
                    "total": 71,
                    "pages": 8,
                    "list": [
                        {
                            "orderId": "201709121807303779089979081965",
                            "orderReceiverName": "王达三",
                            "orderReceiverMobile": "15481996241",
                            "orderPrice": "18,179.00",
                            "orderSettlemePrice": "18,179.00",
                            "orderPostage": "100.00",
                            "orderCreateTime": "2017-08-01 10:00:00"
                        },
                        {
                            "orderId": "201709121807304337935363552239",
                            "orderReceiverName": "王达三",
                            "orderReceiverMobile": "15481996241",
                            "orderPrice": "18,179.00",
                            "orderSettlemePrice": "18,179.00",
                            "orderPostage": "100.00",
                            "orderCreateTime": "2017-08-01 10:00:00"
                        },
                        {
                            "orderId": "201709121807304817998874249273",
                            "orderReceiverName": "王达三",
                            "orderReceiverMobile": "15481996241",
                            "orderPrice": "18,179.00",
                            "orderSettlemePrice": "18,179.00",
                            "orderPostage": "100.00",
                            "orderCreateTime": "2017-08-02 10:00:00"
                        },
                        {
                            "orderId": "201709121807305498596552719101",
                            "orderReceiverName": "王达三",
                            "orderReceiverMobile": "15481996241",
                            "orderPrice": "18,179.00",
                            "orderSettlemePrice": "18,179.00",
                            "orderPostage": "100.00",
                            "orderCreateTime": "2017-08-02 10:00:00"
                        },
                        {
                            "orderId": "201709121807305590485612184595",
                            "orderReceiverName": "王达三",
                            "orderReceiverMobile": "15481996241",
                            "orderPrice": "18,179.00",
                            "orderSettlemePrice": "18,179.00",
                            "orderPostage": "100.00",
                            "orderCreateTime": "2017-08-04 10:00:00"
                        },
                        {
                            "orderId": "201709121807306198690868477404",
                            "orderReceiverName": "王达三",
                            "orderReceiverMobile": "15481996241",
                            "orderPrice": "18,179.00",
                            "orderSettlemePrice": "18,179.00",
                            "orderPostage": "100.00",
                            "orderCreateTime": "2017-08-04 10:00:00"
                        },
                        {
                            "orderId": "201709121807306465380447934624",
                            "orderReceiverName": "王达三",
                            "orderReceiverMobile": "15481996241",
                            "orderPrice": "18,179.00",
                            "orderSettlemePrice": "18,179.00",
                            "orderPostage": "100.00",
                            "orderCreateTime": "2017-08-05 10:00:00"
                        },
                        {
                            "orderId": "201709121807306592704495987396",
                            "orderReceiverName": "王达三",
                            "orderReceiverMobile": "15481996241",
                            "orderPrice": "18,179.00",
                            "orderSettlemePrice": "18,179.00",
                            "orderPostage": "100.00",
                            "orderCreateTime": "2017-08-05 10:00:00"
                        },
                        {
                            "orderId": "201709121807308347778736814238",
                            "orderReceiverName": "王达三",
                            "orderReceiverMobile": "15481996241",
                            "orderPrice": "18,179.00",
                            "orderSettlemePrice": "18,179.00",
                            "orderPostage": "100.00",
                            "orderCreateTime": "2017-08-07 10:00:00"
                        },
                        {
                            "orderId": "201709121807308417902884094484",
                            "orderReceiverName": "王达三",
                            "orderReceiverMobile": "15481996241",
                            "orderPrice": "18,179.00",
                            "orderSettlemePrice": "18,179.00",
                            "orderPostage": "100.00",
                            "orderCreateTime": "2017-08-07 10:00:00"
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
                    "lastPage": 8,
                    "firstPage": 1
                },
                "totalOrderRevenue": "1,832,238.00",
                "totalPostage": "7,100.00"
            }
        }
    res.json(result);
});


/* 根据账期时间计算当月已结算金额 */
router.get('/orderMoneyRecord/settlement', function (req, res) {
    var result =
        {
            "code": 1,
            "message": "成功",
            "data": "18,329.00"
        }
    res.json(result);
});

/* 根据账期时间计算当月未结算金额 */
router.get('/orderMoneyRecord/unsettled', function (req, res) {
    var result =
        {
            "code": 1,
            "message": "成功",
            "data": "1,832,238.00"
        }
    res.json(result);
});


/* 供应商登陆首页结算金额统计 */
router.get('/countOrderMoneyRecords', function (req, res) {
    var result =
        {
            "code": 1,
            "message": "成功",
            "data": {
                "orderTotalMoney": "1,910,682.00",
                "pendingSettlementMoney": "1,850,417.00",
                "settledMoney": "0.00"
            }
        }
    res.json(result);
});


module.exports = router;
