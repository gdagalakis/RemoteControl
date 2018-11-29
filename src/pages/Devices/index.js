import React from 'react'
import { DevicesContext } from 'lib/DevicesProvider'
import DeviceList from '../../components/DeviceList'

const Devices = props => <DevicesContext.Consumer>{value => <DeviceList {...value} />}</DevicesContext.Consumer>

export default Devices
