import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { List, InputItem, NavBar } from 'antd-mobile'
import { connect } from 'react-redux'
import { sendMsg, rescvMsg } from '../../redux/chatList'
// require('./chat.css')

@withRouter
@connect(
  state => state,
  { sendMsg, rescvMsg }
)
class Msg extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      msg: []
    }
  }
  handleSubmit() {
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.value
    this.props.sendMsg({ from, to, msg })
    this.setState({ value: '' })
  }
  render() {
    const user = this.props.match.params.user
    const Item = List.Item
    return (
      <div>
        <NavBar mode="dark">{user}</NavBar>
        <div className="chat-box">
          {this.props.chatList.chatMsg.map((v, i) => {
            return v.to == user ? (
              <List key={v._id}>
                <Item extra="我" className="chat-me">{v.content}</Item>
              </List>
            ) : (
              <List key={v._id}>
                <Item>{v.content}</Item>
              </List>
            )
          })}
        </div>
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

export default Msg
