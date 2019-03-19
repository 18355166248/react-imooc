import React, { Component } from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { TabBar } from 'antd-mobile'
require('./style.css')

@withRouter
@connect(
  state => state
)
class NavList extends Component {

  render() {
    const list = this.props.userList.filter(v => !v.hidden)
    const pathname = this.props.location.pathname

    return(
      <div style={{position: 'fixed', height: '100%', width: '100%', top: 0}} className='main-body'>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
        >
          {
            list.map(v => (
              <TabBar.Item
                title={ v.title }
                key={ v.title }
                icon={<div style={{
                  width: '22px',
                  height: '22px',
                  background: `url(./${v.avatar}.png) center center /  21px 21px no-repeat` }}
                />
                }
                selectedIcon={<div style={{
                  width: '22px',
                  height: '22px',
                  background: `url(./${v.avatar}-active.png) center center /  21px 21px no-repeat` }}
                />
                }
                selected={pathname === v.path}
                onPress={() => {
                  this.props.history.replace(v.path)
                }}
              >
                <div style={{marginTop: 60}}>
                  <Switch>
                    {
                      this.props.userList.map(v => (
                        <Route key={v.path} path={v.path} component={v.component} />
                      ))
                    }
                  </Switch>
                </div>
              </TabBar.Item>
            ))
          }
        </TabBar>
      </div>
    )
  }
}

export default NavList