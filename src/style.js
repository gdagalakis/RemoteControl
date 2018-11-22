import styled from 'styled-components'
import * as R from 'ramda'

export const VanillaTheme = {
    fg: '#20211a',
    bg: '#f1f2de',
    border: '#53543f',
}

export const DarculaTheme = {
    fg: '#7093e0',
    bg: '#11110f',
    border: '#d7ecef',
}

export const Funny = {
    fg: '#4a81d3',
    bg: '#e53247',
    border: '#71d34a',
}

export const selectThemeByName = R.cond([
    [R.equals('VanillaTheme'), R.always(VanillaTheme)],
    [R.equals('DarculaTheme'), R.always(DarculaTheme)],
    [R.equals('Funny'), R.always(Funny)],
    [R.T, R.always(VanillaTheme)],
])

export const AppDiv = styled.div`
    text-align: center;
    color: ${props => props.theme.fg};
    background: ${props => props.theme.bg};
`
