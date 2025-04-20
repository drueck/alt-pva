import React from 'react'
import styled from '@emotion/styled'
import { color } from 'utils/style'
import { NavLink } from 'react-router-dom'

const NavListTab = ({ to, replace = false, children, ...props }) => (
  <li {...props}>
    <NavLink to={to} replace={replace} end>
      {children}
    </NavLink>
  </li>
)

const StyledNavListTab = styled(NavListTab)`
  list-style: none;
  background-color: #1e222c;
  margin-bottom: -1px;
  display: inline-block;
  border: 1px solid ${color('darkModeBackground')};

  &:nth-of-type(1) {
    border-left: none;
  }

  a {
    text-decoration: none;
    color: black;
    height: 100%;
    padding: 20px;
    display: block;
    color: ${color('lightMutedBlue')};
  }

  & > a.active {
    background-color: ${color('darkModeBlack')};
    border-bottom: 1px solid ${color('darkModeBlack')};
  }
`

export default StyledNavListTab
