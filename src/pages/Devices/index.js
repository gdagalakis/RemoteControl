import React from 'react'
import DeviceList from '../../components/DeviceList'
import { DevicesContext } from 'lib/DevicesProvider'
const Devices = () => {
    return (
        <div>
            <DevicesContext.Consumer>
                {value => <DeviceList {...value} />}
            </DevicesContext.Consumer>
        </div>
    )
}

export default Devices
