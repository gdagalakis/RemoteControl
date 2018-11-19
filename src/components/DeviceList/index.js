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
        const { devices, onDelete, onChange } = this.props
        return (
            <div className="deviceList">
                <ul>
                    <li className="deviceitem header">
                        <div className="itemID">ACTIVE ID</div>
                        <div className="itemName">NAME</div>
                        <div className="itemIP">IP</div>
                        <div className="itemDescription">DESCRIPTION</div>
                        <div className="itemActions">ACTIONS</div>
                    </li>
                    {devices.map((item, index) => (
                        <DeviceItem
                            key={index}
                            index={index + 1}
                            {...item}
                            onDelete={() => onDelete(item.id)}
                            handleChange={() => onChange(item.id)}
                        />
                    ))}
                </ul>
            </div>
        )
    }
}

export default DeviceList
