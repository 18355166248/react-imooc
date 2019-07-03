import React, { Component } from 'react'
import { connect } from 'react-redux'

@connect(
  state => state
)
class Msg extends Component {
  constructor(props) {
    super(props)
    console.log(this.props)
  }

  render() {
    return (
      <div></div>
    )
  }
}

export default Msg
