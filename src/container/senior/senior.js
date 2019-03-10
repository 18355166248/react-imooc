import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, WingBlank } from 'antd-mobile'
import { getUserList } from '../../redux/chartUser'

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
        <WingBlank>
          {list.map(v => (
            <Card key={v._id} style={{ marginBottom: 10 }}>
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

export default Senior
