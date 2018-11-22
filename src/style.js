import styled from 'styled-components'

export const invertTheme = ({ fg, bg }) => ({
    fg: bg,
    bg: fg,
})

export const defaultTheme = {
    fg: 'black',
    bg: 'white',
}
export const AppDiv = styled.div`
    text-align: center;
    color: ${props => props.theme.fg};
    background: ${props => props.theme.bg};
`
