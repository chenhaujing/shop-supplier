var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});


router.get('/searchCommCategory/:pid', function (req, res) {
    var commCategory =
    [
        {
            "id": 47,
            "name": "纯果汁",
            "level": 3,
            "pid": 46
        },
        {
            "id": 49,
            "name": "果菜汁",
            "level": 3,
            "pid": 46
        },
        {
            "id": 50,
            "name": "水果汁",
            "level": 3,
            "pid": 46
        },
        {
            "id": 255,
            "name": "进口蔬果汁",
            "level": 3,
            "pid": 46
        }
    ]
    res.json(commCategory)
});

router.get('/searchAllCommCategory', function (req, res) {
    var searchAllCommCategory =
    {
        '食品保健食品':{
          '休闲食品':[
              '小零食',
                '膨化食品'
        ]             
                     }
    }
    res.json(searchAllCommCategory)
});



module.exports = router;
