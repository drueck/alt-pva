import React from 'react'
import { Link } from 'react-router'
import styled from '@emotion/styled'
import { color } from 'utils/style'
import Text from './Text'

const ErrorText = styled(Text)`
  text-align: center;
  font-size: 1.2em;
`

const StyledLink = styled(Link)`
  &,
  &:visited {
    color: ${color('lightMutedBlue')};
    text-decoration: none;
  }
`

const NotFound = () => (
  <>
    <ErrorText>
      Sorry, we couldn't find that page! If you were looking for a team, perhaps
      the team's name or division changed this season, or we're in-between
      seasons. Either way, feel free to check out the{' '}
      <StyledLink to="/">homepage</StyledLink> for everything that's currently
      available.
    </ErrorText>
  </>
)

export default NotFound
