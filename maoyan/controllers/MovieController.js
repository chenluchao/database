const dao = require('../dao/MovieDao')
const SIZE = 10
/**
 * 分页查询接口
 * @param req
 * @param res
 * @returns {Promise.<void>}
 */
exports.list=async function (req,res) {
    let ret = {code:1,msg:'list ok'}
    let{page}=req.query
    if(!page)
        page=1
    let movielist= await dao.list(page,SIZE)
    ret.list = movielist
    res.send(ret)
}
/**
 * 单个电影查询
 * @returns {Promise.<void>}
 */
exports.get=async function(req,res){
    let ret = {code:1,msg:'get ok',movie:{}}
    let{id} = req.params
    let movies = await dao.get(id)//只要是select返回一定的数组
    if(movies.length==1){
        ret.movie = movies[0]
        let actors = await dao.getActorsByMovieId(ret.movie.id)
        ret.movie.actors = actors
    }
    res.send(ret)
}
/**
 * 添加接口
 * @param req
 * @param res
 * @returns {Promise.<void>}
 */
exports.add=async function (req,res) {
    let ret={
        code:1,msg:"add ok"
    }
    let movie=req.body
    try {
        let result = await dao.add(movie)
        if(result.affectedRows==1){
            movie.id = result.insertId
            ret.movie = movie
        }
    }catch(e){
        ret.code = 0
        ret.msg = "添加失败"
        ret.reason = e.toString()
    }

    res.send(ret);
}
/**
 * 更新接口
 * @param req
 * @param res
 * @returns {Promise.<void>}
 */
exports.modify= async function (req,res) {
    let ret={code:1,msg:'modify ok'}
    let movie = req.body
    let id = req.params.id
    try{
        let result = await dao.modify(movie)
        if(result.affectedRows==1){
            ret.movie = movie
        }
    }catch(e){
        ret.code=0
        ret.msg="更新失败"
        ret.reason = e.toString()
    }
    res.send(ret);
}
/**
 * 删除接口
 * @param req
 * @param res
 * @returns {Promise.<void>}
 */
exports.delete= async function (req,res) {
    let ret={code:1,msg:'delete ok'}
    let id = req.params.id
    try{
        let result = await dao.delete(id)
    }catch(e){
        ret.code=0
        ret.msg="删除失败"
        ret.reason = e.toString()
    }
    res.send(ret);
}