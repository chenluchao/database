const MySQL = require('./MySQL')
/**
 * 分页查询
 * @param page
 * @param size
 * @returns {*}
 */
exports.list=function (page,size) {
    let sql = 'select * from tb_order limit ?,?'
    let data = [(page-1)*size,size]
    return MySQL.query(sql,data)
}
/**
 * 单个查询
 * @param id
 * @returns {*}
 */
exports.get=function (id) {
    let sql = "select * from tb_movie where id=?"
    let data = [id]
    return MySQL.query(sql,data)
}
exports.getActorsByMovieId=function (movie_id) {//通过Movie_id查询tb_actor内的相应的电影的演员
    let sql = "select A.*,B.name from tb_movie_actor A,tb_actor B  where A.movie_id=? and A.actor_id=B.id"
    let data = [movie_id]
    return MySQL.query(sql,data)
}
/**
 * 添加
 * @param movie
 * @returns {*}
 */
exports.add=function (movie) {
    let sql = "insert into tb_movie(name,logo_url,imax) values(?,?,?)"
    let data = [movie.name,movie.logo_url,movie.imax]
    return MySQL.query(sql,data)
}
/**
 * 更新
 * @param movie
 * @returns {*}
 */
exports.modify=function (movie) {
    let sql = "update tb_movie set name=?,logo_url=?,imax=? where id=?"
    let data = [movie.name,movie.logo_url,movie.imax,movie.id]
    return MySQL.query(sql,data)
}
/**
 * 删除
 * @param id
 * @returns {*}
 */
exports.delete=function (id) {
    let sql = "delete from tb_movie where id=?"
    let data = [id]
    return MySQL.query(sql,data)
}
