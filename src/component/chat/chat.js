import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { getChatid, isIphoneX } from '../../util'
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
      msg: [],
      isX: false,
      emojiShow: false
    }
  }
  componentDidMount() {
    if (this.props.chatList.chatMsg.length === 0) {
      this.props.getMsgList()
      this.props.rescvMsg()
    }
    if (isIphoneX()) this.setState({isX: true})
    else this.setState({isX: false})
    this.resetWindow()
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
  blur() {
    window.scrollTo(0, 0)
  }
  resetWindow() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }
  render() {
    const user = this.props.match.params.user
    const Item = List.Item
    const users = this.props.chatList.users

    const chatid = getChatid(user, this.props.user._id)
    const chatMsg = this.props.chatList.chatMsg.filter(v => v.chatid === chatid)

    const emojiList = '😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 🙂 🤗 🤩 🤔 🤨 😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 ☹️ 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 🤯 😬 😰 😱 😳 🤪 😵 😡 😠 🤬 😷 🤒 🤕 🤢 🤮 🤧 😇 🤠 🤡 🤥 🤫 🤭 🧐 🤓 😈 👿 👹 👺 💀 👻 👽 🤖 💩 😺 😸 😹 😻 😼 😽 🙀 😿 😾'
      .split(' ')
      .filter(v => v)
      .map(v => ({
        text: v
      }))
    if (!users[user]) return null
    return (
      <div>
        <NavBar
          className='header-chat'
          mode="dark"
          onLeftClick={() => this.handleBack()}
          icon={<Icon type="left" />}
        >
          {users[user].name}
        </NavBar>
        <div
          className="chat-box"
          style={{ marginBottom: 44, overflow: 'auto' }}
        >
          {chatMsg.map((v, i) => {
            const avatar = `http://localhost:3000/${users[user].avatar}`
            const meAva = require(`../../../public/${
              this.props.user.avatar.split('/')[1]
            }`)
            return v.to == user ? (
              <List key={v._id}>
                <Item extra={<img alt="" src={meAva} />} className="chat-me">
                  {v.content}
                </Item>
              </List>
            ) : (
              <List key={v._id}>
                <Item thumb={avatar}>{v.content}</Item>
              </List>
            )
          })}
        </div>
        <div className="chat-footer" style={this.state.isX ? {bottom: 10} : {bottom: 0}}>
          <List>
            <InputItem
              placeholder="请输入"
              value={this.state.value}
              onChange={v => {
                this.setState({ value: v })
              }}
              onBlur={() => this.blur()}
              extra={
                <div>
                  <span onClick={() => {
                    this.setState({ emojiShow: !this.state.emojiShow })
                    this.resetWindow()
                  }}>😄</span>
                  <span onClick={() => this.handleSubmit()}>发送</span>
                </div>
              }
            />
            {this.state.emojiShow ? (
              <Grid
                className="emoji"
                data={emojiList}
                isCarousel
                columnNum={9}
                carouselMaxRow={4}
                onClick={el => this.setState({value: this.state.value + el.text})}
              />
            ) : null}
          </List>
        </div>
      </div>
    )
  }
}

export default Chat
