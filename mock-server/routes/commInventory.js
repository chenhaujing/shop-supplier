var express = require('express');
var router = express.Router();

/**
 * 商品库存查询接口
 */
router.get('/search', function(req, res, next) {
    var data =
        {
            "code": 1,
            "message": "成功",
            "data": {
                "pageNum": 1,
                "pageSize": 10,
                "size": 5,
                "startRow": 1,
                "endRow": 5,
                "total": 5,
                "pages": 1,
                "list": [
                    {
                        "id": 549,
                        "supplierName": "透云供应商",
                        "code69": "6910000003",
                        "brandName": "名屋",
                        "commName": "测试商品A",
                        "unitName": "包",
                        "ruleVal": "(1xxl*11包)/袋",
                        "inventoryMinimum": 211,
                        "inventory": 111,
                        "inventoryStatus": 1,
                        "measureSpecName": "xxl",
                        "cartonName": "袋"
                    },
                    {
                        "id": 188,
                        "supplierName": "透云供应商",
                        "code69": "6901028062688",
                        "brandName": "888888",
                        "commName": "苏烟礼盒",
                        "unitName": "包",
                        "ruleVal": "(3xl  *3包)/盒",
                        "inventoryMinimum": 12,
                        "inventory": 125,
                        "inventoryStatus": 0,
                        "measureSpecName": "xl  ",
                        "cartonName": "盒"
                    },
                    {
                        "id": 189,
                        "supplierName": "透云供应商",
                        "code69": "88888888888888888888",
                        "brandName": "888888",
                        "commName": "苏烟礼盒88888888888888888888",
                        "unitName": "包",
                        "ruleVal": "(1s*1包)/盒",
                        "inventoryMinimum": 0,
                        "inventory": 105,
                        "inventoryStatus": 0,
                        "measureSpecName": "s",
                        "cartonName": "盒"
                    },
                    {
                        "id": 530,
                        "supplierName": "透云供应商",
                        "code69": "691000000002",
                        "brandName": "葱妈妈",
                        "commName": "透云商品B",
                        "unitName": "盒",
                        "ruleVal": "(1xxl*1盒)/袋",
                        "inventoryMinimum": 0,
                        "inventory": 170,
                        "inventoryStatus": 0,
                        "measureSpecName": "xxl",
                        "cartonName": "袋"
                    },
                    {
                        "id": 175,
                        "supplierName": "透云供应商",
                        "code69": "6691000001",
                        "brandName": "美可",
                        "commName": "透云商品A",
                        "unitName": "盒",
                        "ruleVal": "(10ml*10盒)/箱",
                        "inventoryMinimum": 10,
                        "inventory": 11,
                        "inventoryStatus": 0,
                        "measureSpecName": "ml",
                        "cartonName": "箱"
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
        res.json(data)
});

/**
 * 获取某商品库存信息
 */
router.get('/getInventoryById/:id', function(req, res, next) {
    var data =
        {
            "code": 1,
            "message": "成功",
            "data": {
                "id": 188,
                "inventoryMinimum": 12,
                "inventory": 125
            }
        }
        res.json(data)
});

/**
 * 更新某商品库存信息
 */
router.post('/updateInventory', function(req, res, next) {
    var data =
        {
            "code": 1,
            "message": "成功",
            "data": null
        }
    res.json(data)
});
module.exports = router;
