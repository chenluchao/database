const MySQL = require('./MySQL')
/**
 * 订单分页查询
 * @param page
 * @param size
 * @returns {*}
 */
exports.list=function (uid,page,size) {
    let sql = 'select A.*,B.price,C.id as cinema_id,C.name as cinema_name,D.id as movie_id,D.name as movie_name from tb_order A,tb_showtime B,tb_cinema C,tb_movie D where A.uid=? and A.show_id=B.id and B.cinema_id=C.id and B.movie_id=D.id limit ?,?'
    let data = [uid,(page-1)*size,size]
    return MySQL.query(sql,data)
}
/**
 * 单个订单查询
 * @param id
 * @returns {*}
 */
exports.get=function (id) {
    let sql = "select * from tb_order where id=?"
    let data = [id]
    return MySQL.query(sql,data)
}
exports.getMovieByMovieid=function (uid) {
    let sql = 'select A.*,B.price,C.id as cinema_id,C.name as cinema_name,D.id as movie_id,D.name as movie_name from tb_order A,tb_showtime B,tb_cinema C,tb_movie D where A.uid=? and A.show_id=B.id and B.cinema_id=C.id and B.movie_id=D.id'
    let data = [uid]
    return MySQL.query(sql,data)
}
/**
 * 添加一个订单
 * @param movie
 * @returns {*}
 */
exports.add=function (order) {
    let sql = "insert into tb_order(uid,show_id,seat,pay,buytime) values(?,?,?,?,now())"
    let data = [order.uid,order.show_id,order.seat,order.pay]
    return MySQL.query(sql,data)
}
/**
 * 更新一个订单
 * @param movie
 * @returns {*}
 */
exports.modify=function(order){
    let sql = "update tb_order set show_id=? where id=? and uid=?"
    let data = [order.show_id,order.id,order.uid]
    return MySQL.query(sql,data)
}
/**
 * 删除一个订单
 * @param id
 * @returns {*}
 */
exports.delete=function (id,uid) {
    let sql = "delete from tb_order where id=? and uid=?"
    let data = [id,uid]
    return MySQL.query(sql,data)
}
