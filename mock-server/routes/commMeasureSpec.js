var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/save', function (req, res) {
    var commMeasureSpec =
        {
            "code": 1,
            "message": "添加计量规格成功"
        }
    res.json(commMeasureSpec)
});

router.delete('/delete', function (req, res) {
    var commMeasureSpec =
        {
            "code": 1,
            "message": "删除计量规格成功"
        }
    res.json(commMeasureSpec)
});

router.put('/update', function (req, res) {
    var commMeasureSpec =
        {
            "code": 1,
            "message": "更新商品规格成功"
        }
    res.json(commMeasureSpec)
});

router.get('/searchCommMeasureSpec', function (req, res) {
    var commMeasureSpec =
        {
            "code": 1,
            "message": "查询计量规格成功！",
            "data": [
                {
                    "id": 23,
                    "name": "s",
                    "supplierId": 0,
                    "createdAt": "2017-10-12",
                    "updatedAt": "2017-10-12"
                },
                {
                    "id": 22,
                    "name": "xxl",
                    "supplierId": 0,
                    "createdAt": "2017-10-12",
                    "updatedAt": "2017-10-12"
                },
                {
                    "id": 21,
                    "name": "xl  ",
                    "supplierId": 0,
                    "createdAt": "2017-10-11",
                    "updatedAt": "2017-10-12"
                },
                {
                    "id": 19,
                    "name": "g",
                    "supplierId": 0,
                    "createdAt": "2017-10-11",
                    "updatedAt": "2017-10-11"
                },
                {
                    "id": 18,
                    "name": "L",
                    "supplierId": 0,
                    "createdAt": "2017-10-11",
                    "updatedAt": "2017-10-11"
                },
                {
                    "id": 14,
                    "name": "ml",
                    "supplierId": 0,
                    "createdAt": "2017-10-11",
                    "updatedAt": "2017-10-11"
                },
                {
                    "id": 11,
                    "name": "支",
                    "supplierId": 0,
                    "createdAt": "2017-10-11",
                    "updatedAt": "2017-10-11"
                },
                {
                    "id": 9,
                    "name": "只",
                    "supplierId": 0,
                    "createdAt": "2017-10-10",
                    "updatedAt": "2017-10-10"
                }
            ]
        }
    res.json(commMeasureSpec)
});

module.exports = router;
