/* eslint-disable react/no-unused-state */
import React, { Component } from 'react'
import { findById } from 'lib/utils'
import P from 'prop-types'
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
    const { devices } = this.state

    const newDevices = devices.concat(R.assoc('id', guid(), item))
    this.setState({
      devices: newDevices,
    })
    localStorage.setItem('devices', JSON.stringify(newDevices))
  }

  onSaveHandler = R.curry((id, item) => {
    const { devices } = this.state
    const deviceFoundIndex = devices.findIndex(findById(id))
    const newDevices = R.adjust(R.mergeDeepLeft(item), deviceFoundIndex, devices)
    this.setState({ devices: newDevices })
    localStorage.setItem('devices', JSON.stringify(newDevices))
  })

  onChangeActive = id => {
    const { devices } = this.state
    const deviceFoundIndex = devices.findIndex(findById(id))
    const newDevices = R.adjust(toggleActive, deviceFoundIndex, devices)
    this.setState({ devices: newDevices })
    localStorage.setItem('devices', JSON.stringify(newDevices))
  }

  deleteHandler = id => {
    const { devices } = this.state
    const newDevices = R.remove(devices.findIndex(findById(id)), 1, devices)
    this.setState({
      devices: newDevices,
    })
    localStorage.setItem('devices', JSON.stringify(newDevices))
  }

  render() {
    const { children } = this.props
    return <DevicesContext.Provider value={this.state}>{children}</DevicesContext.Provider>
  }
}

DeviceProvider.propTypes = {
  children: P.object,
}

export default DeviceProvider
