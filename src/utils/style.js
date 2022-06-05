import { css } from '@emotion/core'
import { curry } from 'utils/fp'

export const theme = {
  colors: {
    lighterGrey: '#f0f0ef',
    lightGrey: '#d8dcd6',
    mediumGreen: '#8c9b84',
    darkGreen: '#485A40',
    mutedBlue: '#3B719f',
    lightMutedBlue: '#578aba',
    perrywinkle: '#8f8ce7',
    mediumPink: '#A78E93',
    darkPink: '#61454A',
  },
}

export const color = curry((colorName, props) => props.theme.colors[colorName])

export const globalStyles = css`
  body {
    margin: 0;
    font-family: Courier New, monospace;
  }
`
