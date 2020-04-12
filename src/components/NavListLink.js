import React from 'react'
import styled from '@emotion/styled'
import { color } from 'utils/style'
import { Link } from '@reach/router'

const NavListLink = ({ to, children, ...props }) => (
  <li {...props}>
    <Link to={to}>{children}</Link>
  </li>
)

const StyledNavListLink = styled(NavListLink)`
  list-style: none;
  background-color: ${color('lightGrey')};
  margin-bottom: 2px;

  a {
    text-decoration: none;
    color: black;
    height: 100%;
    padding: 20px;
    display: block;
    color: ${color('mutedBlue')};
  }
`

export default StyledNavListLink
