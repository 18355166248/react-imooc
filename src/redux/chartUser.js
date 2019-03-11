import axios from 'axios'

const USERLIST = 'USERLIST'

const initState = { userList: [] }

export function chartUser(state = initState, action) {
  switch (action.type) {
    case USERLIST:
      return {
        ...state,
        userList: action.data
      }
    default:
      return state
  }
}

function initUser(data) {
  return {
    data,
    type: USERLIST
  }
}

export function getUserList(type) {
  return dispatch => {
    axios.get('/user/list?type='+ type).then(data => {
      dispatch(initUser(data.data))
    })
  }
}