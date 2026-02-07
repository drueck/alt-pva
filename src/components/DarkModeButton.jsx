import React from 'react'
import { useTheme } from '@emotion/react'
import MoonIcon from './MoonIcon'
import IconButton from './IconButton'
import { useThemeContext } from './ThemeContext'

const DarkModeButton = () => {
  const theme = useTheme()
  const { themeName, setPreferredTheme } = useThemeContext()
  const isActive = themeName === 'dark'

  return (
    <IconButton
      aria-label="Dark Mode"
      onClick={() => setPreferredTheme('dark')}
    >
      <MoonIcon
        title="Dark Mode"
        strokeColor={isActive ? theme.colors.accent : theme.colors.text}
      />
    </IconButton>
  )
}

export default DarkModeButton
