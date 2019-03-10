import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, WingBlank } from 'antd-mobile'
import { getUserList } from '../../redux/chartUser'

@connect(
  state => ({ user: state.user }),
  { getUserList }
)
class Boss extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }
  componentDidMount() {
    this.getUserList('0')
  }

  render() {
    return (
      <div>
        <WingBlank>
          {this.state.list.map(v => (
            <Card key={v._id} style={{marginBottom: 10}}>
              <Card.Header
                title={v.company}
                thumb={v.avatar}
                extra={<span>{v.desc + v.money}</span>}
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
