const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const router = require('./router')
const port = 3001

app.use(cookieParser())
app.use(bodyParser.json())

app.use('/user', router)

app.listen(port, () => console.log('listening port is ' + port))
