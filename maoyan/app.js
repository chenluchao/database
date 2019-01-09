var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var moviesRouter = require('./routes/movies');
var ordersRouter = require('./routes/orders');

var app = express();

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//------------------------------------session
app.use(session({
    secret: '123456',
    name: 'session-id',//这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 80000 },//设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,
}));
//-----------------------------------------拦截器


// app.use('*',function(req,res,next){
//     let url = req.baseUrl
//     if(!url.startsWith('/users/login')){//所有的非登录请求
//         let user = req.session.user
//         if(!user){
//             res.send({code:0,msg:"请重新登录"})
//         }else{
//             next()
//         }
//     }else{
//         next()
//     }
// })


app.use('/login', indexRouter);
app.use('/users', usersRouter);
app.use('/movies', moviesRouter);
app.use('/orders', ordersRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler

module.exports = app;
