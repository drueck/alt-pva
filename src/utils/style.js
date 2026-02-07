import { css } from '@emotion/react'
import { curry } from 'utils/fp'

export const theme = {
  colors: {
    lightGreen: '#a0c88e',
    mutedBlue: '#3B719f',
    lightMutedBlue: '#72a7da',
    perrywinkle: '#a09df0',
    lightPink: '#c98a94',
    darkModeBackground: '#2e3544',
    darkModeBlack: '#222733',
    darkModeText: '#d0d3ce',
  },
}

export const color = curry((colorName, props) => props.theme.colors[colorName])

export const globalStyles = css`
  body {
    color: ${theme.colors.darkModeText};
    background-color: ${theme.colors.darkModeBackground};
    margin: 0;
    font-family: 'Roboto Mono', monospace;
  }
`
