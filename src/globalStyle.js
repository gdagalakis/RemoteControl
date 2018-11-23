import { createGlobalStyle } from 'styled-components'

export const VanillaTheme = {
    fg: '#20211a',
    bg: '#f1f2de',
    border: '#53543f',
}

const DarculaTheme = {
    fg: '#7093e0',
    bg: '#11110f',
    border: '#d7ecef',
}

const Funny = {
    fg: '#4a81d3',
    bg: '#e53247',
    border: '#71d34a',
}

export const themes = [
    { value: VanillaTheme, label: 'Vanilla' },
    { value: DarculaTheme, label: 'Darcula' },
    { value: Funny, label: 'Funny' },
]

export const defaultTheme = themes[0]

export const GlobalStyle = createGlobalStyle`
    input[type=submit] {
      width: 100%;
      background-color: #4CAF50;
      color: white;
      padding: 14px 20px;
      margin: 8px 0;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      &:hover{ background-color: #45a049; }
    }

    input[type='text'],select {
      padding: 12px 20px;
      margin: 8px 0;
      display: inline-block;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }
    /* html,body,div{
    height:100%
    } */
    @media only screen and (max-width: 850px) {
        input[type='text'] {
            width: 100%;
        }
    }
`
