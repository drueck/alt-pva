import React from 'react'
import { Link, useLocation } from 'react-router'
import styled from '@emotion/styled'
import Text from './Text'

const ErrorText = styled(Text)`
  text-align: center;
  font-size: 1.2em;
`

const QueryError = ({ error }) => {
  const location = useLocation()

  return error.message === 'not authorized' ? (
    <ErrorText>
      Sorry, it appears that login is required during this season and you don't
      have a current session. Please{' '}
      <Link to={{ pathname: '/login', state: { from: location } }}>login</Link>{' '}
      (again) to continue.
    </ErrorText>
  ) : (
    <ErrorText>Something went wrong :(</ErrorText>
  )
}

export default QueryError
