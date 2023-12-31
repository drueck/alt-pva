import React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { color } from 'utils/style'
import { Link } from 'react-router-dom'

const NavListTab = ({ to, replace = false, children, ...props }) => {
  console.log(props)

  return (
    <li {...props}>
      <Link to={to} replace={replace}>
        {children}
      </Link>
    </li>
  )
}

const activeStyle = (props) =>
  props.current &&
  css`
    background-color: ${color('darkModeBlack', props)};
    border-bottom: 1px solid ${color('darkModeBlack', props)};
  `

const StyledNavListTab = styled(NavListTab)`
  list-style: none;
  background-color: #1e222c;
  margin-bottom: -1px;
  display: inline-block;
  border: 1px solid ${color('darkModeBackground')};

  &:nth-child(1) {
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

  ${activeStyle};
`

export default StyledNavListTab
