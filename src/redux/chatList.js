import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:3001')

// socket.on('resvmsg', data => {
//   this.setState({
//     msg : [...this.state.msg, data]
//   })
// }) 

// 获取聊天列表
const MSG_LIST = 'MSG_LIST'
// 读取信息
const MSG_RECV = 'MSG_RECV'
// 标识已读
const MSG_READ = 'MSG_READ'

const initState = {
  chatMsg: [],
  unread: 0 // 未读信息数量
}

export function chatList(state=initState, action) {
  switch(action.type) {
    case MSG_LIST:
      return {
        ...state, chatMsg: action.data, unread: action.data.filter(v => !v.read).length
      }
    case MSG_RECV:
      return {
        ...state, chatMsg: [...state.chatMsg, action.data]
      }
    // case MSG_READ:
    default: 
      return state
  }
}

function msgList(data) {
  return {
    type: MSG_LIST,
    data
  }
}

function addRescv(data) {
  return {
    type: MSG_RECV,
    data
  }
}

export function getMsgList() {
  return dispatch => {
    axios.post('/user/getMsgList').then(data => {
      dispatch(msgList(data.data.doc))
    })
  }
}

export function sendMsg({from, to, msg}) {
  return dispatch => {
    socket.emit('sendmsg', {from, to, msg})
  }
}

export function rescvMsg() {
  return dispatch => {
    socket.on('rescvmsg', doc => {
      dispatch(addRescv(doc))
    })
  }
}
