var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.post('/importExcel', function (req, res) {
    var importexcel =
        {
            "code": 1,
            "message": "完成导入！",
            "data": {
                "errolist": [
                    {
                        "rowNum": 2,
                        "message": "供货价必须是1-99999999的数"
                    },
                    {
                        "rowNum": 3,
                        "message": "批发价必须是1-99999999的数"
                    },
                    {
                        "rowNum": 4,
                        "message": "最小起订量必须是1到999的正整数"
                    }
                ],
                "rightlist": [
                    {
                        "code": 1,
                        "message": "商品条码:2324313754成功导入！",
                        "rowNum": 5,
                        "code69": "2324313754",
                        "sjcode": "232532sdg",
                        "brand": "品牌",
                        "name": "商品名称",
                        "measureSpecName": "只",
                        "ruleVal": "(9999只*9999包)/箱",
                        "unit": "包",
                        "inventory": 0,
                        "tagName": "热卖单品",
                        "companyName": "企业名称",
                        "originPlace": "商品产地",
                        "minOrderQuantity": 999
                    }
                ]
            }
        }
    res.json(importexcel)
});
router.delete('/delete/:id', function (req, res) {
    var deletecommodity =
        {
            "code": 1,
            "message": "删除商品成功！",
            "data": {
                "supplierId": 257
            }
        }
    res.json(deletecommodity)
});
router.delete('/delete/bulk', function (req, res) {
    var deletebulkcommodity =
        {
            "code": 1,
            "message": "删除商品成功！",
            "data": {
                "supplierId": 257
            }
        }
    res.json(deletebulkcommodity)
});
router.put('/onShelves/:id', function (req, res) {
    var onshevlves =
        {
            "code": 1,
            "message": "上架商品需要管理员审核，审核通过后会自动上架，稍后查询商品列表审核结果！",
            "data": null
        }
    res.json(onshevlves)
});
router.put('/offShelves/:id', function (req, res) {
    var offshevlves =
        {
            "code": 1,
            "message": "已上架商品下架提交时，需要管理员审核，审核通过后会自动下架，稍后注意查询商品列表审核结果！",
            "data": null
        }
    res.json(offshevlves)
});

//首页商品信息统计接口
router.get('/countDetail', function (req, res) {
    var detail =
        {
            "code": 1,
            "message": "查询成功!",
            "data": {
                "inventoryStatusNum": 1,
                "onShelvesNum": 2,
                "offShelvesNum": 3,
                "onShelvesAuditNum": 4,
                "offShelvesAuditNum": 5,
                "editAuditNum": 6,  //编辑待审核数量
                "skuNum": 15
            }
        }
    res.json(detail)
});

//批量上架商品接口
router.put('/onShelves/batch', function (req, res) {
    var result =
        {
            "code": 1,
            "message": "上架商品需要管理员审核，审核通过后会自动上架，稍后注意查询商品列表审核结果！",
            "data": null
        }
    res.json(result)
});

//批量下架商品接口
router.put('/offShelves/batch', function (req, res) {
    var result =
        {
            "code": 1,
            "message": "已上架商品下架提交时，需要管理员审核，审核通过后会自动下架，稍后注意查询商品列表审核结果！",
            "data": null
        }
    res.json(result)
});

//商品审批列表查询
router.get('/findApproval', function (req, res) {
    var auditList =
        {
            "code": 1,
            "message": "查询成功",
            "data": {
                "pageNum": 0,
                "pageSize": 0,
                "size": 240,
                "startRow": 1,
                "endRow": 240,
                "total": 240,
                "pages": 0,
                "list": [
                    {
                        "id": 61,
                        "scId": 35,
                        "supplierId": 250,
                        "supplierName": "suixin",
                        "name": "百晨荷兰风味曲奇",
                        "minImg": "http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpg/thumbnail/a43a37cfda294289bbcc5d182fc28ce1.jpg",
                        "code69": "6933245200819",
                        "code": "1234566",
                        "brandName": null,
                        "unitName": "箱",
                        "ruleVal": "400",
                        "price": 0.01,
                        "unitPrice": 0.01,
                        "inventory": 100,
                        "minOrderQuantity": 1,
                        "updatedAt": "2017-09-29 22:01:22",
                        "createdAt": "2017-09-29 22:00:29",
                        "status": 2,
                        "auditResult": 1,
                        "auditOpinion": ""
                    },
                    {
                        "id": 62,
                        "scId": 35,
                        "supplierId": 250,
                        "supplierName": "suixin",
                        "name": "百晨荷兰风味曲奇",
                        "minImg": "http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpg/thumbnail/a43a37cfda294289bbcc5d182fc28ce1.jpg",
                        "code69": "6933245200819",
                        "code": "1234566",
                        "brandName": null,
                        "unitName": "箱",
                        "ruleVal": "400",
                        "price": 0.01,
                        "unitPrice": 0.01,
                        "inventory": 100,
                        "minOrderQuantity": 1,
                        "updatedAt": "2017-09-29 22:17:38",
                        "createdAt": "2017-09-29 22:07:28",
                        "status": 2,
                        "auditResult": 0,
                        "auditOpinion": "不符合下架标准"
                    },
                    {
                        "id": 74,
                        "scId": 112,
                        "supplierId": 256,
                        "supplierName": "亚玛劲（上海）商贸有限公司",
                        "name": "【台湾制造】张君雅 碳烤鸡汁 点心面（一箱15入）",
                        "minImg": "http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpg%5C482400d1cef9446885ed8f45bbe16eca.jpg",
                        "code69": "4710199085608",
                        "code": "1",
                        "brandName": "张君雅",
                        "unitName": "包",
                        "ruleVal": "100g*15包/箱",
                        "price": 83.4,
                        "unitPrice": 83.4,
                        "inventory": 100,
                        "minOrderQuantity": 1,
                        "updatedAt": "2017-10-11 20:30:49",
                        "createdAt": "2017-10-11 20:29:10",
                        "status": 2,
                        "auditResult": 1,
                        "auditOpinion": ""
                    }
                ]
            }
        }
    res.json(auditList)
});

//商品审核记录详情查询
router.get('/getAudit/:id', function (req, res) {
    var auditDetail = {
        "code": 1,
        "message": "查询审核记录详情成功！",
        "data": {
            "id": 172,
            "scaId": 99,
            "supplierId": 259,
            "providerName": null,
            "contractCity": null,
            "salesNumber": null,
            "brandName": "花享蓉",
            "categoryOneId": 66,
            "categoryOneName": "居家清洁",
            "categoryTwoId": 109,
            "categoryTwoName": "纸类用品",
            "categoryThreeId": 118,
            "categoryThreeName": "卫生纸",
            "name": "花享蓉竹纤维本色抑菌实心扁卷纸1300克",
            "tagId": 3,
            "tagName": "新品上线",
            "originPlace": "重庆",
            "companyName": "上海御购实业有限公司",
            "marketTime": null,
            "remark": "<p><img src=\"http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpg/e2a20a61f07e4c98bcdef35eab39dc3e.jpg\"><img src=\"http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpg/0a952fcc27254471a7b266a033c56eaa.jpg\"><img src=\"http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpg/93c3eb82c5f2499eb08a4c520335744f.jpg\"><img src=\"http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpg/4997c807c2b7432986531bf73c03f5ee.jpg\"><img src=\"http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpg/28dba270bd6f4fe3a4c3a8e2a7da3b21.jpg\"><img src=\"http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpg/3490fe6072f940949bb0de6f78ed76ae.jpg\"><img src=\"http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpg/cabb7da95fb44957900c4192b6711089.jpg\"><img src=\"http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpg/17f15d1dd3d14c169990b592437a9575.jpg\"><img src=\"http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpg/aa545b98cddc4d6b9a24faff6b3cba57.jpg\"><img src=\"http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpg/1a73359f970a4bfa99846c3898474dd9.jpg\"><img src=\"http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpg/ccc6349d16754ebb8e4176bf4b9606e0.jpg\"></p>",
            "description": null,
            "code": "HBBJ01130",
            "code69": "6970880130088",
            "measureSpecId": 19,
            "measureSpecName": "g",
            "ruleVal": "1*10*8",
            "unitId": 23,
            "unitName": "包",
            "inventory": 500,
            "minImg": "http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpg/thumbnail/f49c64b8e66c430b8b3549037a0581b8.jpg",
            "price": 17.7,
            "unitPrice": 17.7,
            "status": 2,
            "createdAt": "2017-10-18 11:22:09",
            "updatedAt": "2017-10-18 11:32:42",
            "invalidStatus": 1,
            "minOrderQuantity": 1,
            "imgeList": [
                {
                    "id": 48,
                    "scId": null,
                    "name": "主图1.jpg",
                    "url": "http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpg/8aa551da6c3a41f29cd71859e167dab8.jpg",
                    "type": "jpg",
                    "size": "640*640",
                    "thumbnailUrl": "http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpg/thumbnail/f49c64b8e66c430b8b3549037a0581b8.jpg"
                },
                {
                    "id": 49,
                    "scId": null,
                    "name": "主图2.jpg",
                    "url": "http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpg/a2b45fc35de04822861bacc465882d59.jpg",
                    "type": "jpg",
                    "size": "640*640",
                    "thumbnailUrl": "http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpg/thumbnail/91542cef2087453db995eba5f181649f.jpg"
                },
                {
                    "id": 50,
                    "scId": null,
                    "name": "主图3.jpg",
                    "url": "http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpg/35cf15422f8c4a4eaa7386ddf4a78955.jpg",
                    "type": "jpg",
                    "size": "640*640",
                    "thumbnailUrl": "http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpg/thumbnail/2a6f8277199344dba6da04cbb177693a.jpg"
                },
                {
                    "id": 51,
                    "scId": null,
                    "name": "主图4.jpg",
                    "url": "http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpg/188463c29e204246be445afcf39f6eaf.jpg",
                    "type": "jpg",
                    "size": "640*640",
                    "thumbnailUrl": "http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpg/thumbnail/a6301ac989b849e9845184135ac360e5.jpg"
                }
            ],
            "advice": null,
            "freightRulesList": null,
            "inventoryMinimum": 0,
            "inventoryStatus": 0,
            "productionDate": null,
            "measureSpecVal": null,
            "guaranteePeriod": null,
            "guaranteePeriodUnit": null,
            "cartonId": null,
            "cartonName": null,
            "cartonVal": null
        }
    }
    res.json(auditDetail)
});

//商品审核接口
router.put('/audit/bulk', function (req, res) {
    var audit =
        {
            "code": 1,
            "message": "批量商品审核成功!",
            "data": null
        }
    res.json(audit)
});


//商品列表高级查询接口
router.get('/search', function (req, res) {
    var search =
        {
            "code": 1,
            "message": "查询成功！",
            "data": {
                "pageNum": 1,
                "pageSize": 10,
                "size": 10,
                "startRow": 1,
                "endRow": 10,
                "total": 61,
                "pages": 7,
                "list": [
                    {
                        "id": 81,
                        "minImg": "http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpg/thumbnail/41c46ec2a9c84e68abf5a3bef84ecec7.jpg",
                        "commId": 86376,
                        "supplierId": 255,
                        "supplierName": "上海颂祺电子商务有限公司",
                        "code69": "6921669813395",
                        "code": "",
                        "brandName": "滴露",
                        "commName": "滴露樱桃芬芳味泡沫抑菌洗手液",
                        "unitName": "瓶",
                        "measureSpecName": "ml",
                        "ruleVal": "(1ml*1瓶)/箱",
                        "inventory": "100",
                        "status": "编辑待审核",
                        "statusNum": 6,
                        "invalidStatus": 1,
                        "price": "￥17.93",
                        "unitPrice": "￥17.93",
                        "minOrderQuantity": 1,
                        "auditOpinion": null,
                        "auditResult": 2,
                        "updatedAt": "2017-10-23 22:52:39"
                    },
                    {
                        "id": 92,
                        "minImg": "http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpg/thumbnail/f45f69f64fbc4275a61169b60e37bf8b.jpg",
                        "commId": 211655,
                        "supplierId": 255,
                        "supplierName": "上海颂祺电子商务有限公司",
                        "code69": "6921669812282",
                        "code": "48",
                        "brandName": "滴露",
                        "commName": "滴露经典松木衣物除菌液实惠装",
                        "unitName": "瓶",
                        "measureSpecName": "L",
                        "ruleVal": "(1L*1瓶)/袋",
                        "inventory": "0",
                        "status": "编辑待审核",
                        "statusNum": 6,
                        "invalidStatus": 1,
                        "price": "￥39.68",
                        "unitPrice": "￥39.68",
                        "minOrderQuantity": 1,
                        "auditOpinion": null,
                        "auditResult": 2,
                        "updatedAt": "2017-10-23 22:52:04"
                    },
                    {
                        "id": 132,
                        "minImg": "http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpg/thumbnail/dd62df8962b9420d968a9302526fe99a.jpg",
                        "commId": 42639,
                        "supplierId": 255,
                        "supplierName": "上海颂祺电子商务有限公司",
                        "code69": "6923146106013",
                        "code": "3",
                        "brandName": "杜蕾斯",
                        "commName": "杜蕾斯热感超薄装安全套",
                        "unitName": "盒",
                        "measureSpecName": "只",
                        "ruleVal": "(3只*24盒)／箱",
                        "inventory": "100",
                        "status": "已上架",
                        "statusNum": 2,
                        "invalidStatus": 1,
                        "price": "￥13.53",
                        "unitPrice": "￥13.53",
                        "minOrderQuantity": 1,
                        "auditOpinion": null,
                        "auditResult": null,
                        "updatedAt": "2017-10-13 18:55:01"
                    }
                ],
                "prePage": 0,
                "nextPage": 2,
                "isFirstPage": true,
                "isLastPage": false,
                "hasPreviousPage": false,
                "hasNextPage": true,
                "navigatePages": 8,
                "navigatepageNums": [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7
                ],
                "navigateFirstPage": 1,
                "navigateLastPage": 7,
                "firstPage": 1,
                "lastPage": 7
            }
        }
    res.json(search)
});


//商品列表简易查询接口
router.get('/simplesearch', function (req, res) {
    var simplesearch =
        {

        "code": 1,
        "message": "查询完成",
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
                "id": 605,
                "minImg": "http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpeg%5Cthumbnail%5C2a9c9e05-410f-41d4-9840-fd30f931d61b.jpg",
                "commId": 540758,
                "supplierId": 257,
                "supplierName": "测试账号",
                "code69": "78268",
                "code": "15",
                "brandName": "达利园",
                "commName": "闲趣饼干",
                "unitName": "只",
                "measureSpecName": "L",
                "ruleVal": "(29L*30只)/盒",
                "inventory": "0",
                "status": "已下架",
                "statusNum": 3,
                "invalidStatus": 1,
                "price": "￥1.25",
                "unitPrice": "￥1.25",
                "minOrderQuantity": 188,
                "auditOpinion": null,
                "auditResult": null,
                "updatedAt": "2017-10-24 09:39:48"
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
    res.json(simplesearch)
});

//商品详情查询接口
router.get('/get/:id', function (req, res) {
    var getComm =
        {
            "code": 1,
            "message": "查询成功",
            "data": {
                "id": 11,
                "scaId": null,
                "supplierId": 256,
                "providerName": null,
                "contractCity": null,
                "salesNumber": null,
                "brandName": "嗑虾味",
                "categoryOneId": 135,
                "categoryOneName": "休闲食品",
                "categoryTwoId": 145,
                "categoryTwoName": "散装休闲食品",
                "categoryThreeId": 159,
                "categoryThreeName": "散装蜜饯/炒货/零食类",
                "name": "嗑虾味-原味",
                "tagId": null,
                "tagName": null,
                "originPlace": "台湾",
                "companyName": "亚玛劲",
                "marketTime": "2017-09-05",
                "remark": "<p>无</p>",
                "description": null,
                "code": "4",
                "code69": "4712968550881",
                "measureSpecId": 19,
                "measureSpecName": "g",
                "ruleVal": "(80g*10包)/箱",
                "unitId": 23,
                "unitName": "包",
                "inventory": 100,
                "minImg": "http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpg%5Cthumbnail%5C3f72b39a10234496a2510b3c07164595.jpg",
                "price": 7.4,
                "unitPrice": 6.9,
                "status": 0,
                "createdAt": "2017-10-10 15:40:34",
                "updatedAt": "2017-10-11 20:55:05",
                "invalidStatus": 1,
                "minOrderQuantity": 1,
                "imgeList": [
                    {
                        "id": 94,
                        "scId": 11,
                        "name": "嗑虾味-原味.jpg",
                        "url": "http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpg%5C572ddc3eeb2f4f46a13d5fe72a1e40ca.jpg",
                        "type": "jpg",
                        "size": "600*600",
                        "thumbnailUrl": "http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpg%5Cthumbnail%5C3f72b39a10234496a2510b3c07164595.jpg"
                    },
                    {
                        "id": 237,
                        "scId": 11,
                        "name": "8649_bdc36edacd2ebd308a16f97cfbcf6104a00fd5c6.jpg",
                        "url": "http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpg%5C7d1d270bbbaf472580ce709dbe17164d.jpg",
                        "type": "jpg",
                        "size": "600*600",
                        "thumbnailUrl": "http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpg%5Cthumbnail%5C0a78be5d3dee4a689ce21cadaddc5e1e.jpg"
                    }
                ],
                "advice": null,
                "freightRulesList": null,
                "inventoryMinimum": 0,
                "inventoryStatus": 0,
                "productionDate": null,
                "measureSpecVal": null,
                "guaranteePeriod": null,
                "guaranteePeriodUnit": null,
                "cartonId": null,
                "cartonName": null,
                "cartonVal": null
            }
        }
    res.json(getComm)
});

//商品新增接口
router.post('/save?supplierId=', function (req, res) {
    var saveComm =
        {
            "code": 1,
            "message": "添加商品成功",
            "data": null
        }
    res.json(saveComm)
});


//商品修改接口
router.put('/update?supplierId=', function (req, res) {
    var updateComm =
        {
            "code": 1,
            "message": "更新商品成功",
            "data": { }
        }
    res.json(updateComm)
});

//根据code69查询商品信息接口(commodity表）
router.get('/findByCode69/:code69', function (req, res) {
    var findByCode69 =
        {
            "code": 1,
            "message": "成功！",
            "data": {
                "id": 16,
                "code69": "6901028166546",
                "brandName": null,
                "categoryOneId": 39,
                "categoryOneName": "烟酒",
                "categoryTwoId": 63,
                "categoryTwoName": "香烟/雪茄",
                "categoryThreeId": 64,
                "categoryThreeName": "香烟",
                "name": "精品红杉树",
                "companyName": null,
                "originPlace": null,
                "imgeList": []
            }
        }
    res.json(findByCode69)
});
module.exports = router;
