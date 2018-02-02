var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/*新增配送范围*/
router.post('/create',function (req,res) {
    var distributionscope = {
        "code": 1, //返回状态
        "message": "成功" ,//返回信息
        "data":  null//返回数据
    }
    res.json(distributionscope);
});

/*查询所有配送范围*/
router.get('/queryAll',function (req,res) {
    var distributionscope = {
        "code": 1,
        "message": "成功",
        "data": {
            "pageNum": 1,
            "pageSize": 10,
            "size": 1,
            "startRow": 1,
            "endRow": 1,
            "total": 2,
            "pages": 1,
            "list": [
                {
                    "id": 1,
                    "supplierId": 250,
                    "addressProvince": "北京市",
                    "addressCity": "北京市",
                    "addressDistrict": null,
                    "remark": "",
                    "createdAt": "2017-09-29 21:55:24",
                    "updateAt": null
                },
                {
                    "id": 2,
                    "supplierId": 250,
                    "addressProvince": "陕西省",
                    "addressCity": "西安市",
                    "addressDistrict": "雁塔区",
                    "remark": "",
                    "createdAt": "2017-09-29 21:55:24",
                    "updateAt": null
                }
            ],
            "lastPage": 1,
            "firstPage": 1
        }
    }
    res.json(distributionscope);
});

/*查询单个配送范围*/
router.get('/query/:id',function (req,res) {
    var distributionscope = {
        "code": 1,
        "message": "成功",
        "data": {
            "id": 1,
            "supplierId": 250,
            "addressProvince": "110000",
            "addressCity": "110100",
            "addressDistrict": "",
            "remark": "",
            "createdAt": "2017-09-29 21:55:24",
            "updateAt": null
        }
    }
    res.json(distributionscope);
});

/*更新配送范围*/
router.post('/update/:id',function (req,res) {
    var distributionscope = {
        "code": 1,
        "message": "成功",
        "data": null
    }
    res.json(distributionscope);
});

/*删除配送范围*/
router.post('/delete/:id',function (req,res) {
    var distributionscope = {
        "code": 1,
        "message": "成功",
        "data": null
    }
    res.json(distributionscope);
});
module.exports = router;