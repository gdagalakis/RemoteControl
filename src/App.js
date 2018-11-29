import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import DeviceProvider from 'lib/DevicesProvider'
import PlacesProvider from 'lib/PlacesProvider'
import DeviceForm from './components/DeviceForm'
import PlaceForm from './components/PlaceForm'
import NavBar from './components/NavBar'
import Devices from './pages/Devices'
import Page from './components/Page'
import { guid } from './utils'
import { GlobalStyle, defaultTheme } from './globalStyle'
import AppDiv from './style.js'
import 'normalize.css'

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
    const { curTheme } = this.state
    return (
      <div className="AppDiv">
        <DeviceProvider>
          <PlacesProvider>
            <Router>
              <ThemeProvider theme={curTheme}>
                <AppDiv>
                  <GlobalStyle />
                  <NavBar changeTheme={this.changeTheme} />
                  <Route
                    path="/"
                    exact
                    component={() => (
                      <Page title="HomePage">
                        <div>Welcome!!!</div>
                      </Page>
                    )}
                  />

                  <Route
                    path="/devices/"
                    component={props => (
                      <Page title="Devices">
                        <Devices />
                      </Page>
                    )}
                  />
                  <Route
                    path="/addNew/Places/"
                    component={props => (
                      <Page title="AddPlace">
                        <PlaceForm {...props} />
                      </Page>
                    )}
                  />
                  <Route
                    path="/addNew/Devices/"
                    component={props => (
                      <Page title="AddDevices">
                        <DeviceForm {...props} />
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
