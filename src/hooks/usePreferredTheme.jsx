import { useState, useEffect } from 'react'
import { themes, dark } from 'utils/style'

const getPreferredTheme = () => localStorage.getItem('theme')

const devicePreference = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

const usePreferredTheme = () => {
  const [theme, setTheme] = useState(dark)

  useEffect(() => {
    let themeName = getPreferredTheme() || devicePreference() || 'dark'
    console.log('themeName', themeName)
    if (!(themeName in themes)) {
      themeName = 'dark'
    }
    setTheme(themes[themeName])
  }, [])

  const setPreferredTheme = (themeName) => {
    if (!(themeName in themes)) {
      return
    }

    localStorage.setItem('theme', themeName)
    setTheme(themes[themeName])
  }

  return [theme, setPreferredTheme]
}

export default usePreferredTheme
