import React from 'react'
import NavList from 'components/NavList'
import NavListLink from 'components/NavListLink'
import NavListItem from 'components/NavListItem'

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
    <NavList>
      {sortedTeams.map(({ id, name, slug }) => (
        <NavListItem key={id}>
          <NavListLink key={id} to={`/division/${divisionSlug}/team/${slug}`}>
            {name}
          </NavListLink>
        </NavListItem>
      ))}
    </NavList>
  )
}

export default Teams
