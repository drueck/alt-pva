import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import AuthenticationContext from 'components/AuthenticationContext'

const AuthenticatedRoute = ({ children, ...rest }) => {
  const { authenticated } = useContext(AuthenticationContext)

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default AuthenticatedRoute
