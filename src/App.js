import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { Router, Link } from '@reach/router'
import DivisionsList from './DivisionsList'
import Division from './Division'
import Team from './Team'
import styled from '@emotion/styled'
import { ThemeProvider } from 'emotion-theming'
import { theme, color } from 'utils/style'

const AppHeader = styled.header`
  width: 100%;
  background-color: ${color('lightGrey')};
  text-align: center;
`

const AppTitle = styled.h1`
  margin: 0;
  padding: 10px;

  a {
    text-decoration: none;
    color: ${color('perrywinkle')};
  }
`

const Main = styled.main`
  padding: 10px 0 0 0;
  max-width: 1200px;
  margin: 0 auto;
`

const App = ({ client }) => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <AppHeader>
        <AppTitle>
          <Link to="/">alt-pva</Link>
        </AppTitle>
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
