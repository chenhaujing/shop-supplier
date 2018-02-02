var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/**
 * 登录接口
 */
router.post('/auth', function(req, res) {
    var user = {
        'code': 1,
        'message': '',
        'data': {
            'user': {
                'id': 20,
                'username': 'admin',
                'accountId': 108,
                'lastPasswordResetDate': 1501396593000,
                'logoutTime': 1501396593000,
                'isAdmin': '1',
                'authorities': []
            },
            'token': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE1MDI0MzEwNzU0MzMsImV4cCI6MTUwMzAzNTg3NTQzM30.PtrZa0CgcGflgVcGxI3c6h3BPnKIzQIhrjYleUYqdzsg8g9XYqWisQKuQqE5_WgHEq0yZ64eVZeqGGDMmrAB1ifyrHD9li7WW8sW7ymrJ0IHfn1SEVFGqykPZD1MQaFTaMHIBCPviueHguD6tJgUHnr-Jrtmsxve0EYSGA6fVTM'
        }
    }
    res.json(user)
});

/**
 * 登出接口
 */
router.post('/logout', function(req, res) {
    var user = {
        "code": 0,
        "data": null,
        "message": "登出成功"
    }
    res.json(user)
});
/**
 * 供应商添加接口
 */
router.post('/save', function(req, res) {
    var user = {
        "code": 1, //返回状态
        "message": "用户和供应商添加成功！", //返回信息
    }

    res.json(user)
});
/**
 * 供应商添加接口
 */
router.put('/update', function(req, res) {
    var user = {
        "code": 1,
        "message": "修改供应商和用户成功"
    }

    res.json(user)
});

/**
 * 统计已入住供应商数量
 */
router.get('/AccountNumber', function(req, res) {
    var user = {
        "code": 1,
        "message": "查询成功",
        "data": 8
    }

    res.json(user)
});
/**
 * 查询供应商列表
 */
router.get('/findAccount', function(req, res) {
    var user = {
        "pageNum": 1,
        "pageSize": 10,
        "size": 8,
        "startRow": 1,
        "endRow": 8,
        "total": 8,
        "pages": 1,
        "list": [{
                "accountId": 262,
                "userId": 170902,
                "providerName": "17791364497",
                "responsible": "17791364497",
                "responsiblePhone": "17791364497",
                "license": null,
                "licenseTimeCreate": null,
                "licenseTimeEnd": null,
                "businessType": null,
                "registAddress": "陕西省-西安市-临潼区",
                "registAddressProvince": "陕西省",
                "registAddressCity": "西安市",
                "registAddressDistrict": "临潼区",
                "registerAddressDetail": null,
                "discount": null,
                "bankName": null,
                "bankNum": null,
                "bankUserName": null,
                "contractCreateDate": "2017-10-24",
                "contractEndDate": "2025-10-31",
                "remittanceType": null,
                "remittanced": null,
                "accountStatus": 1,
                "createDate": "2017-10-24 10:37:29",
                "updateDate": "2017-10-24 10:37:29",
                "remark": null,
                "balance": null,
                "income": null,
                "contractResponsible": null,
                "contractResponsiblePhone": null,
                "contractLicense": null,
                "contractLicenseCreate": null,
                "contractLicenseEnd": null,
                "contractRegisterAddress": "陕西省-西安市-临潼区",
                "contractRegisterAddressProvince": "陕西省",
                "contractRegisterAddressCity": "西安市",
                "contractRegisterAddressDistrict": "临潼区",
                "contractRegisterAddressDetail": null,
                "contractStatus": 0,
                "uploadMode": null,
                "smsCode": null,
                "areaList": null,
                "contractOriginalName": null,
                "contractOriginal": null,
                "contractName": null,
                "lastSettlementDate": null,
                "servicePhone": null,
                "monthAgoType": 0,
                "freightRules": 0,
                "qualificationStatus": 0
            },
            {
                "accountId": 261,
                "userId": 170901,
                "providerName": "李小超",
                "responsible": "李小超",
                "responsiblePhone": "18911719416",
                "license": null,
                "licenseTimeCreate": null,
                "licenseTimeEnd": null,
                "businessType": null,
                "registAddress": "广东省-深圳市-宝安区",
                "registAddressProvince": "广东省",
                "registAddressCity": "深圳市",
                "registAddressDistrict": "宝安区",
                "registerAddressDetail": null,
                "discount": null,
                "bankName": null,
                "bankNum": null,
                "bankUserName": null,
                "contractCreateDate": "2017-10-16",
                "contractEndDate": "2019-10-16",
                "remittanceType": null,
                "remittanced": null,
                "accountStatus": 1,
                "createDate": "2017-10-16 15:06:51",
                "updateDate": "2017-10-16 19:09:11",
                "remark": null,
                "balance": null,
                "income": null,
                "contractResponsible": null,
                "contractResponsiblePhone": null,
                "contractLicense": null,
                "contractLicenseCreate": null,
                "contractLicenseEnd": null,
                "contractRegisterAddress": "广东省-深圳市-宝安区",
                "contractRegisterAddressProvince": "广东省",
                "contractRegisterAddressCity": "深圳市",
                "contractRegisterAddressDistrict": "宝安区",
                "contractRegisterAddressDetail": null,
                "contractStatus": 0,
                "uploadMode": null,
                "smsCode": null,
                "areaList": null,
                "contractOriginalName": null,
                "contractOriginal": null,
                "contractName": null,
                "lastSettlementDate": null,
                "servicePhone": null,
                "monthAgoType": 0,
                "freightRules": 0,
                "qualificationStatus": 0
            },
            {
                "accountId": 250,
                "userId": 170884,
                "providerName": "suixin",
                "responsible": "suixin",
                "responsiblePhone": "15202417754",
                "license": null,
                "licenseTimeCreate": null,
                "licenseTimeEnd": null,
                "businessType": null,
                "registAddress": "陕西省-西安市-新城区",
                "registAddressProvince": "陕西省",
                "registAddressCity": "西安市",
                "registAddressDistrict": "新城区",
                "registerAddressDetail": null,
                "discount": null,
                "bankName": null,
                "bankNum": null,
                "bankUserName": null,
                "contractCreateDate": "2017-09-14",
                "contractEndDate": "2017-09-30",
                "remittanceType": null,
                "remittanced": null,
                "accountStatus": 2,
                "createDate": "2017-09-14 14:50:30",
                "updateDate": "2017-10-15 00:00:00",
                "remark": null,
                "balance": null,
                "income": null,
                "contractResponsible": null,
                "contractResponsiblePhone": null,
                "contractLicense": null,
                "contractLicenseCreate": null,
                "contractLicenseEnd": null,
                "contractRegisterAddress": "北京市-北京市-西城区",
                "contractRegisterAddressProvince": "北京市",
                "contractRegisterAddressCity": "北京市",
                "contractRegisterAddressDistrict": "西城区",
                "contractRegisterAddressDetail": null,
                "contractStatus": 2,
                "uploadMode": null,
                "smsCode": null,
                "areaList": null,
                "contractOriginalName": null,
                "contractOriginal": null,
                "contractName": null,
                "lastSettlementDate": null,
                "servicePhone": null,
                "monthAgoType": 0,
                "freightRules": 0,
                "qualificationStatus": 1
            },
            {
                "accountId": 257,
                "userId": 170892,
                "providerName": "测试账号",
                "responsible": "高改莹",
                "responsiblePhone": "18092025244",
                "license": null,
                "licenseTimeCreate": null,
                "licenseTimeEnd": null,
                "businessType": null,
                "registAddress": "北京市-北京市-东城区",
                "registAddressProvince": "北京市",
                "registAddressCity": "北京市",
                "registAddressDistrict": "东城区",
                "registerAddressDetail": null,
                "discount": null,
                "bankName": null,
                "bankNum": null,
                "bankUserName": null,
                "contractCreateDate": "2017-10-11",
                "contractEndDate": "2017-10-31",
                "remittanceType": null,
                "remittanced": null,
                "accountStatus": 2,
                "createDate": "2017-10-11 19:06:55",
                "updateDate": "2017-10-12 01:41:49",
                "remark": null,
                "balance": null,
                "income": null,
                "contractResponsible": null,
                "contractResponsiblePhone": null,
                "contractLicense": null,
                "contractLicenseCreate": null,
                "contractLicenseEnd": null,
                "contractRegisterAddress": "北京市-北京市-东城区",
                "contractRegisterAddressProvince": "北京市",
                "contractRegisterAddressCity": "北京市",
                "contractRegisterAddressDistrict": "东城区",
                "contractRegisterAddressDetail": null,
                "contractStatus": 1,
                "uploadMode": null,
                "smsCode": null,
                "areaList": null,
                "contractOriginalName": null,
                "contractOriginal": null,
                "contractName": null,
                "lastSettlementDate": null,
                "servicePhone": null,
                "monthAgoType": 0,
                "freightRules": 0,
                "qualificationStatus": 0
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

    res.json(user)
});
/**
 * 根据id查询供应商（返回省市区汉字）
 */
router.get('/search', function(req, res) {
    var user = {
        "accountId": 250,
        "userId": 170884,
        "providerName": "suixin",
        "responsible": "suixin",
        "responsiblePhone": "15202417754",
        "license": "123456",
        "licenseTimeCreate": 1505318400000,
        "licenseTimeEnd": 1663689600000,
        "businessType": null,
        "registAddress": "陕西省-西安市-新城区",
        "registAddressProvince": "陕西省",
        "registAddressCity": "西安市",
        "registAddressDistrict": "新城区",
        "registerAddressDetail": "水岸东方小区",
        "discount": null,
        "bankName": "工商银行",
        "bankNum": "222233334444222211",
        "bankUserName": "sui xin",
        "contractCreateDate": "2017-09-14",
        "contractEndDate": "2017-09-30",
        "remittanceType": "1",
        "remittanced": "15",
        "accountStatus": 2,
        "createDate": "2017-09-14 14:50:30",
        "updateDate": "2017-10-15 00:00:00",
        "remark": null,
        "balance": 0,
        "income": null,
        "contractResponsible": "隋鑫",
        "contractResponsiblePhone": "15202417754",
        "contractLicense": "123456",
        "contractLicenseCreate": 1505318400000,
        "contractLicenseEnd": 1600012800000,
        "contractRegisterAddress": "北京市-北京市-西城区",
        "contractRegisterAddressProvince": "北京市",
        "contractRegisterAddressCity": "北京市",
        "contractRegisterAddressDistrict": "西城区",
        "contractRegisterAddressDetail": "水岸东方小区",
        "contractStatus": 2,
        "uploadMode": null,
        "smsCode": null,
        "areaList": [{
                "area": "新城区",
                "province": "陕西省",
                "city": "西安市"
            },
            {
                "area": "西城区",
                "province": "北京市",
                "city": "北京市"
            }
        ],
        "contractOriginalName": "2017/9/30/cc08a17cfe274b5e83db67dd28866cd5.管理系统20170705.pdf",
        "contractOriginal": "http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/2017/9/30/cc08a17cfe274b5e83db67dd28866cd5.管理系统20170705.pdf",
        "contractName": "进货平台-供应商.管理系统20170705.pdf",
        "lastSettlementDate": null,
        "servicePhone": null,
        "monthAgoType": 0,
        "freightRules": 0,
        "qualificationStatus": 0
    }
    res.json(user)
})

router.get('/search0', function(req, res) {
    var user = {
        "accountId": 250,
        "userId": 170884,
        "providerName": "suixin",
        "responsible": "suixin",
        "responsiblePhone": "15202417754",
        "license": "123456",
        "licenseTimeCreate": 1505318400000,
        "licenseTimeEnd": 1663689600000,
        "businessType": "PFLS",
        "registAddress": "610000-610100-610102",
        "registAddressProvince": "610000",
        "registAddressCity": "610100",
        "registAddressDistrict": "610102",
        "registerAddressDetail": "水岸东方小区",
        "discount": null,
        "bankName": "工商银行",
        "bankNum": "222233334444222211",
        "bankUserName": "sui xin",
        "contractCreateDate": "2017-09-14",
        "contractEndDate": "2017-09-30",
        "remittanceType": "1",
        "remittanced": "15",
        "accountStatus": 2,
        "createDate": "2017-09-14 14:50:30",
        "updateDate": "2017-10-15 00:00:00",
        "remark": null,
        "balance": 0,
        "income": null,
        "contractResponsible": "隋鑫",
        "contractResponsiblePhone": "15202417754",
        "contractLicense": "123456",
        "contractLicenseCreate": 1505318400000,
        "contractLicenseEnd": 1600012800000,
        "contractRegisterAddress": "110000-110100-110102",
        "contractRegisterAddressProvince": "110000",
        "contractRegisterAddressCity": "110100",
        "contractRegisterAddressDistrict": "110102",
        "contractRegisterAddressDetail": "水岸东方小区",
        "contractStatus": 2,
        "uploadMode": null,
        "smsCode": null,
        "areaList": null,
        "contractOriginalName": "2017/9/30/cc08a17cfe274b5e83db67dd28866cd5.管理系统20170705.pdf",
        "contractOriginal": "http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/2017/9/30/cc08a17cfe274b5e83db67dd28866cd5.管理系统20170705.pdf",
        "contractName": "进货平台-供应商.管理系统20170705.pdf",
        "lastSettlementDate": null,
        "servicePhone": null,
        "monthAgoType": 0,
        "freightRules": 0,
        "qualificationStatus": 0
    }
    res.json(user)
})

/**
 * 获取admin标记
 */
router.get('/isAdmin', function(req, res) {
    var user = {
        "code": 1,
        "message": "",
        "data": { "isAdmin": "1" }
    }
    res.json(user)
})
/**
 * 获取获取当前登录供应商名
 */
router.get('/username', function(req, res) {
    var user = {
        "code": 1,
        "message": "",
        "data": { "username": "测试供应商001" }
    }
    res.json(user)
})
/**
 * 发送验证码
 */
router.get('/sendCode', function(req, res) {
    var user = {
        "code": 1,
        "message": "发送成功"
    }
    res.json(user)
})
/**
 * 检验验证码
 */
router.get('/verifySmsCode/:code', function(req, res) {
    var user = {
        "code": 1,
        "message": "验证通过"
    }
    res.json(user)
})
/**
 * 修改密码
 */
router.post('/updatePassword', function(req, res) {
    var user = {
        "code": 1,
        "message": "密码修改成功"
    }
    res.json(user)
})

/**
 * 忘记密码
 */
router.get('/findPassword/:tel', function(req, res) {
    var user = {
        "code": 1,
        "message": "发送成功",
        "data": null
    }
    res.json(user)
})

/**
 * 查询当前登录用户手机号码
 */
router.get('/LoginPhone', function(req, res) {
    var user = {
        "code": 1,
        "message": "查询成功",
        "data": "13888888888"
    }
    res.json(user)
})
/**
 * 获取地区下级列表
 */
router.get('/get', function(req, res) {
    var user = [{
            "srId": 110000,
            "name": "北京市",
            "level": 0
        },
        {
            "srId": 120000,
            "name": "天津市",
            "level": 0
        },
        {
            "srId": 130000,
            "name": "河北省",
            "level": 0
        },
        {
            "srId": 140000,
            "name": "山西省",
            "level": 0
        },
        {
            "srId": 150000,
            "name": "内蒙古自治区",
            "level": 0
        },
        {
            "srId": 210000,
            "name": "辽宁省",
            "level": 0
        },
        {
            "srId": 220000,
            "name": "吉林省",
            "level": 0
        },
        {
            "srId": 230000,
            "name": "黑龙江省",
            "level": 0
        },
        {
            "srId": 310000,
            "name": "上海市",
            "level": 0
        },
        {
            "srId": 320000,
            "name": "江苏省",
            "level": 0
        },
        {
            "srId": 330000,
            "name": "浙江省",
            "level": 0
        },
        {
            "srId": 340000,
            "name": "安徽省",
            "level": 0
        },
        {
            "srId": 350000,
            "name": "福建省",
            "level": 0
        },
        {
            "srId": 360000,
            "name": "江西省",
            "level": 0
        },
        {
            "srId": 370000,
            "name": "山东省",
            "level": 0
        },
        {
            "srId": 410000,
            "name": "河南省",
            "level": 0
        },
        {
            "srId": 420000,
            "name": "湖北省",
            "level": 0
        },
        {
            "srId": 430000,
            "name": "湖南省",
            "level": 0
        },
        {
            "srId": 440000,
            "name": "广东省",
            "level": 0
        },
        {
            "srId": 450000,
            "name": "广西壮族自治区",
            "level": 0
        },
        {
            "srId": 460000,
            "name": "海南省",
            "level": 0
        },
        {
            "srId": 500000,
            "name": "重庆市",
            "level": 0
        },
        {
            "srId": 510000,
            "name": "四川省",
            "level": 0
        },
        {
            "srId": 520000,
            "name": "贵州省",
            "level": 0
        },
        {
            "srId": 530000,
            "name": "云南省",
            "level": 0
        },
        {
            "srId": 540000,
            "name": "西藏自治区",
            "level": 0
        },
        {
            "srId": 610000,
            "name": "陕西省",
            "level": 0
        },
        {
            "srId": 620000,
            "name": "甘肃省",
            "level": 0
        },
        {
            "srId": 630000,
            "name": "青海省",
            "level": 0
        },
        {
            "srId": 640000,
            "name": "宁夏回族自治区",
            "level": 0
        },
        {
            "srId": 650000,
            "name": "新疆维吾尔自治区",
            "level": 0
        },
        {
            "srId": 710000,
            "name": "台湾省",
            "level": 0
        },
        {
            "srId": 810000,
            "name": "香港特别行政区",
            "level": 0
        },
        {
            "srId": 820000,
            "name": "澳门特别行政区",
            "level": 0
        }
    ]
    res.json(user)
})

/**
 * 获取银行信息
 */
router.get('/selectBank', function(req, res) {
    var user = ["工商银行", "农业银行", "建设银行", "招商银行", "中国银行", "交通银行", "民生银行", "邮政储蓄银行", "广东发展银行", "浦东发展银行", "中信银行", "平安银行", "上海银行", "渤海银行", "光大银行", "宁波银行", "东亚银行", "成都银行", "华夏银行", "南京银行", "北京银行"]
    res.json(user)
})

/**
 * 获取行业信息
 */
router.get('/selectHangYe', function(req, res) {
    var user = [
        "批发和零售业",
        "其他"
    ]
    res.json(user)
})

/**
 * 获取行业信息(字典项)
 */
router.get('/selectHangYeDict', function(req, res) {
    var user = [{
            "id": null,
            "dictType": null,
            "name": "批发和零售业",
            "code": "PFLS",
            "createTime": null
        },
        {
            "id": null,
            "dictType": null,
            "name": "其他",
            "code": "QT",
            "createTime": null
        }
    ]
    res.json(user)
})
/**
 * 供应商合同上传
 */
router.post('/uploadContract', function(req, res) {
    var user = {
        "code": 1,
        "message": "文件上传成功",
        "data": {
            "fileName": "2017/8/18/b2f36bcb742245008726e934859719ea.docx",
            "fileUrl": "http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/2017/8/18/b2f36bcb742245008726e934859719ea.docx"
        }
    }
    res.json(user)
})

/**
 * 供应商合同下载
 */
router.get('/downloadContract', function(req, res) {
    var user = {
        "code": 1,
        "message": "文件下载成功",
        "data": null
    }
    res.json(user)
})

/**
 * 根据商户ID修改当前默认运费规则
 */
router.post('/updateFreightRules', function(req, res) {
    var user = {
        "code": 1,
        "message": "成功",
        "data": null
    }
    res.json(user)
})


/**
 * 根据用户ID查询用户的实时余额
 */
router.get('/selectAccountBalance', function(req, res) {
    var result = {
        "code": 1,
        "message": "成功",
        "data": {
            "balance": "2.654.211.52"
        }
    }
    res.json(user)
})


module.exports = router;
