import React, { Component } from 'react'
import DeviceForm from './components/DeviceForm'
import PlaceForm from './components/PlaceForm'
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
import PlacesProvider from 'lib/PlacesProvider'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            curTheme: defaultTheme.value,
        }
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
                    <PlacesProvider>
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
                                                <PlaceForm {...props} />
                                            </Page>
                                        )}
                                    />
                                </AppDiv>
                            </ThemeProvider>
                        </Router>
                    </PlacesProvider>
                </DeviceProvider>
            </div>
        )
    }
}

export default App
