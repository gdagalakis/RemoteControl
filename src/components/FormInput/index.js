import React from 'react'
import './style.css'

const handleChange = action => ev => {
    action(ev.target.value)
}

const FormInput = ({ className, desc, value, onChange, name }) => (
    <label className={className}>
        {desc}
        {': '}
        <input
            value={value}
            type="text"
            name={name}
            onChange={handleChange(onChange)}
        />
    </label>
)

export default FormInput
