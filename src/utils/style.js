import { css } from '@emotion/react'
import { curry } from 'utils/fp'

export const light = {
  colors: {
    success: '#247140',
    accentMuted: '#2d5a82',
    accent: '#2b6ca3',
    heading: '#5b58a8',
    danger: '#a63840',
    background: '#f0f1f3',
    surface: '#ffffff',
    text: '#2e3544',
  },
}

export const dark = {
  colors: {
    success: '#a0c88e',
    accentMuted: '#3B719f',
    accent: '#72a7da',
    heading: '#a09df0',
    danger: '#c98a94',
    background: '#2e3544',
    surface: '#222733',
    text: '#d0d3ce',
  },
}

export const theme = dark

export const color = curry((colorName, props) => props.theme.colors[colorName])

export const globalStyles = css`
  body {
    color: ${theme.colors.text};
    background-color: ${theme.colors.background};
    margin: 0;
    font-family: 'Roboto Mono', monospace;
  }
`
