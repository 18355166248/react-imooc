import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chartUser'
import CommonCardInfo from '../../component/commonCardInfo/commonCardInfo'

@connect(
  state => state,
  { getUserList }
)
class Boss extends Component {
  componentDidMount() {
    this.props.getUserList('0')
  }

  render() {
    return (
      <div>
        <CommonCardInfo list={this.props.chartUser.userList} />
      </div>
    )
  }
}

export default Boss
