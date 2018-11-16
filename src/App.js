import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { remove } from 'ramda'
import DeviceList from './components/DeviceList'
import Form from './components/Form'
import { findById } from './lib/utils'
//import DeviceItem from './components/DeviceItem';
import 'normalize.css'
import jsDevices from './assets/devices'
//const urlParams = window.location.search;

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            devices: jsDevices,
            inputText: '',
        }
    }

    deleteHandler = id => () => {
        //this.state.devices.splice(index,1)
        //this.setState({devices: this.state.devices})
        // console.log(id)
        this.setState({
            devices: remove(
                this.state.devices.findIndex(findById(id)),
                1,
                this.state.devices,
            ),
        })
    }

    clickHandler = text => () => {
        if (!this.state.inputText == '') {
            this.setState({
                devices: this.state.devices.concat([text]),
                inputText: '',
            })
        } else {
            this.setState({ inputText: 'Input must not be empty!' })
        }
    }

    onSubmit = item => {
        // debugger
        // console.log('submited')
        // console.log(item.name)
        this.setState({
            devices: this.state.devices.concat([item]),
        })
    }

    onChangeHandler = event => {
        this.setState({ inputText: event.target.value })
    }

    handleSubmit = event => {
        event.preventDefault()
    }

    render() {
        //console.log( urlParams.split("&"));
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to
                    reload.
                </p>
                <input
                    type="text"
                    value={this.state.inputText}
                    onChange={this.onChangeHandler}
                />
                <button onClick={this.clickHandler(this.state.inputText)}>
                    push
                </button>
                <Form onSubmit={this.onSubmit} />
                <DeviceList
                    devices={this.state.devices}
                    onDelete={this.deleteHandler}
                    onEdit={this.editHandler}
                />
            </div>
        )
    }
}

export default App
