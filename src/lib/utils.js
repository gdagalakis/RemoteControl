import queryString from 'query-string'
import React, { Component } from 'react'

export const findById = id => item => item.id == id

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export const InteractWithHistory = WrappedComponent => {
    class Wrapper extends Component {
        constructor(props) {
            super(props)
            const obj = queryString.parse(this.props.history.location.search)
            this.state = { queryString: obj }
        }
        updateQuery = obj => {
            this.props.history.push('?' + queryString.stringify(obj))
        }

        render() {
            return (
                <WrappedComponent
                    query={this.state.queryString}
                    updateQuery={this.updateQuery}
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
