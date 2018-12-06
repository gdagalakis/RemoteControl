/* eslint-disable react/no-unused-state */
import React, { Component } from 'react'
import { findById } from 'lib/utils'
import P from 'prop-types'
import * as R from 'ramda'
import { objectToUrl } from 'utils'
import { read, update, destroy, create } from 'lib/xhr-helpers'

export const DevicesContext = React.createContext()

const toggleActive = R.over(R.lensProp('active'), R.not)

const readDevices = urlParams => read(`/devices?${objectToUrl(urlParams)}`)

const updateDevice = (id, item) => update(`/devices/edit/${id}`, item)

const createDevice = item => create('/devices/create', item)
const deleteDevice = id => destroy(`/devices/remove/${id}`)

export class DeviceProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      devices: [],
      onSave: this.onSaveHandler,
      onDelete: this.deleteHandler,
      onChangeActive: this.onChangeActive,
      onSubmit: this.onDeviceFormSubmit,
      requestDevices: this.requestDevices,
      loading: false,
    }
  }

  async componentDidMount() {
    await this.requestDevices()
  }

  onDeviceFormSubmit = async item => {
    const { devices } = this.state
    const device = await createDevice(item)
    const newDevices = devices.concat(device)
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

  requestDevices = async (limit, offset) => {
    const { devices = [] } = this.state
    this.setState({ loading: true })
    const dev = await readDevices({ limit, offset })
    this.setState({
      devices: [...devices, ...dev.data],
      limit: dev.limit,
      offset: dev.offset,
      total: dev.total,
      loading: false,
    })
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
