import React from 'react'
import styled from '@emotion/styled'
import { color } from 'utils/style'
import { Link } from 'react-router-dom'

const NavListLink = ({ to, replace = false, children, ...props }) => (
  <li {...props}>
    <Link to={to} replace={replace}>
      {children}
    </Link>
  </li>
)

const StyledNavListLink = styled(NavListLink)`
  list-style: none;
  margin-bottom: 0;
  border-bottom: 1px solid ${color('darkModeBackground')};

  &:last-child {
    border-bottom: none;
  }

  a {
    text-decoration: none;
    color: black;
    height: 100%;
    padding: 20px;
    display: block;
    color: ${color('lightMutedBlue')};
  }
`

export default StyledNavListLink
