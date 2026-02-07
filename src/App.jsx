import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router'
import Home from './Home'
import Division from './Division'
import Team from './Team'
import styled from '@emotion/styled'
import { Global } from '@emotion/react'
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import { globalStyles, color } from 'utils/style'
import { PrimaryHeading } from 'components/Headings'
import MaintenanceMessage from './MaintenanceMessage'
import Login from './Login'
import RequireAuth from 'components/RequireAuth'
import NotFound from 'components/NotFound'
import { useThemeContext } from './components/ThemeContext'
import LightModeButton from 'components/LightModeButton'
import DarkModeButton from 'components/DarkModeButton'

const AppHeader = styled.header`
  width: 100%;
  background-color: ${color('surface')};
  display: flex;
  justify-content: center;
`

const HeaderContent = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`

const HeaderActions = styled.div`
  display: flex;
  gap: 10px;
  padding-right: 5px;
`

const Main = styled.main`
  padding: 10px 10px 0 10px;
  max-width: 1200px;
  margin: 0 auto 50px;
`

const maintenanceMode = false

const App = () => {
  const { theme } = useThemeContext()

  return (
    <EmotionThemeProvider theme={theme}>
      <BrowserRouter>
        <Global styles={globalStyles} />
        <AppHeader>
          <HeaderContent>
            <PrimaryHeading>
              <Link to="/">alt-pva</Link>
            </PrimaryHeading>
            <HeaderActions>
              <LightModeButton />
              <DarkModeButton />
            </HeaderActions>
          </HeaderContent>
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
    </EmotionThemeProvider>
  )
}

export default App
