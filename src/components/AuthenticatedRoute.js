import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import AuthenticationContext from 'components/AuthenticationContext'

const AuthenticatedRoute = ({ children, ...rest }) => {
  const { loginRequired, authenticated } = useContext(AuthenticationContext)

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authenticated || !loginRequired ? (
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
