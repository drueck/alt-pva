import React, { useState } from 'react'

const AuthenticationContext = React.createContext({})

export const AuthenticationProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(
    !!localStorage.getItem('pvaDataJwt')
  )

  const [loginRequired, setLoginRequired] = useState(
    !localStorage.getItem('pvaDataLoginNotRequired')
  )

  return (
    <AuthenticationContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        loginRequired,
        setLoginRequired,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}

export default AuthenticationContext
