import React, { createContext, useState, useEffect } from 'react'
import { themes, dark } from 'utils/style'

export const ThemeContext = createContext()

const getPreferredTheme = () => localStorage.getItem('theme')

const devicePreference = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(dark)
  const [themeName, setThemeName] = useState('dark')

  useEffect(() => {
    let name = getPreferredTheme() || devicePreference() || 'dark'
    if (!(name in themes)) {
      name = 'dark'
    }
    setThemeName(name)
    setTheme(themes[name])
  }, [])

  const setPreferredTheme = (name) => {
    if (!(name in themes)) {
      return
    }

    localStorage.setItem('theme', name)
    setThemeName(name)
    setTheme(themes[name])
  }

  return (
    <ThemeContext.Provider value={{ theme, themeName, setPreferredTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeProvider')
  }
  return context
}
