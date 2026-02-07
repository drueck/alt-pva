import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router'
import styled from '@emotion/styled'
import { color } from 'utils/style'
import Text from 'components/Text'
import { gql, useQuery, useLazyQuery } from '@apollo/client'
import AuthenticationContext from 'components/AuthenticationContext'

const CenteredContainer = styled.div`
  margin: 0 auto;
  max-width: 400px;
  padding: 0 1em;
  text-align: center;
`

const PasswordLabel = styled.label`
  display: block;
  color: ${color('text')};
  font-size: 1.3em;
  font-weight: bold;
  line-height: 2em;
  margin: 10px 0 20px;
`

const PasswordInput = styled.input`
  border: 1px solid ${color('text')};
  border-radius: 0.3em;
  background-color: ${color('surface')};
  color: ${color('text')};
  font-size: 2em;
  padding: 0.5em;
  text-align: center;
  width: calc(100% - 1em);
`

const LoginButton = styled.button`
  background-color: ${color('accentMuted')};
  color: ${color('text')};
  border-radius: 0.3em;
  border: none;
  display: block;
  font-size: 2em;
  margin-top: 0.5em;
  padding: 0.5em;
  width: 100%;

  &:hover,
  &:focus-visible {
    background-color: ${color('accent')};
  }
`

const ErrorText = styled(Text)`
  color: ${color('danger')};
`

const LOGIN_REQUIRED_QUERY = gql`
  query LoginRequired {
    loginRequired
  }
`

const LOGIN_QUERY = gql`
  query Login($password: String!) {
    login(password: $password) {
      token
    }
  }
`

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { from } = location.state || { from: { pathname: '/' } }
  const { setAuthenticated, setLoginRequired } = useContext(
    AuthenticationContext,
  )
  const [password, setPassword] = useState('')

  const { loading: loginRequiredLoading, data: loginRequiredData } =
    useQuery(LOGIN_REQUIRED_QUERY)

  useEffect(() => {
    if (loginRequiredData) {
      if (loginRequiredData.loginRequired) {
        localStorage.removeItem('pvaDataLoginNotRequired')
        setLoginRequired(true)
      } else {
        localStorage.setItem('pvaDataLoginNotRequired', 'true')
        setLoginRequired(false)
        navigate(from, { replace: true })
      }
    }
  }, [loginRequiredData, setLoginRequired, navigate, from])

  const [login, { loading, data, error }] = useLazyQuery(LOGIN_QUERY)

  const submit = () => login({ variables: { password } })

  useEffect(() => {
    if (data) {
      localStorage.setItem('pvaDataJwt', data.login.token)
      setAuthenticated(true)
      navigate(from, { replace: true })
    }
  }, [data, setAuthenticated, navigate, from])

  useEffect(() => {
    if (error) {
      setAuthenticated(false)
    }
  }, [error, setAuthenticated])

  return (
    !loginRequiredLoading && (
      <CenteredContainer>
        <PasswordLabel htmlFor="password">
          keep it secret, keep it safe
        </PasswordLabel>
        <PasswordInput
          id="password"
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && submit()}
          disabled={loading}
        />
        {error && <ErrorText>Sorry, wrong password!</ErrorText>}
        <LoginButton type="button" onClick={submit}>
          open sesame
        </LoginButton>
      </CenteredContainer>
    )
  )
}

export default Login
