/* eslint-disable react/no-unused-state */
import React, { Component } from 'react'
import { findById } from 'lib/utils'
import P from 'prop-types'
import * as R from 'ramda'
import { objectToUrl } from 'utils'
import { read, update, destroy, create } from 'lib/xhr-helpers'

export const DevicesContext = React.createContext()

const toggleActive = R.over(R.lensProp('active'), R.not)

const readDevices = urlParams =>
  read(`http://localhost/api/devices?${objectToUrl(urlParams)}`)

const updateDevice = async (id, item) => {
  const response = await update(`http://localhost/api/devices/edit/${id}`, item)
  return response.json.result
}

const deleteDevice = async id => {
  const response = await destroy(`http://localhost/api/devices/remove/${id}`)
  return response
}

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

  async componentDidMount() {
    const dev = await this.getDevices()
    this.setState({ devices: dev })
  }

  onDeviceFormSubmit = async item => {
    const { devices } = this.state
    const response = await create('http://localhost/api/devices/create', item)
    const newDevices = devices.concat(response.result)
    this.setState({
      devices: newDevices,
    })
  }

  onSaveHandler = R.curry((id, item) => {
    const { devices } = this.state
    const newDevice = updateDevice(id, item)
    const deviceFoundIndex = devices.findIndex(findById(id))
    const newDevices = R.adjust(
      R.mergeDeepLeft(newDevice),
      deviceFoundIndex,
      devices,
    )
    this.setState({ devices: newDevices })
  })

  onChangeActive = id => {
    const { devices } = this.state
    const deviceFoundIndex = devices.findIndex(findById(id))
    const newDevices = R.adjust(toggleActive, deviceFoundIndex, devices)
    this.setState({ devices: newDevices })
    updateDevice(id, newDevices[deviceFoundIndex])
  }

  getDevices = async (offset, limit) => {
    const response = await readDevices({
      offset,
      limit,
    })

    return response.data
  }

  deleteHandler = async id => {
    const { devices } = this.state
    await deleteDevice(id)
    const newDevices = R.remove(devices.findIndex(findById(id)), 1, devices)
    this.setState({
      devices: newDevices,
    })
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
