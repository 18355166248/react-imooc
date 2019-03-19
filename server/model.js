const mongoose = require('mongoose')
// 连接mongodb
const DB_URL = 'mongodb://localhost:27017/immoc-chat'
const Schema = mongoose.Schema
mongoose.connect(DB_URL)

mongoose.connection.once('open', function() {
  console.log('mongoose connected!')
})

const models = {
  user: {
    'name': {'type': String, 'required': true},
    'pwd': {'type': String, 'required': true},
    'type': {'type': String, 'required': true},
    // 头像
    'avatar': {'type': String},
    // 个人简介或者职位简介
    'desc': {'type': String},
    // 职位名
    'title': {'type': String},
    // 如果你的boss 还有两个字段
    'company': {'type': String},
    'money': {'type': String},
    'require': {'type': String}
  },
  chat: {
    'chatid': {'type': String, 'required': true},
    'from': {'type': String, 'required': true},
    'to': {'type': String, 'required': true},
    // 是否未读
    'read': {'type': Boolean, 'default': false},
    'content': {'type': String, 'required': true},
    'create_time': {'type': Number, 'default': new Date().getTime()},
  }
}

for (let m in models) {
  const schema = new Schema(models[m])
  mongoose.model(m, schema)
}

module.exports = {
  getModel: function(name) {
    return mongoose.model(name)
  }
}