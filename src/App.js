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

const toggleActive = R.over(R.lensProp('active'), R.not)

const normalizeItem = ({ name, description, posLat, posLong }) => ({
    name,
    description,
    position: { posLat, posLong },
})

class App extends Component {
    constructor(props) {
        super(props)

        const cachedDevices = localStorage.getItem('devices')
        const cachedPlaces = localStorage.getItem('places')
        this.state = {
            devices: JSON.parse(cachedDevices) || [],
            places: JSON.parse(cachedPlaces) || [],
            inputText: '',
            curTheme: defaultTheme.value,
        }
    }

    onDeviceFormSubmit = item => {
        item.id = guid()
        const newDevices = this.state.devices.concat([item])
        this.setState({
            devices: newDevices,
        })
        localStorage.setItem('devices', JSON.stringify(newDevices))
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

    onChangeHandler = event => {
        this.setState({ inputText: event.target.value })
    }

    onChangeActive = id => {
        const deviceFoundIndex = this.state.devices.findIndex(findById(id))
        const newDevices = R.adjust(
            toggleActive,
            deviceFoundIndex,
            this.state.devices,
        )
        this.setState({ devices: newDevices })
        localStorage.setItem('devices', JSON.stringify(newDevices))
    }

    deleteHandler = id => {
        const newDevices = R.remove(
            this.state.devices.findIndex(findById(id)),
            1,
            this.state.devices,
        )
        this.setState({
            devices: newDevices,
        })
        localStorage.setItem('devices', JSON.stringify(newDevices))
    }

    onSaveHandler = R.curry((id, item) => {
        const deviceFoundIndex = this.state.devices.findIndex(findById(id))
        const newDevices = R.adjust(
            R.mergeDeepLeft(item),
            deviceFoundIndex,
            this.state.devices,
        )
        this.setState({ devices: newDevices })
        localStorage.setItem('devices', JSON.stringify(newDevices))
    })

    changeTheme = theme => {
        this.setState({
            curTheme: theme,
        })
    }

    render() {
        return (
            <div className="AppDiv">
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
                                        <DeviceForm
                                            {...props}
                                            onSubmit={this.onDeviceFormSubmit}
                                        />
                                    </Page>
                                )}
                            />

                            <Route
                                path="/devices/"
                                component={() => (
                                    <Page title="Devices">
                                        <Devices
                                            devices={this.state.devices}
                                            onDelete={this.deleteHandler}
                                            onChangeActive={this.onChangeActive}
                                            onSave={this.onSaveHandler}
                                        />
                                    </Page>
                                )}
                            />
                            <Route
                                path="/AddPlaces/"
                                component={props => (
                                    <Page title="AddPlace">
                                        <PlaceForm
                                            {...props}
                                            onSubmit={this.onPlaceFormSubmit}
                                        />
                                    </Page>
                                )}
                            />
                        </AppDiv>
                    </ThemeProvider>
                </Router>
            </div>
        )
    }
}

export default App
