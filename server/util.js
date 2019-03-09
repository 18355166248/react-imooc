const md5 = require('md5.js')

const md5String = '234sfwkjiang23455.[23dfc.,?wer'

function md5Function(str) {
  str = new md5().update(str).digest('hex')
  str = new md5().update(md5String + str).digest('hex')
  return str + ''
}

module.exports = {
  md5Function 
}