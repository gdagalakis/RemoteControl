import React, { Component } from 'react'
import * as R from 'ramda'
import DeviceForm from './components/DeviceForm'
import PlaceForm from './components/PlaceForm'
import { findById } from './lib/utils'
import 'normalize.css'
import NavBar from './components/NavBar'
import Devices from './pages/Devices'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Page from './components/Page'
import { guid } from './utils'
import { GlobalStyle, defaultTheme } from './globalStyle'
import { AppDiv } from './style.js'
import { ThemeProvider } from 'styled-components'
import 'normalize.css'
import DeviceProvider from 'lib/DevicesProvider'

const normalizeItem = ({ name, description, posLat, posLong }) => ({
    name,
    description,
    position: { posLat, posLong },
})

class App extends Component {
    constructor(props) {
        super(props)

        const cachedPlaces = localStorage.getItem('places')
        this.state = {
            places: JSON.parse(cachedPlaces) || [],
            curTheme: defaultTheme.value,
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

    changeTheme = theme => {
        this.setState({
            curTheme: theme,
        })
    }

    render() {
        return (
            <div className="AppDiv">
                <DeviceProvider>
                    <Router>
                        <ThemeProvider theme={this.state.curTheme}>
                            <AppDiv>
                                <GlobalStyle />
                                <NavBar changeTheme={this.changeTheme} />
                                <Route
                                    path="/"
                                    exact
                                    component={props => (
                                        <Page title="HomePage">
                                            <DeviceForm {...props} />
                                        </Page>
                                    )}
                                />

                                <Route
                                    path="/devices/"
                                    component={() => (
                                        <Page title="Devices">
                                            <Devices />
                                        </Page>
                                    )}
                                />
                                <Route
                                    path="/AddPlaces/"
                                    component={props => (
                                        <Page title="AddPlace">
                                            <PlaceForm
                                                {...props}
                                                onSubmit={
                                                    this.onPlaceFormSubmit
                                                }
                                            />
                                        </Page>
                                    )}
                                />
                            </AppDiv>
                        </ThemeProvider>
                    </Router>
                </DeviceProvider>
            </div>
        )
    }
}

export default App
