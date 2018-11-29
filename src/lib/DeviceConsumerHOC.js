import React from 'react'
import { DevicesContext } from 'lib/DevicesProvider'
import { getDisplayName } from './utils'

export default mapContextToProps => WrappedComponent => {
  const Wrapper = props => (
    <DevicesContext.Consumer>
      {value => <WrappedComponent {...props} {...mapContextToProps(value)} />}
    </DevicesContext.Consumer>
  )
  Wrapper.displayName = `DeviceConsumerHOC(${getDisplayName(WrappedComponent)})`

  return Wrapper
}
