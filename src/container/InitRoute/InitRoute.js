import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { initData } from '../../redux/user'

@withRouter
@connect(
  null,
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
    return (
      <div>
      </div>
    )
  }
}

export default InitRouter