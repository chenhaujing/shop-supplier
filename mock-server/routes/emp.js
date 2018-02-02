var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});


router.put('/create', function (req, res) {
    var saveemp =
    {
        "code": 1,
        "message": "员工信息添加成功！1111",
        "data": null
    }
    res.json(saveemp)
});

router.get('/findemp', function (req, res) {
    var emp =
    {
        "code": 1,
        "message": "查询成功",
        "data": {
            "pageNum": 1,
            "pageSize": 10,
            "size": 1,
            "startRow": 1,
            "endRow": 1,
            "total": 1,
            "pages": 1,
            "list": [
                {
                    "id": 10,
                    "userId": 170903,
                    "accountId": 262111,
                    "empName": "张三",
                    "empSex": "男",
                    "empTel": "18992311025",
                    "createAt": null,
                    "updateAt": null,
                    "empStatus": "1"
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
            "firstPage": 1,
            "lastPage": 1
        }
    }
    res.json(emp)
});

router.put('/updateStatus', function (req, res) {
    var updateemp =
    {
        "code": 1,
        "message": "员工状态修改成功111",
        "data": null
    }
    res.json(updateemp)
});

module.exports = router;