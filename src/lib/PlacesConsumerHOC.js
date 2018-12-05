import React from 'react'
import { PlacesContext } from 'lib/PlacesProvider'
import * as R from 'ramda'
import { getDisplayName } from './utils'

const defaultMapContextToProps = R.identity

// eslint-disable-next-line space-in-parens
export default (mapContextToProps = defaultMapContextToProps, ) => WrappedComponent => {
  const Wrapper = props => (
    <PlacesContext.Consumer>
      {value => <WrappedComponent {...props} {...mapContextToProps(value)} />}
    </PlacesContext.Consumer>
  )
  Wrapper.displayName = `PlacesConsumerHOC(${getDisplayName(WrappedComponent)})`

  return Wrapper
}
