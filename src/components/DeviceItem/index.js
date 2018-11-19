import React from 'react'
import './style.css'
//const devices=['coffe Machine', 'Alarm Clock', 'Television'];
const DeviceItem = ({
    active,
    name,
    ip,
    description,
    onDelete,
    handleChange,
    index,
}) => (
    <li className="deviceitem">
        <div className="itemID">
            <input type="checkbox" onChange={handleChange} checked={active} />
            {index}
        </div>
        <div className="itemName">{name}</div>
        <div className="itemIP">{ip}</div>
        <div className="itemDescription">{description}</div>
        <div className="itemActions">
            <button onClick={onDelete}> delete </button>
            <button> edit </button>
        </div>
    </li>
)

export default DeviceItem
