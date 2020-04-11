export const theme = {
  colors: {
    lightGrey: '#d8dcd6',
    mutedBlue: '#3B719f',
    perrywinkle: '#8f8ce7',
  },
}

export const color = (colorName) => (props) => props.theme.colors[colorName]
