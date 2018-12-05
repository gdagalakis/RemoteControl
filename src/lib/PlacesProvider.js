/* eslint-disable react/no-unused-state */
import React, { Component } from 'react'
import P from 'prop-types'
import { read, create } from 'lib/xhr-helpers'

const normalizeItem = ({ name, description, posLat, posLong }) => ({
  name,
  description,
  position: { posLat, posLong },
})
const readPlaces = () => read('/places')

const createPlace = item => create('/places/create', item)

export const PlacesContext = React.createContext()

export class PlacesProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      places: [],
      onSubmit: this.onPlaceFormSubmit,
    }
  }
  async componentDidMount() {
    const places = await readPlaces()
    this.setState({ places })
  }

  onPlaceFormSubmit = async item => {
    let newItem = normalizeItem(item)
    const { places } = this.state
    newItem = await createPlace(newItem)
    const newPlaces = places.concat([newItem])
    this.setState({
      places: newPlaces,
    })
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
