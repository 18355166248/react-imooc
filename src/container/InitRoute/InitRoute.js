import React, { Component } from 'react'
import axios from 'axios'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { initData } from '../../redux/user'

@withRouter
@connect(
  state => state.user,
  { initData }
)
class InitRouter extends Component {
  constructor(props) {
    super(props)
    
    axios.get('/user/info').then(res => {
      if (res.status === 200) {
        if (res.data.code === 0) {
          this.props.history.push('/login')
        } else {
          this.props.initData(res.data.doc)
        }
      }
    })
  }
  render() {
    var pathname = this.props.location.pathname
    var redirect = this.props.redirect

    return (
      <div>
        {redirect && pathname === '/' ? (
          <Redirect to={redirect} />
        ) : null}
      </div>
    )
  }
}

export default InitRouter