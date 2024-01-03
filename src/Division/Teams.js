import React from 'react'
import styled from '@emotion/styled'
import { color } from 'utils/style'
import NavList from 'components/NavList'
import NavListLink from 'components/NavListLink'

const StyledNavList = styled(NavList)`
  margin: 0;
`

const StyledNavListLink = styled(NavListLink)`
  margin-bottom: 0;
  border-bottom: 1px solid ${color('darkModeBackground')};

  &:last-child {
    border-bottom: none;
  }
`

const Teams = ({ divisionSlug, teams }) => {
  const sortedTeams = teams.slice(0).sort((a, b) => {
    if (a.name < b.name) {
      return -1
    }
    if (a.name > b.name) {
      return 1
    }
    return 0
  })

  return (
    <StyledNavList>
      {sortedTeams.map(({ id, name, slug }) => (
        <StyledNavListLink
          key={id}
          to={`/division/${divisionSlug}/team/${slug}`}
        >
          {name}
        </StyledNavListLink>
      ))}
    </StyledNavList>
  )
}

export default Teams
