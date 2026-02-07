import styled from '@emotion/styled'
import { color } from 'utils/style'
import { Link } from 'react-router'

const NavListLink = styled(Link)`
  text-decoration: none;
  height: 100%;
  padding: 20px;
  display: block;
  color: ${color('accent')};
`

export default NavListLink
