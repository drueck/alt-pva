// wrapper for rendering components in storybook stories

import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import { theme, globalStyles } from 'utils/style'
import { Global } from '@emotion/core'
import { BrowserRouter as Router } from 'react-router-dom'

const Story = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Router>
      <Global styles={globalStyles} />
      {children}
    </Router>
  </ThemeProvider>
)

export default Story
