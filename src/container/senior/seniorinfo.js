import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateUser } from '../../redux/user'
import { Redirect } from 'react-router-dom'
import {
  WhiteSpace,
  WingBlank,
  NavBar,
  InputItem,
  Button,
  TextareaItem
} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selecor/avatar-selector'

@connect(
  state => ({
    user: state.user
  }),
  {
    updateUser
  }
)
class SeniorInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      avatar: '',
      desc: '',
      require: ''
    }
  }
  selectAvatar = (key, v) => {
    this.setState({
      [key]: v
    })
  }
  submit = () => {
    // 第二个参数 0代表牛人 1代表boss
    this.props.updateUser(this.state, 0)
  }
  render() {
    var pathname = this.props.location.pathname
    var redirect = this.props.user.redirect
    return (
      <div>
        {' '}
        {redirect && redirect !== pathname ? (
          <Redirect to={redirect} />
        ) : null}{' '}
        <NavBar mode="dark"> 牛人完善信息页 </NavBar>{' '}
        <WingBlank>
          {' '}
          {this.props.user.msg === '' ? null : (
            <div className="error"> {this.props.user.msg} </div>
          )}
        </WingBlank>
        <AvatarSelector
          selectAvatar={data => {
            this.setState({
              avatar: data.icon
            })
          }}
        />{' '}
        <InputItem clear onChange={el => this.selectAvatar('desc', el)}>
          {' '}
          求职岗位{' '}
        </InputItem>{' '}
        <TextareaItem
          onChange={el => this.selectAvatar('require', el)}
          title="个人能力"
          autoHeight
        />
        <WhiteSpace />
        <WingBlank>
          <Button type="primary" onClick={this.submit}>
            {' '}
            提交{' '}
          </Button>{' '}
        </WingBlank>{' '}
      </div>
    )
  }
}

export default SeniorInfo
