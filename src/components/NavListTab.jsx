import React from 'react'
import styled from '@emotion/styled'
import { color } from 'utils/style'
import { NavLink } from 'react-router'
import { css } from '@emotion/react'

const NavListTab = ({ to, replace = false, active, children, ...props }) => (
  <li {...props}>
    <NavLink to={to} replace={replace} end>
      {children}
    </NavLink>
  </li>
)

const activeStyles = ({ active, theme }) =>
  active &&
  css`
    background-color: ${color('surface', { theme })};
    border-bottom: 1px solid ${color('surface', { theme })};
  `

const StyledNavListTab = styled(NavListTab)`
  list-style: none;
  background-color: ${color('background')};
  margin-bottom: -1px;
  display: inline-block;
  border: 1px solid ${color('background')};

  &:nth-of-type(1) {
    border-left: none;
  }

  a {
    text-decoration: none;
    height: 100%;
    padding: 20px;
    display: block;
    color: ${color('accent')};
  }

  ${activeStyles};
`

export default StyledNavListTab
