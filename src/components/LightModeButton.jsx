import React from 'react'
import { useTheme } from '@emotion/react'
import SunIcon from './SunIcon'
import IconButton from './IconButton'
import { useThemeContext } from './ThemeContext'

const LightModeButton = () => {
  const theme = useTheme()
  const { themeName, setPreferredTheme } = useThemeContext()
  const isActive = themeName === 'light'

  return (
    <IconButton
      aria-label="Light Mode"
      onClick={() => setPreferredTheme('light')}
    >
      <SunIcon
        title="Light Mode"
        strokeColor={isActive ? theme.colors.accent : theme.colors.text}
      />
    </IconButton>
  )
}

export default LightModeButton
