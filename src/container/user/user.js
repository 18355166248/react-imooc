import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { logout } from '../../redux/user'

const Item = List.Item
const Brief = Item.Brief

@withRouter
@connect(
  state => state.user,
  { logout }
)
class User extends Component {
  componentDidUpdate() {
    if (this.props.name === '') this.props.history.push('/login')
  }
  render() {
    const myImg = src => (
      <img
        src={src}
        style={{ width: 50, height: 50 }}
        className="spe am-icon am-icon-md"
        alt=""
      />
    )
    const props = this.props
    return (
      <div>
        <Result
          img={myImg(props.avatar)}
          title={props.name}
          message={props.type === '1' ? <div>公司: {props.company}</div> : null}
        />
        <List renderHeader={() => (props.type === '1' ? '招聘' : '个人简历')}>
          <Item arrow="empty" multipleLine>
            {props.desc}
            <Brief>
              {props.require &&
                props.require.split('\n').map(v => <div key={v}>{v}</div>)}
            </Brief>
            <Brief>
              {props.type === '1' ? <div>薪资: {props.money}</div> : null}
            </Brief>
          </Item>
        </List>
        <WhiteSpace />
        <List>
          <Item onClick={this.props.logout}>退出登录</Item>
        </List>
      </div>
    )
  }
}

export default User
