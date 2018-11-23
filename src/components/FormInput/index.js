import React from 'react'
//import './style.css'
import { FormInputWrapper } from './style.js'

const handleChange = action => ev => {
    action(ev.target.value)
}

const FormInput = ({
    isFunny,
    className,
    desc,
    value,
    onChange,
    name,
    type,
}) => (
    <FormInputWrapper isFunny={isFunny} className={className}>
        {desc}
        {': '}
        <input
            value={value}
            type={type || 'text'}
            name={name}
            onChange={handleChange(onChange)}
        />
    </FormInputWrapper>
)

export default FormInput
