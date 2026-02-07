import styled from '@emotion/styled'
import { color } from 'utils/style'

const NavListItem = styled.li`
  list-style: none;
  margin-bottom: 0;
  border-bottom: 1px solid ${color('background')};

  &:last-child {
    border-bottom: none;
  }
`

export default NavListItem
