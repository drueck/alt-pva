// wrapper for rendering components in storybook stories

import React from 'react'
import { ThemeProvider } from '@emotion/react'
import { theme, globalStyles } from 'utils/style'
import { Global } from '@emotion/react'
import { BrowserRouter as Router } from 'react-router'

const Story = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Router>
      <Global styles={globalStyles} />
      {children}
    </Router>
  </ThemeProvider>
)

export default Story
