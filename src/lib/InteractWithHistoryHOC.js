import React, { Component } from 'react'
import queryString from 'query-string'
import { getDisplayName } from './utils'

export default WrappedComponent => {
  class Wrapper extends Component {
    constructor(props) {
      // eslint-disable-next-line react/prop-types
      const { history } = props
      super(props)
      const obj = queryString.parse(history.location.search)
      this.state = { curQueryString: obj }
    }

    updateQuery = obj => {
      const { history } = this.props
      history.push('?' + queryString.stringify(obj))
    }

    clearQuery = () => {
      this.updateQuery()
    }

    render() {
      const { curQueryString } = this.state
      return (
        <WrappedComponent
          query={curQueryString}
          updateQuery={this.updateQuery}
          clearQuery={this.clearQuery}
          {...this.props}
        />
      )
    }
  }
  Wrapper.displayName = `InteractWithHistory(${getDisplayName(WrappedComponent)})`

  return Wrapper
}
