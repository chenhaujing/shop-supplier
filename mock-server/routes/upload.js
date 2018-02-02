var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/*图片上传*/
router.post('/file', function (req, res) {
    var uploadOuptput =
        {
            "code": 1,
            "message": "文件上传成功",
            "data":
                [
                {
                    "fileName": "bamboo1.png",
                    "minImgUrl": "http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/png%5Cthumbnail%5Ce5b76accfc2f41afb64088f93e63b1a1.jpg",
                    "type": "png",
                    "size": "128*128",
                    "url": "http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/png%5C8692feaf8a5d49808ec2a222b7b9e5c2.png"
                },
                {
                    "fileName": "bamboo2.png",
                    "minImgUrl": "http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/png%5Cthumbnail%5Cf4c67d3a715248e0986bb8c69baf7d57.jpg",
                    "type": "png",
                    "size": "128*128",
                    "url": "http://shopteststorage.blob.core.chinacloudapi.cn/shop-supplier/png%5Ce85a453f13354985944f28ef9f3f780b.png"
                }
            ]
        }
    res.json(uploadOuptput)
});
module.exports = router;
