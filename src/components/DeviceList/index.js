import React, { Component } from 'react'
import './style.css'
import DeviceItem from '../DeviceItem'
//const devices=['coffe Machine', 'Alarm Clock', 'Television'];

class DeviceList extends Component {
    componentWillUpdate(nextProps) {
        if (nextProps.devices.length == 1) {
            alert('one device left')
        }
    }

    render() {
        const { devices, onDelete } = this.props
        return (
            <div className="deviceList">
                <ul>
                    {devices.map((item, index) => (
                        <DeviceItem
                            key={index}
                            {...item}
                            onDelete={() => onDelete(item.id)}
                        />
                    ))}
                </ul>
            </div>
        )
    }
}

export default DeviceList
