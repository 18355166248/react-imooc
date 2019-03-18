import React, { Component } from 'react'
import Logo from '../../component/logo/logo'
import { Redirect } from 'react-router-dom'
import { InputItem, WhiteSpace, List, WingBlank, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { login } from '../../redux/user'
import userForm from '../../component/userform/userForm'

@connect(
  state => ({ user: state.user }),
  { login }
)
@userForm
class Login extends Component {
  constructor(props) {
    super(props)
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }
  register() {
    this.props.history.push('/register')
  }
  handleLogin() {
    this.props.login(this.props.state.name, this.props.state.pwd)
  }
  render() {
    return (
      <div>
        {this.props.user.redirect && this.props.user.redirect !== '/login' ? (
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
            <Button type="primary" onClick={this.handleLogin}>
              登录
            </Button>
            <WhiteSpace />
            <Button onClick={this.register}>注册</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default Login
