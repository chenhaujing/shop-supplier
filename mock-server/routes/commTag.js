var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/search', function (req, res) {
    var commTag =
        {
            "code": 1,
            "message": "查询商品标签成功！",
            "data": [
                {
                    "id": 1,
                    "name": "热卖单品",
                    "supplierId": 0,
                    "createdAt": "2017-08-14",
                    "updatedAt": "2017-08-15"
                },
                {
                    "id": 2,
                    "name": "促销单品",
                    "supplierId": 0,
                    "createdAt": "2017-08-14",
                    "updatedAt": "2017-08-14"
                },
                {
                    "id": 3,
                    "name": "新品上线",
                    "supplierId": 0,
                    "createdAt": "2017-08-14",
                    "updatedAt": "2017-08-14"
                }
            ]
        }
    res.json(commTag)
});

router.post('/save', function (req, res) {
    var commTag =
        {
            "code": 1,
            "message": "商品标签新增成功！"
        }
    res.json(commTag)
});

router.delete('/delete', function (req, res) {
    var commTag =
        {
            "code": 1,
            "message": "商品标签删除成功！"
        }
    res.json(commTag)
});

router.put('/update', function (req, res) {
    var commTag =
        {
            "code": 1,
            "message": "商品标签修改成功！"
        }
    res.json(commTag)
});

module.exports = router;
