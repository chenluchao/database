var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var movie={
        name:"金陵十三钗"
    }
    res.send(movie);
});

module.exports = router;