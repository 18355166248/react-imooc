import React, { Component } from 'react'
import { WingBlank, Card } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

@withRouter
@connect(state => state.user)
class CommonCardInfo extends Component {

  handleClick = (v) => {
    this.props.history.replace(`/chat/${v._id}`)
  }

  render() {
    return (
      <WingBlank>
        {this.props.list.map(v => (
          <Card key={v._id} style={{ marginBottom: 10 }}>
            <Card.Header
              title={v.name}
              thumb={v.avatar}
              extra={<span>{v.desc}</span>}
              onClick={() => this.handleClick(v)}
            />
            <Card.Body>
              {v.type === '1' ? <div>公司: {v.company}</div> : null}
              <div>
                {v.require.split('\n').map(v => (
                  <div key={v}>{v}</div>
                ))}
              </div>
              {v.type === '1' ? <div>薪资: {v.money}</div> : null}
            </Card.Body>
          </Card>
        ))}
      </WingBlank>
    )
  }
}

CommonCardInfo.protoTypes = {
  list: PropTypes.array
}

export default CommonCardInfo
