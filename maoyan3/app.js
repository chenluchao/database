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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//----------------------------------------
app.use(session({
    secret: '123456',
    name: 'session-id',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 8000000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,
}));

//如果服务器开启了session，浏览器跟服务器第一次交互的应答Response，都会得到sessionId（通过set-cookie得到的sessionId）
//之后的任何请求，浏览器的请求Requset都会带上sessionId
//--------拦截器   session判断--------
app.use('*',function(req,res,next){
    let url = req.baseUrl
    if(!url.startsWith('/users/login')){//所有的非登录请求
        let user = req.session.user
        if(!user){
            res.send({code:0,msg:"请重新登录"})
        }else{
            next()
        }
    }else{
        next()
    }
})
//-----------------------------------------
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/movies', moviesRouter);
app.use('/orders', ordersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
