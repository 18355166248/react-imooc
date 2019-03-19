import React, { Component } from 'react'
import { NavBar } from 'antd-mobile'
import { connect } from 'react-redux'
import NavList from './navList'
import Boss from '../../container/boss/boss'
import Senior from '../../container/senior/senior'
import User from '../../container/user/user'
import Msg from '../../container/msg/msg'
import { getMsgList, rescvMsg } from '../../redux/chatList'

@connect(
  state => state,
  { getMsgList, rescvMsg }
)
class Dashboard extends Component {

  componentDidMount() {
    if (this.props.chatList.chatMsg.length === 0){
      this.props.getMsgList()
      this.props.rescvMsg()
    }
  }
  render() {
    const type = this.props.user.type
    const pathname = this.props.location.pathname
    const userList = [
      {
        path: '/boss',
        title: '牛人',
        name: '牛人列表',
        avatar: 'senior',
        hidden: type === '0',
        component: Boss
      },
      {
        path: '/senior',
        title: 'Boss',
        name: 'Boss列表',
        avatar: 'boss',
        hidden: type === '1',
        component: Senior
      },
      {
        path: '/msg',
        title: '消息',
        avatar: 'msg',
        name: '消息列表',
        component: Msg
      },
      {
        path: '/user',
        title: '个人',
        avatar: 'user',
        name: '个人信息',
        component: User
      }
    ]
    return (
      <div>
        <NavBar mode="dark" style={{position: 'fixed', zIndex: 999, width: '100%'}}>{ (userList.find(v => v.path === pathname)) 
          && (userList.find(v => v.path === pathname)).name }</NavBar>

        <NavList userList={userList}></NavList>
      </div>
    )
  }
}

export default Dashboard