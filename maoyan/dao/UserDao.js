//Data Access Object 数据访问对象
const  MySQL = require('./MySQL')

//TODO:登录注册发短信接口
exports.insert = function (user) {
    var sql = "insert into tb_user(name,nick,passwd,phone) values(?,?,?,?)"
    var data = [user.name,user.nick,user.passwd,user.phone]
    return MySQL.query(sql,data)
}
exports.getUserByPhone = function (phone,passwd) {
    var sql = "select * from tb_user where phone=? and passwd=?"
    var data = [phone,passwd]
    return MySQL.query(sql,data)
}
exports.getUserById = function (id) {
    var sql = "select * from tb_user where id="+id
    return MySQL.query(sql,data)
}

//TODO:用户想看不想看
//添加想看
exports.addLike = function (uid,movie_id) {
    var sql = "insert tb_user_like(uid,movie_id,uptime) values(?,?,now())"
    var data=[uid,movie_id]
    return MySQL.query(sql,data)
}
//查询是否想看
exports.getLike = function (uid,movie_id) {
    var sql = "select * from tb_user_like where uid=? and movie_id=?"
    var data = [uid,movie_id]
    return MySQL.query(sql,data)
}
//删除想看
exports.deleteLike = function (uid,movie_id) {
    var sql = "delete from tb_user_like where uid=? and movie_id=?"
    var data = [uid,movie_id]
    return MySQL.query(sql,data)
}