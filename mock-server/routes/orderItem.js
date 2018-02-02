var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/**
 * 根据订单编号分页显示订单明细
 */
router.get('/purchase/:orderId/PurchaseItems',function (req,res) {
    var result =
        {
            "code": 1,
            "message": "成功",
            "data": {
                "purchaseInListVo": {
                    "orderId": "201710112134369430978894870170",
                    "orderPrice": "826.80",
                    "orderReceiverName": "农夫山泉有点甜"
                },
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
                            "goodsName": "滴露柠檬衣物除菌液",
                            "goodsNumber": 12,
                            "code": "44",
                            "code69": "6921669811032",
                            "goodsAttribute": "(（2.5L+1L）*瓶）/箱",
                            "goodsUnitPrice": "68.90",
                            "goodsTatolPrice": "826.80"
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
    res.json(result)
});

module.exports = router;
