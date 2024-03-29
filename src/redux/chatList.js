import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:3001')

// 获取聊天列表
const MSG_LIST = 'MSG_LIST'
// 读取信息
const MSG_RECV = 'MSG_RECV'
// 标识已读
const MSG_READ = 'MSG_READ'

const initState = {
  chatMsg: [],
  users: {},
  unread: 0 // 未读信息数量
}

export function chatList(state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return {
        ...state,
        users: action.users,
        chatMsg: action.data,
        unread: action.data.filter(v => !v.read && v.to === action.userid)
          .length
      }
    case MSG_RECV:
      const n = action.userid === action.data.to ? 1 : 0
      return {
        ...state,
        chatMsg: [...state.chatMsg, action.data],
        unread: state.unread + n
      }
    // case MSG_READ:
    default:
      return state
  }
}

function msgList(data, users, userid) {
  return {
    type: MSG_LIST,
    data,
    users,
    userid
  }
}

function addRescv(data, userid) {
  return {
    type: MSG_RECV,
    data,
    userid
  }
}

export function getMsgList() {
  return (dispatch, getState) => {
    axios.post('/user/getMsgList').then(data => {
      const userid = getState().user._id
      dispatch(msgList(data.data.doc, data.data.users, userid))
    })
  }
}

export function sendMsg({ from, to, msg }) {
  return dispatch => {
    socket.emit('sendmsg', {
      from,
      to,
      msg
    })
  }
}

export function rescvMsg() {
  return (dispatch, getState) => {
    socket.on('rescvmsg', doc => {
      const userid = getState().user._id
      dispatch(addRescv(doc, userid))
    })
  }
}
