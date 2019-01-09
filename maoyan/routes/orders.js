var express = require('express');
var router = express.Router();

var $ = require('../controllers/OrderController')
/* GET users listing. */
router.get('/', $.list)//http://localhost:3000/orders?page=?
    .get('/:id', $.get)//http://localhost:3000/orders/1
    .post('/',$.add)
    .post('/:id',$.modify)
    .delete('/:id',$.delete)

module.exports = router;
