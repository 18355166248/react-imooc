import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chartUser'
import CommonCardInfo from '../../component/commonCardInfo/commonCardInfo'

@connect(
  state => state,
  { getUserList }
)
class Senior extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }
  componentDidMount() {
    this.props.getUserList('1')
  }

  render() {
    const list = this.props.chartUser.userList
      ? this.props.chartUser.userList
      : []
    return (
      <div>
        <CommonCardInfo list={list} />
      </div>
    )
  }
}

export default Senior
