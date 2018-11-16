import React, { Component } from 'react'
import jsDevices from '../../assets/devices'
import DeviceList from '../../components/DeviceList'
import { remove } from 'ramda'
import { findById } from '../../lib/utils'

const Devices = ({ devices, onDelete }) => {
    return <DeviceList devices={devices} onDelete={onDelete} />
}

export default Devices
