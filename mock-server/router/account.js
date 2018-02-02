var express = require('express')
var router = express.Router()

router.post('/account/auth', function (req, res) {
    var user =
        {
            'code': 1,
            'message': '',
            'data': {
                'user': {
                    'id': 20,
                    'username': 'admin',
                    'accountId': 108,
                    'lastPasswordResetDate': 1501396593000,
                    'logoutTime': 1501396593000,
                    'isAdmin': '0',
                    'authorities': []
                },
                'token': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE1MDI0MzEwNzU0MzMsImV4cCI6MTUwMzAzNTg3NTQzM30.PtrZa0CgcGflgVcGxI3c6h3BPnKIzQIhrjYleUYqdzsg8g9XYqWisQKuQqE5_WgHEq0yZ64eVZeqGGDMmrAB1ifyrHD9li7WW8sW7ymrJ0IHfn1SEVFGqykPZD1MQaFTaMHIBCPviueHguD6tJgUHnr-Jrtmsxve0EYSGA6fVTM'
            }
        }
    res.json(user)
})

router.get('/account/isAdmin', function (req, res) {
    var user =
        {'code': 1, 'message': '', 'data': {'isAdmin': '1'}}
    res.json(user)
})

router.get('/account/username', function (req, res) {
    var user =
        {'code': 1, 'message': '', 'data': {'username': '测试供应商001'}}
    res.json(user)
})

router.get('/account/search', function (req, res) {
    var user =
        {
            'accountId': 180,
            'userId': 170810,
            'providerName': '测试供应商001',
            'responsible': 'Curitis',
            'responsiblePhone': '13601222324',
            'license': '562549654865245585',
            'licenseTimeCreate': '2017-08-01',
            'licenseTimeEnd': '2019-05-07',
            'businessType': '批发和零售业',
            'registAddress': '上海市-上海市-静安区',
            'registAddressProvince': '上海市',
            'registAddressCity': '上海市',
            'registAddressDistrict': '静安区',
            'registerAddressDetail': '测试详细地址001-门牌号',
            'discount': null,
            'bankName': '中信银行',
            'bankNum': '62554658259658989',
            'bankUserName': '测试开户人001',
            'contractCreateDate': '2017-07-20',
            'contractEndDate': '2025-03-03',
            'remittanceType': '1',
            'remittanced': '30',
            'accountStatus': 1,
            'createDate': '2017-08-03',
            'updateDate': '2017-08-05',
            'remark': null,
            'balance': null,
            'income': null,
            'contractResponsible': 'Curitis002',
            'contractResponsiblePhone': '13601222324',
            'contractLicense': '665525865622545562',
            'contractLicenseCreate': '2017-01-01',
            'contractLicenseEnd': '2020-03-04',
            'contractRegisterAddress': '北京市-北京市-海淀区',
            'contractRegisterAddressProvince': '北京市',
            'contractRegisterAddressCity': '北京市',
            'contractRegisterAddressDistrict': '海淀区',
            'contractRegisterAddressDetail': '中关村新中关购物中心',
            'uploadMode': null,
            'smsCode': null,
            'areaList': [{'area': '静安区', 'province': '上海市', 'city': '上海市'}, {
                'area': '海淀区',
                'province': '北京市',
                'city': '北京市'
            }]
        }
    res.json(user)
})

router.post('/account/findPassword', function (req, res) {
    var user =
        {
            'code': 1,
            'message': ''
        }
    res.json(user)
})

router.get('/account/sendCode', function (req, res) {
    var user =
        {
            'code': 1,
            'message': ''
        }
    res.json(user)
})

router.get('/account/verifySmsCode', function (req, res) {
    var user =
        {
            'code': 1,
            'message': ''
        }
    res.json(user)
})

router.put('/account/updatePassword', function (req, res) {
    var user =
        {
            'code': 1,
            'message': ''
        }
    res.json(user)
})

router.get('/account/account', function (req, res) {
    var user =
        {
            "pageNum": 1,
            "pageSize": 10,
            "size": 10,
            "startRow": 1,
            "endRow": 10,
            "total": 32,
            "pages": 4,
            "list": [{
                "accountId": 241,
                "userId": 170872,
                "providerName": "项梁",
                "responsible": null,
                "responsiblePhone": null,
                "license": null,
                "licenseTimeCreate": null,
                "licenseTimeEnd": null,
                "businessType": null,
                "registAddress": "山西省-晋中市-寿阳县",
                "registAddressProvince": "山西省",
                "registAddressCity": "晋中市",
                "registAddressDistrict": "寿阳县",
                "registerAddressDetail": null,
                "discount": null,
                "bankName": null,
                "bankNum": null,
                "bankUserName": null,
                "contractCreateDate": "2017-08-02",
                "contractEndDate": "2017-08-17",
                "remittanceType": null,
                "remittanced": null,
                "accountStatus": null,
                "createDate": "2017-08-07",
                "updateDate": null,
                "remark": null,
                "balance": null,
                "income": null,
                "contractResponsible": "1231231",
                "contractResponsiblePhone": "15622558862",
                "contractLicense": null,
                "contractLicenseCreate": null,
                "contractLicenseEnd": null,
                "contractRegisterAddress": "福建省-莆田市-荔城区",
                "contractRegisterAddressProvince": "福建省",
                "contractRegisterAddressCity": "莆田市",
                "contractRegisterAddressDistrict": "荔城区",
                "contractRegisterAddressDetail": null,
                "uploadMode": null,
                "smsCode": null,
                "areaList": null
            }, {
                "accountId": 234,
                "userId": 170865,
                "providerName": "宁金鑫",
                "responsible": null,
                "responsiblePhone": null,
                "license": null,
                "licenseTimeCreate": null,
                "licenseTimeEnd": null,
                "businessType": null,
                "registAddress": "北京市-北京市-西城区",
                "registAddressProvince": "北京市",
                "registAddressCity": "北京市",
                "registAddressDistrict": "西城区",
                "registerAddressDetail": null,
                "discount": null,
                "bankName": null,
                "bankNum": null,
                "bankUserName": null,
                "contractCreateDate": "2017-08-02",
                "contractEndDate": "2017-08-03",
                "remittanceType": null,
                "remittanced": null,
                "accountStatus": null,
                "createDate": "2017-08-07",
                "updateDate": null,
                "remark": null,
                "balance": null,
                "income": null,
                "contractResponsible": "1231231231231231231231231231231231",
                "contractResponsiblePhone": "13379246250",
                "contractLicense": null,
                "contractLicenseCreate": null,
                "contractLicenseEnd": null,
                "contractRegisterAddress": "湖北省-荆州市-公安县",
                "contractRegisterAddressProvince": "湖北省",
                "contractRegisterAddressCity": "荆州市",
                "contractRegisterAddressDistrict": "公安县",
                "contractRegisterAddressDetail": null,
                "uploadMode": null,
                "smsCode": null,
                "areaList": null
            }, {
                "accountId": 233,
                "userId": 170864,
                "providerName": "我的测试测试测试",
                "responsible": null,
                "responsiblePhone": null,
                "license": null,
                "licenseTimeCreate": null,
                "licenseTimeEnd": null,
                "businessType": null,
                "registAddress": "河北省-邯郸市-峰峰矿区",
                "registAddressProvince": "河北省",
                "registAddressCity": "邯郸市",
                "registAddressDistrict": "峰峰矿区",
                "registerAddressDetail": null,
                "discount": null,
                "bankName": null,
                "bankNum": null,
                "bankUserName": null,
                "contractCreateDate": "2017-08-02",
                "contractEndDate": "2017-08-23",
                "remittanceType": null,
                "remittanced": null,
                "accountStatus": null,
                "createDate": "2017-08-07",
                "updateDate": null,
                "remark": null,
                "balance": null,
                "income": null,
                "contractResponsible": "xx",
                "contractResponsiblePhone": "18309226688",
                "contractLicense": null,
                "contractLicenseCreate": null,
                "contractLicenseEnd": null,
                "contractRegisterAddress": "辽宁省-本溪市-本溪满族自治县",
                "contractRegisterAddressProvince": "辽宁省",
                "contractRegisterAddressCity": "本溪市",
                "contractRegisterAddressDistrict": "本溪满族自治县",
                "contractRegisterAddressDetail": null,
                "uploadMode": null,
                "smsCode": null,
                "areaList": null
            }, {
                "accountId": 237,
                "userId": 170868,
                "providerName": "金龙鱼供应商",
                "responsible": null,
                "responsiblePhone": null,
                "license": null,
                "licenseTimeCreate": null,
                "licenseTimeEnd": null,
                "businessType": null,
                "registAddress": "陕西省-西安市-雁塔区",
                "registAddressProvince": "陕西省",
                "registAddressCity": "西安市",
                "registAddressDistrict": "雁塔区",
                "registerAddressDetail": null,
                "discount": null,
                "bankName": null,
                "bankNum": null,
                "bankUserName": null,
                "contractCreateDate": "2017-08-07",
                "contractEndDate": "2017-08-30",
                "remittanceType": null,
                "remittanced": null,
                "accountStatus": null,
                "createDate": "2017-08-07",
                "updateDate": null,
                "remark": null,
                "balance": null,
                "income": null,
                "contractResponsible": "金龙鱼",
                "contractResponsiblePhone": "15191426558",
                "contractLicense": null,
                "contractLicenseCreate": null,
                "contractLicenseEnd": null,
                "contractRegisterAddress": "山东省-日照市-莒县",
                "contractRegisterAddressProvince": "山东省",
                "contractRegisterAddressCity": "日照市",
                "contractRegisterAddressDistrict": "莒县",
                "contractRegisterAddressDetail": null,
                "uploadMode": null,
                "smsCode": null,
                "areaList": null
            }, {
                "accountId": 232,
                "userId": 170863,
                "providerName": "fdgdfshfh",
                "responsible": null,
                "responsiblePhone": null,
                "license": null,
                "licenseTimeCreate": null,
                "licenseTimeEnd": null,
                "businessType": null,
                "registAddress": "河北省-唐山市-路北区",
                "registAddressProvince": "河北省",
                "registAddressCity": "唐山市",
                "registAddressDistrict": "路北区",
                "registerAddressDetail": null,
                "discount": null,
                "bankName": null,
                "bankNum": null,
                "bankUserName": null,
                "contractCreateDate": "2017-08-02",
                "contractEndDate": "2017-08-11",
                "remittanceType": null,
                "remittanced": null,
                "accountStatus": null,
                "createDate": "2017-08-05",
                "updateDate": null,
                "remark": null,
                "balance": null,
                "income": null,
                "contractResponsible": "fhgfhg",
                "contractResponsiblePhone": "15529236200",
                "contractLicense": null,
                "contractLicenseCreate": null,
                "contractLicenseEnd": null,
                "contractRegisterAddress": "河南省-三门峡市-陕州区",
                "contractRegisterAddressProvince": "河南省",
                "contractRegisterAddressCity": "三门峡市",
                "contractRegisterAddressDistrict": "陕州区",
                "contractRegisterAddressDetail": null,
                "uploadMode": null,
                "smsCode": null,
                "areaList": null
            }, {
                "accountId": 181,
                "userId": 170860,
                "providerName": "测试供应商002-001",
                "responsible": null,
                "responsiblePhone": null,
                "license": null,
                "licenseTimeCreate": null,
                "licenseTimeEnd": null,
                "businessType": null,
                "registAddress": "陕西省-咸阳市-泾阳县",
                "registAddressProvince": "陕西省",
                "registAddressCity": "咸阳市",
                "registAddressDistrict": "泾阳县",
                "registerAddressDetail": null,
                "discount": null,
                "bankName": null,
                "bankNum": null,
                "bankUserName": null,
                "contractCreateDate": "2017-09-10",
                "contractEndDate": "2017-09-11",
                "remittanceType": null,
                "remittanced": null,
                "accountStatus": null,
                "createDate": "2017-08-05",
                "updateDate": null,
                "remark": null,
                "balance": null,
                "income": null,
                "contractResponsible": "刘扬002",
                "contractResponsiblePhone": "13062688672",
                "contractLicense": null,
                "contractLicenseCreate": null,
                "contractLicenseEnd": null,
                "contractRegisterAddress": "陕西省-西安市-雁塔区",
                "contractRegisterAddressProvince": "陕西省",
                "contractRegisterAddressCity": "西安市",
                "contractRegisterAddressDistrict": "雁塔区",
                "contractRegisterAddressDetail": null,
                "uploadMode": null,
                "smsCode": null,
                "areaList": null
            }, {
                "accountId": 221,
                "userId": 170851,
                "providerName": "宁金鑫供应商",
                "responsible": null,
                "responsiblePhone": null,
                "license": null,
                "licenseTimeCreate": null,
                "licenseTimeEnd": null,
                "businessType": null,
                "registAddress": "陕西省-西安市-雁塔区",
                "registAddressProvince": "陕西省",
                "registAddressCity": "西安市",
                "registAddressDistrict": "雁塔区",
                "registerAddressDetail": null,
                "discount": null,
                "bankName": null,
                "bankNum": null,
                "bankUserName": null,
                "contractCreateDate": "2017-08-03",
                "contractEndDate": "2017-08-08",
                "remittanceType": null,
                "remittanced": null,
                "accountStatus": null,
                "createDate": "2017-08-05",
                "updateDate": null,
                "remark": null,
                "balance": null,
                "income": null,
                "contractResponsible": "宁金鑫（合同信息法人代表）",
                "contractResponsiblePhone": "13379249221",
                "contractLicense": null,
                "contractLicenseCreate": null,
                "contractLicenseEnd": null,
                "contractRegisterAddress": "西藏自治区-山南地区-浪卡子县",
                "contractRegisterAddressProvince": "西藏自治区",
                "contractRegisterAddressCity": "山南地区",
                "contractRegisterAddressDistrict": "浪卡子县",
                "contractRegisterAddressDetail": null,
                "uploadMode": null,
                "smsCode": null,
                "areaList": null
            }, {
                "accountId": 222,
                "userId": 170852,
                "providerName": "在的的",
                "responsible": null,
                "responsiblePhone": null,
                "license": null,
                "licenseTimeCreate": null,
                "licenseTimeEnd": null,
                "businessType": null,
                "registAddress": "河北省-张家口市-蔚县",
                "registAddressProvince": "河北省",
                "registAddressCity": "张家口市",
                "registAddressDistrict": "蔚县",
                "registerAddressDetail": null,
                "discount": null,
                "bankName": null,
                "bankNum": null,
                "bankUserName": null,
                "contractCreateDate": "2017-08-01",
                "contractEndDate": "2017-08-30",
                "remittanceType": null,
                "remittanced": null,
                "accountStatus": null,
                "createDate": "2017-08-05",
                "updateDate": null,
                "remark": null,
                "balance": null,
                "income": null,
                "contractResponsible": "徐亮",
                "contractResponsiblePhone": "18325556665",
                "contractLicense": null,
                "contractLicenseCreate": null,
                "contractLicenseEnd": null,
                "contractRegisterAddress": "湖北省-咸宁市-嘉鱼县",
                "contractRegisterAddressProvince": "湖北省",
                "contractRegisterAddressCity": "咸宁市",
                "contractRegisterAddressDistrict": "嘉鱼县",
                "contractRegisterAddressDetail": null,
                "uploadMode": null,
                "smsCode": null,
                "areaList": null
            }, {
                "accountId": 223,
                "userId": 170853,
                "providerName": "徐浪两",
                "responsible": null,
                "responsiblePhone": null,
                "license": null,
                "licenseTimeCreate": null,
                "licenseTimeEnd": null,
                "businessType": null,
                "registAddress": "内蒙古自治区-赤峰市-林西县",
                "registAddressProvince": "内蒙古自治区",
                "registAddressCity": "赤峰市",
                "registAddressDistrict": "林西县",
                "registerAddressDetail": null,
                "discount": null,
                "bankName": null,
                "bankNum": null,
                "bankUserName": null,
                "contractCreateDate": "2017-08-03",
                "contractEndDate": "2017-08-23",
                "remittanceType": null,
                "remittanced": null,
                "accountStatus": null,
                "createDate": "2017-08-05",
                "updateDate": null,
                "remark": null,
                "balance": null,
                "income": null,
                "contractResponsible": "徐亮亮",
                "contractResponsiblePhone": "13259171336",
                "contractLicense": null,
                "contractLicenseCreate": null,
                "contractLicenseEnd": null,
                "contractRegisterAddress": "湖南省-怀化市-其它区",
                "contractRegisterAddressProvince": "湖南省",
                "contractRegisterAddressCity": "怀化市",
                "contractRegisterAddressDistrict": "其它区",
                "contractRegisterAddressDetail": null,
                "uploadMode": null,
                "smsCode": null,
                "areaList": null
            }, {
                "accountId": 224,
                "userId": 170854,
                "providerName": "111",
                "responsible": null,
                "responsiblePhone": null,
                "license": null,
                "licenseTimeCreate": null,
                "licenseTimeEnd": null,
                "businessType": null,
                "registAddress": "河北省-保定市-南市区",
                "registAddressProvince": "河北省",
                "registAddressCity": "保定市",
                "registAddressDistrict": "南市区",
                "registerAddressDetail": null,
                "discount": null,
                "bankName": null,
                "bankNum": null,
                "bankUserName": null,
                "contractCreateDate": "2017-08-04",
                "contractEndDate": "2017-08-29",
                "remittanceType": null,
                "remittanced": null,
                "accountStatus": null,
                "createDate": "2017-08-05",
                "updateDate": null,
                "remark": null,
                "balance": null,
                "income": null,
                "contractResponsible": "李洋阳",
                "contractResponsiblePhone": "18656998862",
                "contractLicense": null,
                "contractLicenseCreate": null,
                "contractLicenseEnd": null,
                "contractRegisterAddress": "河北省-邢台市-隆尧县",
                "contractRegisterAddressProvince": "河北省",
                "contractRegisterAddressCity": "邢台市",
                "contractRegisterAddressDistrict": "隆尧县",
                "contractRegisterAddressDetail": null,
                "uploadMode": null,
                "smsCode": null,
                "areaList": null
            }],
            "prePage": 0,
            "nextPage": 2,
            "isFirstPage": true,
            "isLastPage": false,
            "hasPreviousPage": false,
            "hasNextPage": true,
            "navigatePages": 8,
            "navigatepageNums": [1, 2, 3, 4],
            "navigateFirstPage": 1,
            "navigateLastPage": 4,
            "lastPage": 4,
            "firstPage": 1
        }
    res.json(user)
})


router.get('/account/get', function (req, res) {
    var user =
        [{"srId": 110000, "name": "北京市", "level": 0}, {"srId": 120000, "name": "天津市", "level": 0}, {
            "srId": 130000,
            "name": "河北省",
            "level": 0
        }, {"srId": 140000, "name": "山西省", "level": 0}, {"srId": 150000, "name": "内蒙古自治区", "level": 0}, {
            "srId": 210000,
            "name": "辽宁省",
            "level": 0
        }, {"srId": 220000, "name": "吉林省", "level": 0}, {"srId": 230000, "name": "黑龙江省", "level": 0}, {
            "srId": 310000,
            "name": "上海市",
            "level": 0
        }, {"srId": 320000, "name": "江苏省", "level": 0}, {"srId": 330000, "name": "浙江省", "level": 0}, {
            "srId": 340000,
            "name": "安徽省",
            "level": 0
        }, {"srId": 350000, "name": "福建省", "level": 0}, {"srId": 360000, "name": "江西省", "level": 0}, {
            "srId": 370000,
            "name": "山东省",
            "level": 0
        }, {"srId": 410000, "name": "河南省", "level": 0}, {"srId": 420000, "name": "湖北省", "level": 0}, {
            "srId": 430000,
            "name": "湖南省",
            "level": 0
        }, {"srId": 440000, "name": "广东省", "level": 0}, {
            "srId": 450000,
            "name": "广西壮族自治区",
            "level": 0
        }, {"srId": 460000, "name": "海南省", "level": 0}, {"srId": 500000, "name": "重庆市", "level": 0}, {
            "srId": 510000,
            "name": "四川省",
            "level": 0
        }, {"srId": 520000, "name": "贵州省", "level": 0}, {"srId": 530000, "name": "云南省", "level": 0}, {
            "srId": 540000,
            "name": "西藏自治区",
            "level": 0
        }, {"srId": 610000, "name": "陕西省", "level": 0}, {"srId": 620000, "name": "甘肃省", "level": 0}, {
            "srId": 630000,
            "name": "青海省",
            "level": 0
        }, {"srId": 640000, "name": "宁夏回族自治区", "level": 0}, {
            "srId": 650000,
            "name": "新疆维吾尔自治区",
            "level": 0
        }, {"srId": 710000, "name": "台湾省", "level": 0}, {
            "srId": 810000,
            "name": "香港特别行政区",
            "level": 0
        }, {"srId": 820000, "name": "澳门特别行政区", "level": 0}]
    res.json(user)
})


router.delete('/account/delete', function (req, res) {
    var user =
        {
            'code': 1,
            'message': ''
        }
    res.json(user)
})


router.get('/account/search0', function (req, res) {
    var user =
        {
            "accountId": 241,
            "userId": 170872,
            "providerName": "项梁",
            "responsible": "存储",
            "responsiblePhone": "15809555566",
            "license": "12312313",
            "licenseTimeCreate": "2017-08-01",
            "licenseTimeEnd": "2017-08-29",
            "businessType": "QT",
            "registAddress": "140000-140700-140725",
            "registAddressProvince": "140000",
            "registAddressCity": "140700",
            "registAddressDistrict": "140725",
            "registerAddressDetail": "123123",
            "discount": null,
            "bankName": "宁波银行",
            "bankNum": "123123123",
            "bankUserName": "123123",
            "contractCreateDate": "2017-08-02",
            "contractEndDate": "2017-08-17",
            "remittanceType": "2",
            "remittanced": "22",
            "accountStatus": 1,
            "createDate": "2017-08-07",
            "updateDate": "2017-08-07",
            "remark": null,
            "balance": null,
            "income": null,
            "contractResponsible": "1231231",
            "contractResponsiblePhone": "15622558862",
            "contractLicense": "123123",
            "contractLicenseCreate": "2017-08-03",
            "contractLicenseEnd": "2017-08-17",
            "contractRegisterAddress": "350000-350300-350304",
            "contractRegisterAddressProvince": "350000",
            "contractRegisterAddressCity": "350300",
            "contractRegisterAddressDistrict": "350304",
            "contractRegisterAddressDetail": "12312313",
            "uploadMode": null,
            "smsCode": null,
            "areaList": null
        }
    res.json(user)
})

router.get('/account/selectBank', function (req, res) {
    var user =
        ["工商银行", "农业银行", "建设银行", "招商银行", "中国银行", "交通银行", "民生银行", "邮政储蓄银行", "广东发展银行", "浦东发展银行", "中信银行", "平安银行", "上海银行", "渤海银行", "光大银行", "宁波银行", "东亚银行", "成都银行", "华夏银行", "南京银行", "北京银行"]
    res.json(user)
})

router.put('/account/update', function (req, res) {
    var user =
        {
            'code': 1,
            'message': ''
        }
    res.json(user)
})

router.get('/account/selectHangYeDict', function (req, res) {
    var user =
        [{"id": null, "dictType": null, "name": "批发和零售业", "code": "PFLS", "createTime": null}, {
            "id": null,
            "dictType": null,
            "name": "其他",
            "code": "QT",
            "createTime": null
        }]
    res.json(user)
})

router.post('/comm/save', function (req, res) {
    var user =
        {
            'code': 1,
            'message': ''
        }
    res.json(user)
})

router.get('/account/LoginPhone', function (req, res) {
    var user =
        {
            "code": 1,
            "message": "",
            "data":  "17691187156"
        }

    res.json(user)
})


router.get('/account/selectAccountBalance/:userId', function (req, res) {
    var user =
        {
            "code":1,   //返回状态
            "message":"成功", //返回日志
            "data":{
                "balance":"23.54" //用户余额
            }
        }

    res.json(user)
})

    /*获取消息列表接口*/
router.get('/notification/getPage', function (req, res) {
    var user =
        {
           "code":1,
            "message":"成功",
            "data":{
               "pageNum":1, //当前页码
                "pageSize":5,    //每页显示条数
                "total":1,  //记录总条数
                "page":1,    //总页数
                "list":[
                    {
                        "notifiId":1, // 消息通知ID
                        "notifiDetail":"预祝广大用户在新的一年生意兴隆，财源滚滚",//标题
                        "comment": "一段html代码", //内容
                        "createdAt":"2017-8-16",    //创建时间
                        "sigin":"gGVPCm2F" //系统消息标识
                    }
                ]
            }
        }

    res.json(user)
})
    /*消息删除接口*/
router.post('/notification/deleteBySigin', function (req, res) {
    var user =
        {
            'code': 1,
            'message': '成功',
            'data':null
        }
    res.json(user)
})
    /*统计已入驻供应商数量接口*/
router.get('/account/AccountNumber', function (req, res) {
    var user =
        {
            'code': 1,
            'message': '成功',
            'data':3
        }
    res.json(user)
})
    /*消息发送接口*/
router.post('/notification/createNotifi', function (req, res) {
    var user =
        {
            'code': 1,
            'message': '成功',
            'data':null
        }
    res.json(user)
})
/*消息跑马灯显示*/
router.get('/marqueeShow', function (req, res) {
    var user =
        {
            'code': 1,
            'message': '成功',
            'data':"重要通知:通知各位用户，平台晚12点维护，给你带来不便请谅解!"
        }
    res.json(user)
})

router.post('/account/uploadContract', function (req, res) {
    var user =
        {
            "code": 1,
            "message": "文件上传成功",
            "data": {
                "fileName": "2017/8/18/b2f36bcb742245008726e934859719ea.docx",
                "fileUrl": "http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/2017/8/18/b2f36bcb742245008726e934859719ea.docx"
            }
        }
    res.json(user)
})



module.exports = router


