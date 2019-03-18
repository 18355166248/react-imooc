import React, { Component } from 'react'

export default function userForm(Comp) {
  return class WrapperComp extends Component {
    constructor(props) {
      super(props)
      this.state = {}
      this.handleChange = this.handleChange.bind(this)
    }

    handleChange(name, v) {
      this.setState({
        [name]: v
      })
    }

    render() {
      return <Comp handleChange={this.handleChange} state={this.state} {...this.props} />
    }
  }
}