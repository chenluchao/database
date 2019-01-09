var express = require('express');
var router = express.Router();
var ctrl = require("../controllers/UserController");



//TODO:登录注册发短信接口
/* GET users listing. */
router.post('/login', ctrl.login)
    .get("/login",ctrl.login)
    .post('/logout', ctrl.logout)
    .get('/logout', ctrl.logout)
router.get('/sendsms', ctrl.sendSMS);
router.post('/reg', ctrl.reg);

//TODO:用户想看不想看
router.post('/like', ctrl.like_add)
    .get("/like",ctrl.like_get)
    .delete('/like', ctrl.like_delete);

//添加用户想看  post http://local:3000/users/like   ?movie_id=&uid=
//查询用户是否想看  get http://local:3000/users/like   ?movie_id=&uid=
//用户不想看  delete http://local:3000/users/like   ?movie_id=&uid=

module.exports = router;
