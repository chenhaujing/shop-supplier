var express = require('express');
var router = express.Router();

router.post('/save', function(req, res, next) {
    var json={
        "code": 1,
        "message": "库存单位添加成功",
        "data":null
    }
    res.json(json);
});

router.get('/search', function(req, res, next) {
    var json={
        "code": 1,
        "message": "查询库存单位成功！",
        "data": [
            {
                "id": 30,
                "name": "员工库存",
                "supplierId": 257,
                "createdAt": null,
                "updatedAt": null
            },
            {
                "id": 29,
                "name": "库存1024",
                "supplierId": 257,
                "createdAt": null,
                "updatedAt": null
            },
            {
                "id": 28,
                "name": "22",
                "supplierId": 0,
                "createdAt": null,
                "updatedAt": null
            },
            {
                "id": 26,
                "name": "单位",
                "supplierId": 257,
                "createdAt": null,
                "updatedAt": null
            },
            {
                "id": 25,
                "name": "只",
                "supplierId": 257,
                "createdAt": null,
                "updatedAt": null
            },
            {
                "id": 23,
                "name": "包",
                "supplierId": 0,
                "createdAt": null,
                "updatedAt": null
            },
            {
                "id": 5,
                "name": "盒",
                "supplierId": 0,
                "createdAt": null,
                "updatedAt": null
            },
            {
                "id": 22,
                "name": "瓶",
                "supplierId": 0,
                "createdAt": null,
                "updatedAt": null
            },
            {
                "id": 1,
                "name": "箱",
                "supplierId": 0,
                "createdAt": null,
                "updatedAt": null
            }
        ]
    }
    res.json(json);
});

router.delete('/delete', function(req, res, next) {
    var json={
        "code": 1,
        "message": "库存单位删除成功！",
        "data":null
    }

    res.json(json);
});
router.put('/update', function(req, res, next) {
    var json={
        "code": 1,
        "message": "库存单位修改成功",
        "data":null
    }
    res.json(json);
});


module.exports = router;
