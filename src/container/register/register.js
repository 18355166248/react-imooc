import React, { Component } from 'react'
import Logo from '../../component/logo/logo'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  InputItem,
  WhiteSpace,
  List,
  WingBlank,
  Button,
  Radio
} from 'antd-mobile'
import { register } from '../../redux/user'
import userForm from '../../component/userform/userForm'

const RadioItem = Radio.RadioItem

@connect(
  state => ({ user: state.user }),
  { register }
)
@userForm
class Register extends Component {
  constructor(props) {
    super(props)
    this.login = this.login.bind(this)
    this.regi = this.regi.bind(this)
  }
  componentDidMount() {
    const userData = [{ id: 0, name: '牛人' }, { id: 1, name: 'BOSS' }]
    this.props.handleChange('userData', userData)
    this.props.handleChange('value', 0)
  }
  login() {
    this.props.history.push('/login')
  }
  regi() {
    this.props.register(
      this.props.state.name,
      this.props.state.pwd,
      this.props.state.twopwd,
      this.props.state.value
    )
  }
  render() {
    return (
      <div>
        {this.props.user.redirect ? (
          <Redirect to={this.props.user.redirect} />
        ) : null}
        <Logo />
        <WingBlank>
          {this.props.user.msg === '' ? null : (
            <div className="error">{this.props.user.msg}</div>
          )}
          <List>
            <InputItem onChange={v => this.props.handleChange('name', v)}>
              用户名
            </InputItem>
            <WhiteSpace />
            <InputItem onChange={v => this.props.handleChange('pwd', v)}>
              密码
            </InputItem>
            <WhiteSpace />
            <InputItem onChange={v => this.props.handleChange('twopwd', v)}>
              确认密码
            </InputItem>
            <WhiteSpace />
            {this.props.state.userData &&
              this.props.state.userData.map(v => (
                <RadioItem
                  key={v.id}
                  checked={this.props.state.value === v.id}
                  onChange={() => this.props.handleChange('value', v.id)}
                >
                  {v.name}
                </RadioItem>
              ))}
            <Button type="primary" onClick={this.regi}>
              注册
            </Button>
            <WhiteSpace />
            <Button onClick={this.login}>登录</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default Register
