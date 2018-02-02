var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/**
 * 支付回调接口
 * 括号里的注释实际不显示
 */
router.post('/create',function (req,res) {
    var result =
        {
            "code": 0,
            "message": "成功(注：支付回调接口)",
            "data": null
        }
    res.json(result)
});

/**
 * 支付回调接口(单订单支付)
 * 括号里的注释实际不显示
 */
router.post('/createPaymentByOrderId',function (req,res) {
    var result =
        {
            "code": 0,
            "message": "成功(注：支付回调接口(单订单支付))",
            "data": null
        }
    res.json(result)
});

/**
 * 根据支付ID获取支付总金额
 */
router.get('/getPayOrderTotalPrice/:orderId',function (req,res) {
    var getPayOrderTotalPriceByPayId =
        { "code": 0,
            "message": "成功",
            "data": 0
        }
    res.json(getPayOrderTotalPriceByPayId)
});
module.exports = router;
