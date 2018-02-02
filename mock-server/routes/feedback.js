/**
 * Created by acer on 2017/10/24.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* 提交反馈 */
router.post('/createFeedback', function (req, res) {
    var result =
        {
            "code": 1,
            "message": "成功",
            "data": null
        }
    res.json(result);
});

module.exports = router;
