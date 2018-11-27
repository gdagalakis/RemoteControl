import React from 'react'
import DeviceList from '../../components/DeviceList'
import { DevicesContext } from 'lib/DevicesProvider'
const Devices = () => {
    return (
        <DevicesContext.Consumer>
            {value => <DeviceList {...value} />}
        </DevicesContext.Consumer>
    )
}

export default Devices
