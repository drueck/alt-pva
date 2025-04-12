import React from 'react'
import styled from '@emotion/styled'
import NavListItem from 'components/NavListItem'
import NavListLink from 'components/NavListLink'
import RemoveFavoriteButton from 'components/RemoveFavoriteButton'

const FavoriteLink = styled(NavListLink)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const FavoriteContainer = styled(NavListItem)`
  display: flex;
  justify-content: space-between;
`

const Favorite = ({ favorite }) => {
  const { teamName, divisionName, teamSlug, divisionSlug } = favorite

  return (
    <FavoriteContainer>
      <FavoriteLink
        key={`/division/${divisionSlug}/team/${teamSlug}`}
        to={`/division/${divisionSlug}/team/${teamSlug}`}
      >
        <span>{teamName}</span> <span>({divisionName})</span>
      </FavoriteLink>
      <RemoveFavoriteButton favorite={favorite} />
    </FavoriteContainer>
  )
}

export default Favorite
