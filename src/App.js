import React, { Component } from 'react'
import * as R from 'ramda'
import Form from './components/Form'
import { findById } from './lib/utils'
import 'normalize.css'
import NavBar from './components/NavBar'
import Devices from './pages/Devices'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Page from './components/Page'
import { guid } from './utils'
import { GlobalStyle } from './globalStyle'
import { AppDiv, VanillaTheme, selectThemeByName } from './style.js'
import { ThemeProvider } from 'styled-components'

const Users = () => <h2>Users</h2>
const toggleActive = R.over(R.lensProp('active'), R.not)

class App extends Component {
    constructor(props) {
        super(props)

        const cachedDevices = localStorage.getItem('devices')
        this.state = {
            devices: JSON.parse(cachedDevices) || [],
            inputText: '',
            curTheme: VanillaTheme,
        }
    }

    onSubmit = item => {
        item.id = guid()
        const newDevices = this.state.devices.concat([item])
        this.setState({
            devices: newDevices,
        })
        localStorage.setItem('devices', JSON.stringify(newDevices))
    }

    onChangeHandler = event => {
        this.setState({ inputText: event.target.value })
    }

    handleSubmit = event => {
        event.preventDefault()
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
        console.log(theme)
        console.log(selectThemeByName(theme))
        this.setState({
            curTheme: selectThemeByName(theme),
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
                            <p className="App-intro">
                                To get started, edit <code>src/App.js</code> and
                                save to reload.
                            </p>

                            <Route
                                path="/"
                                exact
                                component={props => (
                                    <Page title="HomePage">
                                        <Form
                                            {...props}
                                            onSubmit={this.onSubmit}
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
                            <Route path="/users/" component={Users} />
                        </AppDiv>
                    </ThemeProvider>
                </Router>
            </div>
        )
    }
}

export default App
