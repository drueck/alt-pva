import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router'
import Home from './Home'
import Division from './Division'
import Team from './Team'
import styled from '@emotion/styled'
import { Global } from '@emotion/react'
import { ThemeProvider } from '@emotion/react'
import { theme, globalStyles, color } from 'utils/style'
import { PrimaryHeading } from 'components/Headings'
import MaintenanceMessage from './MaintenanceMessage'
import Login from './Login'
import RequireAuth from 'components/RequireAuth'
import NotFound from 'components/NotFound'

const AppHeader = styled.header`
  width: 100%;
  background-color: ${color('surface')};
  text-align: center;
`

const Main = styled.main`
  padding: 10px 0 0 0;
  max-width: 1200px;
  margin: 0 auto 50px;
`

const maintenanceMode = false

const App = () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
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
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route
              path="/division/:divisionSlug/team/:teamSlug"
              element={
                <RequireAuth>
                  <Team />
                </RequireAuth>
              }
            />
            <Route
              path="/division/:divisionSlug"
              element={
                <RequireAuth>
                  <Division />
                </RequireAuth>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </Main>
    </BrowserRouter>
  </ThemeProvider>
)

export default App
