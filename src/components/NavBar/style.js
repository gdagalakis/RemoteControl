import styled, { css } from 'styled-components'
import Select from 'react-select'

export const NavWrapper = styled.nav`
    position: relative;
    ul {
        display: flex;
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: #333;
    }
    li {
        float: left;
    }
    a {
        color: rgb(0, 140, 255);
        text-decoration: none;
        display: block;
        padding: 20px 10px;
    }
    a:hover {
        background-color: rgb(129, 226, 255);
    }

    .disabled:active {
        pointer-events: none !important;
    }

    ul.submenu {
        display: none;
        position: absolute;
        :hover {
            display: flex;
        }
    }
    a:hover + ul.submenu {
        display: flex;
    }

    > div {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        margin: 0 auto;
        background-color: #333;
    }
    a.active {
        background-color: rgb(49, 187, 212);
        color: white;
    }
`
export const ThemeSelector = styled(Select)`
    position: absolute !important;
    right: 10px;
    font-size: small;
    width: 10%;
`
