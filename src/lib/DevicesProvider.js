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
    // const cachedDevices = localStorage.getItem('devices')

    this.state = {
      devices: [],
      onSave: this.onSaveHandler,
      onDelete: this.deleteHandler,
      onChangeActive: this.onChangeActive,
      onSubmit: this.onDeviceFormSubmit,
    }
  }

  componentDidMount() {
    fetch('http://localhost/api/devices', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        console.log(response)
        return response.json()
      })
      .then(json => {
        // this.state = { response: json }
        console.log(json)
        this.setState({ devices: json.data })
      })
      .catch(error => {
        // AHHHH! An Error!
        console.error(error)
      })
  }

  onDeviceFormSubmit = item => {
    const { devices } = this.state
    fetch('http://localhost/api/devices/create', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => {
        const newDevices = devices.concat(json.result)
        this.setState({
          devices: newDevices,
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  onSaveHandler = R.curry((id, item) => {
    const { devices } = this.state
    const deviceFoundIndex = devices.findIndex(findById(id))
    const newDevices = R.adjust(
      R.mergeDeepLeft(item),
      deviceFoundIndex,
      devices,
    )
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
    return (
      <DevicesContext.Provider value={this.state}>
        {children}
      </DevicesContext.Provider>
    )
  }
}

DeviceProvider.propTypes = {
  children: P.object,
}

export default DeviceProvider
