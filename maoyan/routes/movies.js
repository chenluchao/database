var express = require('express');
var router = express.Router();

var $ = require('../controllers/MovieController')
/* GET users listing. */
router.get('/', $.list)//http://localhost:3000/movies?page=?
    .get('/:id', $.get)
    .post('/',$.add)
    .post('/:id',$.modify)
    .delete('/:id',$.delete)

module.exports = router;
