/* eslint-disable react/no-unused-state */
import React, { Component } from 'react'
import { guid } from 'utils'
import P from 'prop-types'

const normalizeItem = ({ name, description, posLat, posLong }) => ({
  name,
  description,
  position: { posLat, posLong },
})

export const PlacesContext = React.createContext()

export class PlacesProvider extends Component {
  constructor(props) {
    super(props)

    const cachedPlaces = localStorage.getItem('places')
    this.state = {
      places: JSON.parse(cachedPlaces) || [],
      onSubmit: this.onPlaceFormSubmit,
    }
  }

  onPlaceFormSubmit = item => {
    const newItem = normalizeItem(item)
    const { places } = this.state
    newItem.id = guid()
    const newPlaces = places.concat([newItem])
    this.setState({
      places: newPlaces,
    })
    localStorage.setItem('places', JSON.stringify(newPlaces))
  }

  render() {
    const { children } = this.props
    return (
      <PlacesContext.Provider value={this.state}>
        {children}
      </PlacesContext.Provider>
    )
  }
}
PlacesProvider.propTypes = {
  children: P.object,
}

export default PlacesProvider
