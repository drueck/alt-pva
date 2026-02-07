// wrapper for rendering components in storybook stories

import React from 'react'
import { ThemeProvider } from '@emotion/react'
import { dark, globalStyles } from 'utils/style'
import { Global } from '@emotion/react'
import { BrowserRouter as Router } from 'react-router'

const Story = ({ children }) => (
  // TODO: allow theme switching here
  <ThemeProvider theme={dark}>
    <Router>
      <Global styles={globalStyles} />
      {children}
    </Router>
  </ThemeProvider>
)

export default Story
