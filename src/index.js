import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducer'
import './config'
import Login from './container/login/login'
import Register from './container/register/register'
import BossInfo from './container/boss/bossinfo'
import SeniorInfo from './container/senior/seniorinfo'
import InitRoute from './container/InitRoute/InitRoute'
import Dashboard from './component/dashboard/dashboard'

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <InitRoute />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/seniorinfo" component={SeniorInfo} />
          <Route path="/bossinfo" component={BossInfo} />
          <Route component={Dashboard} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
