import React, { Component } from 'react'
import { findById } from 'lib/utils'
import * as R from 'ramda'
import { guid } from 'utils'

export const DevicesContext = React.createContext()

const toggleActive = R.over(R.lensProp('active'), R.not)

export class DeviceProvider extends Component {
    constructor(props) {
        super(props)
        const cachedDevices = localStorage.getItem('devices')

        this.state = {
            devices: JSON.parse(cachedDevices) || [],
            onSave: this.onSaveHandler,
            onDelete: this.deleteHandler,
            onChangeActive: this.onChangeActive,
            onSubmit: this.onDeviceFormSubmit,
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

    render() {
        return (
            <DevicesContext.Provider value={this.state}>
                {this.props.children}
            </DevicesContext.Provider>
        )
    }
}

export default DeviceProvider
