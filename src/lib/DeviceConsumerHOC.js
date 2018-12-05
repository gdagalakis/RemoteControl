import React from 'react'
import { DevicesContext } from 'lib/DevicesProvider'
import * as R from 'ramda'
import { getDisplayName } from './utils'

const defaultMapContextToProps = R.identity

export default (mapContextToProps = defaultMapContextToProps) => WrappedComponent => {
  const Wrapper = props => (
    <DevicesContext.Consumer>
      {value => <WrappedComponent {...props} {...mapContextToProps(value)} />}
    </DevicesContext.Consumer>
  )
  Wrapper.displayName = `DeviceConsumerHOC(${getDisplayName(WrappedComponent)})`

  return Wrapper
}
