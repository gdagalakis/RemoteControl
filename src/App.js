import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import * as R from 'ramda'
import DeviceList from './components/DeviceList'
import Form from './components/Form'
import { findById } from './lib/utils'
//import DeviceItem from './components/DeviceItem';
import 'normalize.css'
import jsDevices from './assets/devices'
//const urlParams = window.location.search;
import NavBar from './components/NavBar'
import Devices from './pages/Devices'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Page from './components/Page'
import { guid } from './utils'

const Users = () => <h2>Users</h2>

const toggleActive = R.over(R.lensProp('active'), R.not)

class App extends Component {
    constructor(props) {
        super(props)
        const cachedDevices = localStorage.getItem('devices')
        this.state = {
            devices: JSON.parse(cachedDevices) || [],
            inputText: '',
        }
    }

    onSubmit = item => {
        // debugger
        // console.log('submited')
        // console.log(item.name)
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
        //this.state.devices.splice(index,1)
        //this.setState({devices: this.state.devices})
        // console.log(id)
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

    render() {
        //console.log( urlParams.split("&"));
        return (
            <Router>
                <div className="App">
                    <NavBar />
                    <p className="App-intro">
                        To get started, edit <code>src/App.js</code> and save to
                        reload.
                    </p>

                    <Route
                        path="/"
                        exact
                        component={() => (
                            <Page title="HomePage">
                                <Form onSubmit={this.onSubmit} />
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
                                />
                            </Page>
                        )}
                    />
                    <Route path="/users/" component={Users} />
                </div>
            </Router>
        )
    }
}

export default App
