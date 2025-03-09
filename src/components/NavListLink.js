import styled from '@emotion/styled'
import { color } from 'utils/style'
import { Link } from 'react-router-dom'

const NavListLink = styled(Link)`
  text-decoration: none;
  height: 100%;
  padding: 20px;
  display: block;
  color: ${color('lightMutedBlue')};
`

export default NavListLink
