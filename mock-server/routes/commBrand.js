var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});


router.get('/search', function (req, res) {
    var commBrand =
        {
        "code": 1,
        "message": "查询商品品牌成功",
        'data':[
        {
          id:1,
          name:'name1'
        },
        {
          id:2,
          name:'name2'
        },
        {
            id:3,
            name:'name3'
          }
        ]
        }
    res.json(commBrand)
});

module.exports = router;
