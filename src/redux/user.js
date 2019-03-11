import axios from 'axios'
import cookies from 'browser-cookies'
import {
  getRedirectPath
} from '../util'

const ERRMSG = 'ERRMSG'
const AUTO_SUCCESS = 'AUTO_SUCCESS'
const INIT_DATA = 'INIT_DATA'
const LOGOUT_DATA = 'LOGOUT_DATA'

var initState = {
  redirect: '',
  name: '',
  pwd: '',
  type: '',
  msg: '',
  avatar: ''
}

export function user(state = initState, action) {
  switch (action.type) {
    case AUTO_SUCCESS:
      return {
        ...state,
        ...action.data,
        msg: '',
        redirect: getRedirectPath({
          type: action.data.type,
          avatar: action.data.avatar
        })
      }
    case INIT_DATA:
      return {
        ...state,
        ...action.data,
        redirect: getRedirectPath({
          type: action.data.type,
          avatar: action.data.avatar
        })
      }
    case LOGOUT_DATA:
      return initState
    case ERRMSG:
      return {
        ...state,
        msg: action.msg
      }
    default:
      return state
  }
}

function errMsg(msg) {
  return {
    msg,
    type: ERRMSG
  }
}

function autoSuccess(data) {
  return {
    data,
    type: AUTO_SUCCESS
  }
}

export function initData(data) {
  return {
    data,
    type: INIT_DATA
  }
}

export function logoutUser() {
  return {
    type: LOGOUT_DATA
  }
}

export function register(name, pwd, twopwd, type) {
  if (!name || !pwd || !twopwd) {
    return errMsg('用户名和密码不能为空')
  }
  if (pwd !== twopwd) {
    return errMsg('两次密码不相同')
  }
  return dispatch => {
    axios
      .post('/user/register', {
        name,
        pwd,
        type
      })
      .then(function (data) {
        console.log(data)
        if (data.data.code === 1) {
          dispatch(
            autoSuccess({
              name,
              pwd,
              type
            })
          )
        } else {
          dispatch(errMsg(data.data.msg))
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

export function login(name, pwd) {
  if (!name || !pwd) return errMsg('请填写用户名和密码')
  return dispatch => {
    axios
      .get('/user/login', {
        params: {
          name,
          pwd
        }
      })
      .then(data => {
        if (data.data.code === 0) return dispatch(errMsg(data.data.msg))
        dispatch(autoSuccess(data.data.doc))
      })
  }
}

export function logout() {
  cookies.erase('userid')
  return dispath => {
    dispath(logoutUser())
  }
}

// 第二个参数 0代表牛人 1代表boss
export function updateUser({
  avatar,
  desc,
  company,
  money,
  require
}, type) {
  if (type) {
    if (!avatar || !desc || !company || !money || !require)
      return errMsg('请填写信息')
  } else {
    if (!avatar || !desc || !require) return errMsg('请填写信息')
  }

  return dispatch => {
    axios
      .post('/user/update', {
        avatar,
        desc,
        company,
        money,
        require
      })
      .then(data => {
        if (data.data.code === 0) return dispatch(errMsg(data.data.msg))
        dispatch(autoSuccess(data.data.doc))
      })
  }
}