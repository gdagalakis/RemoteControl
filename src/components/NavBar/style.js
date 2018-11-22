import styled from 'styled-components'
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
        padding: 10px 10px;
    }
    a:hover {
        background-color: rgb(129, 226, 255);
        color: black;
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

    select {
        position: absolute;
        right: 10px;
        padding: 0;
    }
`
