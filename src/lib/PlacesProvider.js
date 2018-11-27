import React, { Component } from 'react'
import { guid } from 'utils'

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
        item = normalizeItem(item)
        item.id = guid()
        const newPlaces = this.state.places.concat([item])
        this.setState({
            places: newPlaces,
        })
        localStorage.setItem('places', JSON.stringify(newPlaces))
    }

    render() {
        return (
            <PlacesContext.Provider value={this.state}>
                {this.props.children}
            </PlacesContext.Provider>
        )
    }
}

export default PlacesProvider
