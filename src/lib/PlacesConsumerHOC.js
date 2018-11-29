import React from 'react'
import { PlacesContext } from 'lib/PlacesProvider'
import { getDisplayName } from './utils'

export default mapContextToProps => WrappedComponent => {
  const Wrapper = props => (
    <PlacesContext.Consumer>
      {value => <WrappedComponent {...props} {...mapContextToProps(value)} />}
    </PlacesContext.Consumer>
  )
  Wrapper.displayName = `PlacesConsumerHOC(${getDisplayName(WrappedComponent)})`

  return Wrapper
}
