import { css } from '@emotion/core'
import { curry } from 'utils/fp'

export const theme = {
  colors: {
    lightGreen: '#90b37f',
    mutedBlue: '#3B719f',
    lightMutedBlue: '#578aba',
    perrywinkle: '#8f8ce7',
    lightPink: '#b37f88',
    darkModeBackground: '#2e3544',
    darkModeBlack: '#252a36',
    darkModeText: '#bdc0bb',
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
