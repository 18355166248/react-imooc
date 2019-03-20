const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const router = require('./router')
const model = require('./model')
const ChatModel = model.getModel('chat')
const port = 3001

const http = require('http').Server(app)
const io = require('socket.io')(http)

io.on('connection', function(socket) {
  socket.on('sendmsg', data => {
    const {from, to, msg} = data
    const chatid = [from, to].sort().join('_')
    ChatModel.create({chatid, from, to, content: msg}, (err, doc) => {
      if (!err) {
        io.emit('rescvmsg', doc)
      }
    })
  })
})

app.use(cookieParser())
app.use(bodyParser.json())

app.use('/user', router)

http.listen(port, () => console.log('listening port is ' + port))
