import React, { useState } from 'react'

const AuthenticationContext = React.createContext({})

export const AuthenticationProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(
    !!localStorage.getItem('pvaDataJwt')
  )

  return (
    <AuthenticationContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthenticationContext.Provider>
  )
}

export default AuthenticationContext
