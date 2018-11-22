import styled from 'styled-components'

export const FormInputWrapper = styled.label`
    color: ${props => (props.isFunny ? 'red' : '')};
    @media only screen and (max-width: 850px) {
        width: 100%;
    }
`
