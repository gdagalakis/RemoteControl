import React from 'react'
import P from 'prop-types'
import FormInputWrapper from './style.js'

const handleChange = action => ev => {
  action(ev.target.value)
}

const FormInput = ({ isFunny, className, desc, value, onChange, name, type }) => (
  <FormInputWrapper isFunny={isFunny} className={className}>
    {desc}
    {': '}
    <input value={value} type={type} name={name} onChange={handleChange(onChange)} />
  </FormInputWrapper>
)

FormInput.defaultProps = {
  type: 'text',
}

FormInput.propTypes = {
  isFunny: P.bool,
  className: P.string,
  desc: P.string,
  value: P.string,
  onChange: P.func,
  name: P.string,
  type: P.string,
}
export default FormInput
