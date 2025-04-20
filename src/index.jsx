import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { AuthenticationProvider } from 'components/AuthenticationContext'
import { FavoritesProvider } from 'components/FavoritesContext'
import Apollo from 'components/Apollo'

const root = createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <AuthenticationProvider>
      <FavoritesProvider>
        <Apollo>
          <App />
        </Apollo>
      </FavoritesProvider>
    </AuthenticationProvider>
  </React.StrictMode>,
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
