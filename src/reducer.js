import { combineReducers } from 'redux'
import { user } from './redux/user'
import { chartUser } from './redux/chartUser'
import { chatList } from './redux/chatList'

const reducer = combineReducers({ user, chartUser, chatList })

export default reducer