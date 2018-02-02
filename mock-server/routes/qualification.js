var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

//资质上传
router.post('/upload', function (req, res) {
    var upload =
    {
        "code": 1,
        "message": "文件上传成功",
        "data": {
          "fileName": "ceshi.jpg",
          "url": "http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpg%5C147b3415f3d04eff898fd244257e06cd.jpg",
          "minImgUrl": "http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpg%5Cthumbnail%5Cde355fa80a7d4252a355e97a1627e462.jpg",
          "cloudName": "jpg%5C147b3415f3d04eff898fd244257e06cd.jpg",
          "minCloudName": "jpg%5Cthumbnail%5Cde355fa80a7d4252a355e97a1627e462.jpg"
        }
      }
    res.json(upload)
});
//查询资质列表
router.get('/search', function (req, res) {
    var search =
    {
        "code": 1,
        "message": "查询成功",
        "data": {
          "pageNum": 1,
          "pageSize": 10,
          "size": 10,
          "startRow": 1,
          "endRow": 10,
          "total": 1,
          "pages": 1,
          "list": [
            {
              "id": 50,
              "accountId": 1,
              "providerName": "管理员",
              "responsiblePhone": "13600000000",
              "province": "河南省",
              "city": "河南省",
              "district": "山东省",
              "createTime": "2017-10-17 16:37:12",
              "updateTime": "2017-10-17 16:37:12",
              "qualificationStatus": "1"
            },
          ],
          "prePage": 0,
          "nextPage": 0,
          "isFirstPage": true,
          "isLastPage": false,
          "hasPreviousPage": false,
          "hasNextPage": true,
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
    res.json(search)
});
//根据供应商id获取资质详情
router.get('/getByAccountId', function (req, res) {
    var getByAccountId =
    {
        "code": 1,
        "message": "根据供应商id查询供应商资质详情成功",
        "data": [
          {
            "id": 65,
            "reason": "12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
            "qualificationType": "1",
            "cloudName": "jpeg%5C2745f54b94664133aa33bb2204432574.jpeg",
            "minCloudName": "jpeg%5Cthumbnail%5C29a03e9aa146442fa17b89ea1aacfe53.jpg",
            "fileName": "yumminky-skycons-mix-09.jpeg",
            "url": "http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpeg%5C2745f54b94664133aa33bb2204432574.jpeg",
            "minImgUrl": "http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpeg%5Cthumbnail%5C29a03e9aa146442fa17b89ea1aacfe53.jpg",
            "qualificationStatus": "3",
            "isRead": null
          },
          {
            "id": 65,
            "reason": "12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
            "qualificationType": "2",
            "cloudName": "jpeg%5C92fd4f9260b7496e820891fa8ebad031.jpeg",
            "minCloudName": "jpeg%5Cthumbnail%5C649055f7487d48aca46ccf4973f00a4f.jpg",
            "fileName": "yumminky-skycons-mix-06.jpeg",
            "url": "http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpeg%5C92fd4f9260b7496e820891fa8ebad031.jpeg",
            "minImgUrl": "http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/jpeg%5Cthumbnail%5C649055f7487d48aca46ccf4973f00a4f.jpg",
            "qualificationStatus": "3",
            "isRead": null
          }
        ]
      }
    res.json(getByAccountId)
});
//查询登录供应商的资质状态
router.get('/getAccountQualificationStatus', function (req, res) {
    var getAccountQualificationStatus =
    {
        "code": 1,
        "message": "查询成功",
        "data": 0
    }
    res.json(getAccountQualificationStatus)
});
//更新资质状态消息已读状态
router.get('/updateQualificationMessageRead', function (req, res) {
    var updateQualificationMessageRead =
    {
        "code": 1,
        "message": "查询成功",
        "data": 1
    }
    res.json(updateQualificationMessageRead)
});
//更新资质状态,时间,拒绝原因
router.put('/updateQualificationStatus', function (req, res) {
    var updateQualificationStatus =
    {
        "code": 1,
        "message": "更新成功",
        "data": null
    }
    res.json(updateQualificationStatus)
});

router.post('/save', function (req, res) {
    var save =
    {
        "code": 1,
        "message": "添加供应商资质成功",
        "data": null
    }
    res.json(save)
});

router.put('/delete/:accountID', function (req, res) {
    var deleteQualification =
    {
        "code": 1,
        "message": "删除供应商资质信息成功",
        "data": null
    }
    res.json(deleteQualification)
});

module.exports = router;