const express = require('express')
const router = express.Router()
const model = require('./model')
const { md5Function } = require('./util')
const UserModel = model.getModel('user')
const ChatModel = model.getModel('chat')
const _fileter = {pwd: 0, _v: 0}

router.get('/info', (req, res) => {
  const { userid } = req.cookies
  if (!userid) return res.json({ code: 0 })
  
  UserModel.findOne({_id: userid}, function(err, doc) {
    if (err) res.json({code: 0, msg: '后端查询用户错误'})
    return res.json({code: 1, doc})
  })
})
router.get('/list', (req, res) => {
  const { type } = req.query
  UserModel.find({type}, (err, doc) => {
    return res.json(doc)
  })
})
// 注册接口
router.post('/register', (req, res) => {
  let { name, pwd, type } = req.body
  UserModel.findOne({name}, function(err, doc) {
    if (doc) return res.json({code: 0, msg: '用户名重复'})
    pwd = md5Function(pwd)
    UserModel.create({name, pwd, type}, function(err, doc) {
      if (err) return res.json({code: 0, msg: '后端错误'})

      res.cookie('userid', doc._id)
      return res.json({code: 1})
    })
  })
})
// 登录接口
router.get('/login', (req, res) => {
  let { name, pwd } = req.query
  pwd = md5Function(pwd)
  UserModel.findOne({name, pwd}, _fileter, (err, doc) => {
    if (!doc) return res.json({code: 0, msg: '账号或者密码错误'})
    res.cookie('userid', doc._id)
    res.json({code: 1, doc})
  })
})
// 更新信息接口
router.post('/update', (req, res) => {
  let data = req.body
  const _id = req.cookies.userid
  UserModel.findByIdAndUpdate(_id, data, function(err, doc) {
    if(err) return res.json({code: 0, msg: '更新失败'})
    data = Object.assign(data, {name: doc.name, type: doc.type})
    return res.json({code: 1, doc: data})
  })
})
// 获取聊天信息接口
router.post('/getMsgList', (req, res) => {
  const user = req.cookies.userid

  UserModel.find({}, (err, doc) => {
    let users = {}
    doc.forEach(v => {
      users[v._id] = {avatar: v.avatar, name: v.name}
    });
    ChatModel.find({'$or': [{from: user}, {to: user}]}, (err, doc) => {
      if (!err) {
        return res.send({code: 1, doc, users})
      }
    })
  })
})

module.exports = router