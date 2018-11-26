import React, { Component } from 'react'
import queryString from 'query-string'
import { getDisplayName } from './utils'

export default WrappedComponent => {
    class Wrapper extends Component {
        constructor(props) {
            super(props)
            const obj = queryString.parse(this.props.history.location.search)
            this.state = { queryString: obj }
        }
        updateQuery = obj => {
            this.props.history.push('?' + queryString.stringify(obj))
        }

        clearQuery = () => {
            this.updateQuery()
        }

        render() {
            return (
                <WrappedComponent
                    query={this.state.queryString}
                    updateQuery={this.updateQuery}
                    clearQuery={this.clearQuery}
                    {...this.props}
                />
            )
        }
    }
    Wrapper.displayName = `InteractWithHistory(${getDisplayName(
        WrappedComponent,
    )})`

    return Wrapper
}
