import styled from 'styled-components'

const FormInputWrapper = styled.label`
  color: ${props => (props.isFunny ? 'red' : undefined)};
  @media only screen and (max-width: 850px) {
    width: 100%;
  }
`
export default FormInputWrapper
