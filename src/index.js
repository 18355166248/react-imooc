import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from "redux-thunk"
import { BrowserRouter as Router, Route} from 'react-router-dom'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducer'
import './config'
import Login from './container/login/login'
import Register from './container/register/register'
import Boss from './container/boss/boss'
import BossInfo from './container/boss/bossinfo'
import Senior from './container/senior/senior'
import SeniorInfo from './container/senior/seniorinfo'
import InitRoute from './container/InitRoute/InitRoute'

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)
))
ReactDOM.render(
  <Provider store={ store }>
    <Router>
        <div>
          <InitRoute></InitRoute>
          <Route path="/login" component={ Login }></Route>
          <Route path="/register" component={ Register }></Route>
          <Route path="/boss" component={ Boss }></Route>
          <Route path="/senior" component={ Senior }></Route>
          <Route path="/seniorinfo" component={ SeniorInfo }></Route>
          <Route path="/bossinfo" component={ BossInfo }></Route>
        </div>
      </Router>
  </Provider>
  ,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
