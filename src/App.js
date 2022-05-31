import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import DivisionsList from './DivisionsList'
import Division from './Division'
import Team from './Team'
import styled from '@emotion/styled'
import { Global } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import { theme, globalStyles, color } from 'utils/style'
import { PrimaryHeading } from 'components/Headings'
import MaintenanceMessage from './MaintenanceMessage'

const AppHeader = styled.header`
  width: 100%;
  background-color: ${color('lighterGrey')};
  text-align: center;
`

const Main = styled.main`
  padding: 10px 0 0 0;
  max-width: 1200px;
  margin: 0 auto 50px;
`

const maintenanceMode = true

const App = ({ client }) => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <Router>
        <Global styles={globalStyles} />
        <AppHeader>
          <PrimaryHeading>
            <Link to="/">alt-pva</Link>
          </PrimaryHeading>
        </AppHeader>
        <Main>
          {maintenanceMode ? (
            <MaintenanceMessage />
          ) : (
            <Switch>
              <Route exact path="/">
                <DivisionsList />
              </Route>
              <Route path="/division/:divisionSlug/team/:teamSlug">
                <Team />
              </Route>
              <Route path="/division/:slug">
                <Division />
              </Route>
            </Switch>
          )}
        </Main>
      </Router>
    </ThemeProvider>
  </ApolloProvider>
)

export default App
