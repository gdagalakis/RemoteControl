import React from 'react'
import './style.css'
//const devices=['coffe Machine', 'Alarm Clock', 'Television'];

const DeviceItem = ({ name, ip, description, onDelete, onEdit }) => (
    <li>
        {' '}
        {name}
        <button onClick={onDelete}> delete </button>
        <button onClick={onEdit}> edit </button>
    </li>
)

export default DeviceItem
