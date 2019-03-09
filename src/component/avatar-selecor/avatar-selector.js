import React, { Component } from 'react'
import {List, Grid } from 'antd-mobile'

class AvatarSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      icon: ''
    }
  }
  render () {
    const data = Array.from(new Array(7)).map((_val, i) => ({
      icon: './a' + (i+1) + '.png',
      text: `头像${i}`,
    }))

    const gridHeader = this.state.icon ? (
      <div>
        <span>选择头像</span>
        <img style={{width: 20, height: 20}} src={this.state.icon} alt=""/>
      </div>
    ) : '请选择头像'

    return (
      <div>
        <List renderHeader={gridHeader}>
        <Grid data={data}
              activeStyle={false}
              onClick={v => {
                this.setState(v)
                this.props.selectAvatar(v)
              }} />
        </List>
      </div>
    )
  }
}

export default AvatarSelector