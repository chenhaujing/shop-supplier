var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

//查询供应商发票设置状态
router.get('/get', function (req, res) {
    var invoice =
        {
            "code": 1,
            "message": "查询成功",
            "data": {
                "supplierId": 1001,    //供应商ID
                "status": 1,   //发票开启状态，0-关闭，1-开启
                "personal": 1,   //增值税普通个人发票，0-未选择，1-已选择
                "company": 0,   //增值税普通企业发票，0-未选择，1-已选择
                "profession": 0,   //增值税专业发票，0-未选择，1-已选择
            }
        }
    res.json(invoice)
});

//修改供应商发票设置状态
router.put('/update', function (req, res) {
    var invoice =
        {
            "code": 1,
            "message": "修改供应商发票设置成功！",
            "data": null
        }
    res.json(invoice)
});



module.exports = router;
