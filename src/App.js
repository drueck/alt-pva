import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Home from './Home'
import Division from './Division'
import Team from './Team'
import styled from '@emotion/styled'
import { Global } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import { theme, globalStyles, color } from 'utils/style'
import { PrimaryHeading } from 'components/Headings'
import MaintenanceMessage from './MaintenanceMessage'
import Login from './Login'
import AuthenticatedRoute from 'components/AuthenticatedRoute'
import NotFound from 'components/NotFound'

const AppHeader = styled.header`
  width: 100%;
  background-color: ${color('darkModeBlack')};
  text-align: center;
`

const Main = styled.main`
  padding: 10px 0 0 0;
  max-width: 1200px;
  margin: 0 auto 50px;
`

const maintenanceMode = true

const App = () => (
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
            <Route path="/login">
              <Login />
            </Route>
            <AuthenticatedRoute exact path="/">
              <Home />
            </AuthenticatedRoute>
            <AuthenticatedRoute path="/division/:divisionSlug/team/:teamSlug">
              <Team />
            </AuthenticatedRoute>
            <AuthenticatedRoute path="/division/:divisionSlug">
              <Division />
            </AuthenticatedRoute>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        )}
      </Main>
    </Router>
  </ThemeProvider>
)

export default App
