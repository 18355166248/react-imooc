import React, { Component } from 'react'
import Logo from '../../component/logo/logo'
import { Redirect } from 'react-router-dom'
import { InputItem, WhiteSpace, List, WingBlank, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { login } from '../../redux/user'

@connect(
  state => ({user: state.user}),
  { login }
)
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      pwd: ''
    }
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }
  register() {
    this.props.history.push('/register')
  }
  handleChange(name, v) {
    this.setState({
      [name]: v
    })
  }
  handleLogin() {
    this.props.login(this.state.name, this.state.pwd)
  }
  render() {
    return (
      <div>
        {this.props.user.redirect ? (<Redirect to={this.props.user.redirect} />) : null}
        <Logo></Logo>
        <WingBlank>
          { this.props.user.msg === '' ? null : (<div className="error">{this.props.user.msg}</div>) }
          <List>
            <InputItem onChange={(v) => this.handleChange('name', v)}>用户名</InputItem>
            <WhiteSpace/>
            <InputItem onChange={(v) => this.handleChange('pwd', v)}>密码</InputItem>
            <WhiteSpace/>
            <Button type="primary" onClick={this.handleLogin}>登录</Button>
            <WhiteSpace/>
            <Button onClick={this.register}>注册</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default Login