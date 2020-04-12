import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { Router, Link } from '@reach/router'
import DivisionsList from './DivisionsList'
import Division from './Division'
import Team from './Team'
import styled from '@emotion/styled'
import { Global } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import { theme, globalStyles, color } from 'utils/style'
import { PrimaryHeading } from 'components/Headings'

const AppHeader = styled.header`
  width: 100%;
  background-color: ${color('lightGrey')};
  text-align: center;
`

const Main = styled.main`
  padding: 10px 0 0 0;
  max-width: 1200px;
  margin: 0 auto 50px;
`

const App = ({ client }) => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <AppHeader>
        <PrimaryHeading>
          <Link to="/">alt-pva</Link>
        </PrimaryHeading>
      </AppHeader>
      <Main>
        <Router>
          <DivisionsList path="/" />
          <Division path="/division/:slug" />
          <Team path="/division/:divisionSlug/team/:teamSlug/*" />
        </Router>
      </Main>
    </ThemeProvider>
  </ApolloProvider>
)

export default App
