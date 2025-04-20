import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import AuthenticationContext from 'components/AuthenticationContext'

const RequireAuth = ({ children }) => {
  const { loginRequired, authenticated } = useContext(AuthenticationContext)
  const location = useLocation()

  if (loginRequired && !authenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default RequireAuth
