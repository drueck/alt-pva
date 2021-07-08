import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import styled from '@emotion/styled'
import { color } from 'utils/style'
import Text from 'components/Text'
import { gql, useLazyQuery } from '@apollo/client'

const CenteredContainer = styled.div`
  margin: 0 auto;
  max-width: 400px;
  padding: 0 1em;
  text-align: center;
`

const PasswordLabel = styled.label`
  color: ${color('perrywinkle')};
  font-size: 1.3em;
  font-weight: bold;
  line-height: 2em;
  margin: 10px 0;
`

const PasswordInput = styled.input`
  border-radius: 0.3em;
  border: 1px solid ${color('mutedBlue')};
  font-size: 2em;
  padding: 0.5em;
  text-align: center;
  width: calc(100% - 1em);
`

const LoginButton = styled.button`
  background-color: ${color('perrywinkle')};
  border-radius: 0.3em;
  border: none;
  color: white;
  display: block;
  font-size: 2em;
  margin-top: 0.5em;
  padding: 0.5em;
  width: 100%;

  &:hover {
    background-color: #aba8ec;
  }
`

const ErrorText = styled(Text)`
  color: red;
`

const ONE_WEEK_SECONDS = 7 * 24 * 60 * 60

const cookieOptions = {
  path: '/',
  maxAge: ONE_WEEK_SECONDS,
  sameSite: 'strict',
}

const LOGIN_QUERY = gql`
  query Login($password: String!) {
    login(password: $password) {
      token
    }
  }
`

const Login = ({ setAuthenticated }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['pva_data_jwt'])
  const [password, setPassword] = useState('')
  const [login, { loading, data, error }] = useLazyQuery(LOGIN_QUERY)

  const submit = () => login({ variables: { password } })

  useEffect(() => {
    if (data) {
      setCookie('pva_data_jwt', data.login.token, cookieOptions)
      setAuthenticated(true)
    }
  }, [data, setCookie, setAuthenticated])

  useEffect(() => {
    if (error && cookies.pva_data_jwt) {
      removeCookie('pva_data_jwt', cookieOptions)
      setAuthenticated(false)
    }
  }, [error, cookies.pva_data_jwt, removeCookie, setAuthenticated])

  return (
    <CenteredContainer>
      <PasswordLabel htmlFor="password">Password, please</PasswordLabel>
      <PasswordInput
        id="password"
        type="password"
        autoFocus
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyUp={(e) => e.keyCode === 13 && submit()}
        disabled={loading}
      />
      {error && <ErrorText>Sorry, wrong password!</ErrorText>}
      <LoginButton type="button" onClick={submit}>
        Log In
      </LoginButton>
    </CenteredContainer>
  )
}

export default Login
