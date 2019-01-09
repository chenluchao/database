const dao = require('../dao/OrderDao')
const SIZE = 10
/**
 * 订单分页查询
 * @param req
 * @param res
 * @returns {Promise.<void>}
 */
exports.list=async function (req,res) {
    let ret = {code:1,msg:'list ok'}
    let user = req.session.user
    let{page}=req.query
    if(!page)
        page=1
    let orderlist= await dao.list(user.id,page,SIZE)
    ret.list = orderlist
    res.send(ret)
}
/**
 * 单个订单查询
 * @returns {Promise.<void>}
 */
exports.get=async function (req,res) {
    let ret={code:1,msg:"ok",order:{}}
    let {id} = req.params
    let user = req.session.user
    let order = await dao.get(id)//只要是select，返回的一定是一个数组
    if(order.length==1){
        if(order[0].uid == user.id)
            ret.order = order[0]
    }
    res.send(ret)
}
/**
 * 添加一个订单接口
 * @param req
 * @param res
 * @returns {Promise.<void>}
 */
exports.add=async function (req,res) {
    let ret={code:1,msg:"ok"}
    let order = req.body
    let user = req.session.user
    order.uid = user.id//!!!!!!!!
    try{
        let result = await dao.add(order)
        console.log(result)
        if(result.affectedRows==1){
            order.id = result.insertId
            ret.order = order
        }
    }catch(e){
        console.log(e)
        ret.code = 0
        ret.msg = "error"
        ret.reason = e.toString()
    }
    res.send(ret)
}
/**
 * 更新一个订单接口
 * @param req
 * @param res
 * @returns {Promise.<void>}
 */
exports.modify=async function (req,res) {
    let ret={code:1,msg:"ok"}
    let order = req.body
    let user = req.session.user
    order.uid = user.id

    let id = req.params.id
    try{
        let result = await dao.modify(order)
        console.log(result)
        if(result.affectedRows==1){
            ret.movie = movie
        }
    }catch(e){
        console.log(e)
        ret.code = 0
        ret.msg = "error"
        ret.reason = e.toString()
    }
    res.send(ret)
}
/**
 * 删除一个订单接口
 * @param req
 * @param res
 * @returns {Promise.<void>}
 */
exports.delete= async function (req,res) {
    let ret={code:1,msg:'delete ok'}
    let id = req.params.id
    let user=req.session.user
    try{
        let result = await dao.delete(id,user.id)
    }catch(e){
        ret.code=0
        ret.msg="删除失败"
        ret.reason = e.toString()
    }
    res.send(ret);
}