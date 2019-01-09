const dao = require('../dao/UserDao')
const token=require('../public/javascripts/token')

//TODO: 发送信息接口
exports.sendSMS=function(req, res, next) {
    let reqdata = req.query
    let{phone}=reqdata
    console.log(phone)
    var ret={
        code:1,msg:"send sms ok"
    }
    res.send(ret);
}

//TODO: 注册接口
exports.reg=async function(req, res, next) {
    //1. 取请求参数
    let user= req.body

    //解构赋值,变量名称必须跟对象中的属性名称一样才能取出
    let {name,nick,passwd,province,city,phone} = user
    var response={
        code:1,msg:"reg ok"
    }

    try{
        let ret = await dao.insert(user);
        console.log(ret);
        if(ret.affectedRows==1){
            user.id = ret.insertId
            response.user = user
        }else{
            response.code = 0
            response.msg = "注册失败"
        }
    }catch(e){
        console.log(e)
    }
    res.send(response);//只允许执行一次
}

//TODO: 登录接口
// exports.login= async function(req, res, next) {
//     //设置返回信息
//     let ret={
//         code:1,msg:"login ok"
//     }
//
//     //获取数据
//     let reqData={}
//     if(req.method=="GET")
//         reqData = req.query
//     else
//         reqData = req.body
//     let {phone,passwd}=reqData;//解构赋值
//
//     //操作数据库数据
//     try{
//         let users = await dao.getUserByPhone(phone,passwd)
//         console.log(users)
//         if(users.length==1){
//             ret.user=users[0]
//             req.session.user=users[0]
//         }else{
//             ret.code=0
//             ret.msg="用户名或密码错误"
//         }
//     }catch(e){
//         console.log(e)
//     }
//     res.send(ret)
// }
exports.logout=async function(req, res, next){
    let ret={
        code:1,msg:"logout ok"
    }
    req.session.user=null
    res.send(ret)
}

//TODO:用户想看接口
// exports.like_add = async function(req,res){
//     let ret={code:1,msg:"ok"}
//     let {movie_id} = req.query
//     let user = req.session.user
//     try{
//         let result = await dao.addLike(user.id,movie_id)
//         console.log(result)
//         if(result.affectedRows!=1){
//             ret.code = 0
//             ret.msg = "err"
//         }
//     }catch(e){
//         ret.code = 0
//         ret.msg = "err"
//         ret.err = e.toString()
//     }
//
//     res.send(ret)
// }
//获取用户是否想看
exports.like_get = async function (req,res) {
    let ret={code:1,msg:'like_get ok'}
    let user =req.session.user
    let {movie_id}=req.query
    if(user){
        let result = await dao.getLike(user.id ,movie_id)
        if(result.length!=1){
            ret.code=0
            ret.msg='dislike'
        }
    }else{
        ret.code=0
        ret.msg='请登录'
    }
    res.send(ret)
}
//用户不想看
exports.like_delete = async function (req,res) {
    let ret={code:1,msg:'like_delete ok'}
    let {movie_id}=req.query
    let user = req.session.user
    try {
        let result = await dao.deleteLike(user.id,movie_id)
        if(result.affectedRows!=1){
            ret.code=0
            ret.msg='用户想看的记录不存在'
        }
    }catch(e){
        ret.code=0
        ret.msg="err"
        ret.err=e.toString()
    }
    res.send(ret)
}
//TODO: 登录接口
exports.login= async function(req, res, next) {
    //设置返回信息
    let ret={
        code:1,msg:"login ok"
    }

    //获取数据
    let reqData={}
    if(req.method=="GET")
        reqData = req.query
    else
        reqData = req.body
    let {phone,passwd}=reqData;//解构赋值

    //操作数据库数据
    try{
        let users = await dao.getUserByPhone(phone,passwd)
        console.log(users)
        if(users.length==1){
            let header={
                "typ": "JWT",
                "alg": "HS256"
            }
            let payload={
                uid:users[0].id
            }

            let tokenStr=token.createToken(header,payload,300000)
            //ret.user=users[0]
            ret.user={}
            ret.user.id=users[0].id
            ret.user.token=tokenStr
            console.log(tokenStr);
        }else{
            ret.code=0
            ret.msg="用户名或密码错误"
        }
    }catch(e){
        console.log(e)
    }
    res.send(ret)
}
exports.like_add = async function (req,res) {
    let ret={code:1,msg:'like_add ok'}
    let {movie_id} = req.query
    let {token_test} = req.body
    console.log(token_test)
    try {
        if(token.checkToken(token_test)){
            //console.log(token.decodeToken(token_test))
            let uid=token.decodeToken(token_test).payload.data.uid
            //console.log(uid)
            let result = await dao.addLike(uid,movie_id)
            if(result.affectedRows!=1){
                ret.code=0
                ret.msg='like_add err'
            }
        }else{
            ret.code=0
            ret.msg='请登录'
        }
    }catch(e){
        ret.code=0
        ret.msg='like_add err'
        ret.err=e.toString()
    }
    res.send(ret)
}