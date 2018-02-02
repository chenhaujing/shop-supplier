var express = require('express');
var router = express.Router();

router.post('/save', function(req, res, next) {
    var json={
        "code": 1,
        "message": "箱规单位添加成功！",
        "data":null
    }
    res.json(json);
});

router.get('/search', function(req, res, next) {
    var json= {
        "code": 1,
        "message": "查询成功！",
        "data": [
            {
                "id": 12,
                "name": "员工箱规",
                "supplierId": 257,
                "createdAt": "2017-10-24",
                "updatedAt": "2017-10-24"
            },
            {
                "id": 11,
                "name": "箱规1024",
                "supplierId": 257,
                "createdAt": "2017-10-24",
                "updatedAt": "2017-10-24"
            },
            {
                "id": 9,
                "name": "盒",
                "supplierId": 0,
                "createdAt": "2017-10-19",
                "updatedAt": "2017-10-19"
            },
            {
                "id": 8,
                "name": "箱",
                "supplierId": 0,
                "createdAt": "2017-10-19",
                "updatedAt": "2017-10-19"
            },
            {
                "id": 7,
                "name": "袋",
                "supplierId": 0,
                "createdAt": "2017-10-19",
                "updatedAt": "2017-10-19"
            }
        ]
    }
    res.json(json);
});

router.delete('/delete', function(req, res, next) {
    var json={
        "code": 1,
        "message": "箱规单位删除成功！",
        "data":null
    }

    res.json(json);
});
router.put('/update', function(req, res, next) {
    var json={
        "code": 1,
        "message": "箱规单位修改成功！",
        "data":null
    }
    res.json(json);
});


module.exports = router;
