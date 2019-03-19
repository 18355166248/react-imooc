import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { List, InputItem } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, rescvMsg } from '../../redux/chatList'
require('./chat.css')

@withRouter
@connect(
  state => state,
  { getMsgList, sendMsg, rescvMsg }
)
class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      msg: []
    }
  }
  componentDidMount() {
    this.props.getMsgList()
    this.props.rescvMsg()
  }
  handleSubmit() {
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.value
    this.props.sendMsg({from, to, msg})
    this.setState({ value: '' })
  }
  render() {
    return (
      <div className='chat-box'>
        {this.props.chatList.chatMsg.map((v, i) => (
          <List key={v._id}>{v.content}</List>
        ))}
        <div className="chat-footer">
          <List>
            <InputItem
              placeholder="请输入"
              value={this.state.value}
              onChange={v => {
                this.setState({ value: v })
              }}
              extra={<span onClick={() => this.handleSubmit()}>发送</span>}
            />
          </List>
        </div>
      </div>
    )
  }
}

export default Chat
