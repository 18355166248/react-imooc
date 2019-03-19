import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { List, InputItem, NavBar, Icon } from 'antd-mobile'
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
    if (this.props.chatList.chatMsg.length === 0){
      this.props.getMsgList()
      this.props.rescvMsg()
    }
  }
  handleSubmit() {
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.value
    this.props.sendMsg({ from, to, msg })
    this.setState({ value: '' })
  }
  handleBack() {
    this.props.history.replace(this.props.user.redirect)
  }
  render() {
    const user = this.props.match.params.user
    const Item = List.Item
    const users = this.props.chatList.users
    if (!users[user]) return null
    return (
      <div>
        <NavBar mode="dark" onLeftClick={() => this.handleBack()} icon={<Icon type="left" />}>{users[user].name}</NavBar>
        <div className="chat-box">
          {this.props.chatList.chatMsg.map((v, i) => {
            const avatar = `http://localhost:3000/${users[user].avatar}`
            const meAva = require(`../../../public/${this.props.user.avatar.split('/')[1]}`)
            return v.to == user ? (
              <List key={v._id}>
                <Item extra={<img src={meAva}/>} className="chat-me">{v.content}</Item>
              </List>
            ) : (
              <List key={v._id}>
                <Item thumb={avatar}>{v.content}</Item>
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

export default Chat
