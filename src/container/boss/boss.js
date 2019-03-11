import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, WingBlank } from 'antd-mobile'
import { getUserList } from '../../redux/chartUser'

@connect(
  state => state,
  { getUserList }
)
class Boss extends Component {
  componentDidMount() {
    this.props.getUserList('0')
  }

  render() {
    console.log(this.props.chartUser)
    return (
      <div>
        <WingBlank>
          {this.props.chartUser.userList.map(v => (
            <Card key={v._id} style={{marginBottom: 10}}>
              <Card.Header
                title={v.name}
                thumb={v.avatar}
                extra={<span>{v.desc}</span>}
              />
              <Card.Body>
                <div>{v.require}</div>
              </Card.Body>
            </Card>
          ))}
        </WingBlank>
      </div>
    )
  }
}

export default Boss
