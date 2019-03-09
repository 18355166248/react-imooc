import React, { Component } from 'react'
import Logo from '../../component/logo/logo'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { InputItem, WhiteSpace, List, WingBlank, Button, Radio } from 'antd-mobile'
import { register } from '../../redux/user'

const RadioItem = Radio.RadioItem

@connect(
  state => ({user: state.user}),
  { register }
)
class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0, // 职位介绍
      name: '', // 用户名
      pwd: '', // 密码
      twopwd: '',
      userData: [
        {id: 0, name: '牛人'},
        {id: 1, name: 'BOSS'}
      ]
    }
    this.login = this.login.bind(this)
    this.regi = this.regi.bind(this)
  }
  login() {
    this.props.history.push('/login')
  }
  regi() {
    this.props.register(this.state.name, this.state.pwd, this.state.twopwd, this.state.value)
  }
  handleChange(name, v) {
    this.setState({
      [name]: v
    })
  }
  onChange(value) {
    this.setState({
      value
    })
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
            <InputItem onChange={(v) => this.handleChange('twopwd', v)}>确认密码</InputItem>
            <WhiteSpace/>
            {
              this.state.userData.map(v => (
                <RadioItem key={v.id}
                checked={this.state.value === v.id}
                onChange={() => this.onChange(v.id)}>{ v.name }</RadioItem>
              ))
            }
            <Button type="primary" onClick={ this.regi }>注册</Button>
            <WhiteSpace/>
            <Button onClick={this.login}>登录</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default Register