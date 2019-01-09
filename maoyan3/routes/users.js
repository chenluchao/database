var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/UserController')

/* restful api */
router.get('/login', ctrl.login)
    .post('/login', ctrl.login)
    .post('/logout', ctrl.logout)
    .get('/logout', ctrl.logout)
router.get('/sendsms', ctrl.sendSMS);
router.post('/reg', ctrl.reg);

router.post('/like', ctrl.like_add)
    .get('/like', ctrl.like_get)
    .delete('/like', ctrl.like_delete)
//添加用户想看   post http://localhost:3000/users/like    ?movie_id=&uid=
//查询是否想看   get  http://localhost:3000/users/like    ?uid=
//用户不想看     delete http://localhost:3000/users/like  ?movie_id=&uid=
module.exports = router;
