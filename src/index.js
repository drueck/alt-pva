import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { AuthenticationProvider } from 'components/AuthenticationContext'
import { FavoritesProvider } from 'components/FavoritesContext'
import Apollo from 'components/Apollo'

// There seems to be a bug in Apollo Client or something related when
// using React.StrictMode where it gives a warning in the console about
// updating state in an unmounted component. I think this is caused by
// doing a navigation in a useEffect as a result of query results.
// Taking away React.StrictMode removes the warning. I'd like to put this
// back though when this is resolved.
//
// https://github.com/apollographql/apollo-client/issues/8011
// https://github.com/apollographql/apollo-client/issues/6209
//
// ReactDOM.render(
//   <React.StrictMode>
//     <AuthenticationProvider>
//       <Apollo>
//         <App />
//       </Apollo>
//     </AuthenticationProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// )

ReactDOM.render(
  <AuthenticationProvider>
    <FavoritesProvider>
      <Apollo>
        <App />
      </Apollo>
    </FavoritesProvider>
  </AuthenticationProvider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
