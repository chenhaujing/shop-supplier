var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/*查询所有配送规则*/
router.get('/queryAll',function (req,res) {
    var result = {
        "code": 1,
        "message": "成功",
        "data": {
            "data": {
                "pageNum": 1,
                "pageSize": 10,
                "size": 2,
                "startRow": 1,
                "endRow": 2,
                "total": 2,
                "pages": 1,
                "list": [
                    {
                        "id": 2,
                        "supplierId": 250,
                        "rulesType": 0,
                        "addressProvince": null,
                        "addressCity": null,
                        "addressDistrict": null,
                        "whetherShipping": 0,
                        "sendAmount": null,
                        "defaultPiece": null,
                        "excessPiece": null,
                        "defaultAmount": null,
                        "excessAmount": null,
                        "remark": "",
                        "createdAt": "2017-09-29 21:55:51",
                        "updateAt": null,
                        "distributionScopeId": null
                    },
                    {
                        "id": 1,
                        "supplierId": 250,
                        "rulesType": 1,
                        "addressProvince": "陕西省",
                        "addressCity": "王益区",
                        "addressDistrict": "铜川市",
                        "whetherShipping": 1,
                        "sendAmount": 1,
                        "defaultPiece": 1,
                        "excessPiece": 1,
                        "defaultAmount": 1,
                        "excessAmount": 1,
                        "remark": "",
                        "createdAt": "2017-09-29 21:55:24",
                        "updateAt": "2017-10-24 10:33:30",
                        "distributionScopeId": 1
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
            },
            "isAll": 1,
            "freightRules": 0
        }
    }
    res.json(result);
});

/*查询单个配送规则*/
router.get('/query/:id',function (req,res) {
    var result = {
        "code": 1,
        "message": "成功",
        "data": {
            "id": 1,
            "supplierId": 250,
            "rulesType": 1,
            "addressProvince": "陕西省",
            "addressCity": "王益区",
            "addressDistrict": "铜川市",
            "whetherShipping": 1,
            "sendAmount": 1,
            "defaultPiece": 1,
            "excessPiece": 1,
            "defaultAmount": 1,
            "excessAmount": 1,
            "remark": "",
            "createdAt": "2017-09-29 21:55:24",
            "updateAt": "2017-10-24 10:33:30",
            "distributionScopeId": 1
        }
    }
    res.json(result);
});

/*更新某条运费规则*/
router.post('/update/:id',function (req,res) {
    var result = {
        "code": 1,
        "message": "成功",
        "data": null
    }
    res.json(result);
});

/*新增通用运费规则*/
router.post('/insert',function (req,res) {
    var result = {
        "code": 1,
        "message": "成功",
        "data": null
    }
    res.json(result);
});

/*删除通用配送规则记录*/
router.post('/delete/:id',function (req,res) {
    var result = {
        "code": 1,
        "message": "成功",
        "data": null
    }
    res.json(result);
});
module.exports = router;