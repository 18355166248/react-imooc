import { combineReducers } from 'redux'
import { user } from './redux/user'
import { chartUser } from './redux/chartUser'

const reducer = combineReducers({ user, chartUser })

export default reducer