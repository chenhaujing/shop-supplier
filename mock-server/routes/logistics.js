var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
/**
 * 查询物流信息
 */
router.get('/:num',function (req,res) {
    var result =
        {
            "code": 1,
            "message": "成功",
            "data": {
                "message": "ok",
                "nu": "1212121212",
                "ischeck": "1",
                "condition": "F00",
                "com": "quanfengkuaidi",
                "status": "200",
                "state": "3",
                "data": [
                    {
                        "time": "2016-10-28 15:47:57",
                        "ftime": "2016-10-28 15:47:57",
                        "context": "派件已【签收】,签收人是【李妍】签收网点是【北京通州武夷花园站】"
                    },
                    {
                        "time": "2016-03-16 10:35:16",
                        "ftime": "2016-03-16 10:35:16",
                        "context": "快件到达【濮阳新站】,上一站是【濮阳南乐站】扫描员是【张景杰】"
                    },
                    {
                        "time": "2015-12-06 00:51:04",
                        "ftime": "2015-12-06 00:51:04",
                        "context": "快件在【服装城点】装车,正发往【石狮站】扫描员是【柯春燕2】"
                    },
                    {
                        "time": "2015-04-22 15:33:45",
                        "ftime": "2015-04-22 15:33:45",
                        "context": "快件到达【郸城站】,上一站是【郸城站】扫描员是【郸城站】"
                    }
                ]
            }
        }
    res.json(result)
});
/**
 * 更改物流信息
 */
router.post('/artificialAutomaticRecive',function (req,res) {
    var result =
        {
            "code": 1,
            "message": "该订单七日后自动确认收货",
            "data": null
        }
    res.json(result)
});
module.exports = router;
