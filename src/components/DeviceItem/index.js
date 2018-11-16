import React, { Component } from 'react'
import './style.css'
//const devices=['coffe Machine', 'Alarm Clock', 'Television'];

class DeviceItem extends Component {
    render() {
        const { name, ip, description, onDelete, onEdit } = this.props
        // const name = this.props.name
        // const ip = this.props.ip
        return (
            <li>
                {' '}
                {name}
                <button onClick={onDelete}> delete </button>
                <button onClick={onEdit}> edit </button>
            </li>
        )
    }
}

export default DeviceItem
