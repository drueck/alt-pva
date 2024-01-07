import React, { useContext } from 'react'
import NavList from 'components/NavList'
import NavListLink from 'components/NavListLink'
import Text from 'components/Text'
import FavoritesContext from 'components/FavoritesContext'
import SectionBackground from 'components/SectionBackground'

const FavoritesList = () => {
  const { favorites } = useContext(FavoritesContext)

  return favorites.length ? (
    <SectionBackground>
      <NavList>
        {favorites.map(({ teamName, divisionSlug, teamSlug, divisionName }) => (
          <NavListLink
            key={`/division/${divisionSlug}/team/${teamSlug}`}
            to={`/division/${divisionSlug}/team/${teamSlug}`}
          >
            {teamName} ({divisionName})
          </NavListLink>
        ))}
      </NavList>
    </SectionBackground>
  ) : (
    <SectionBackground>
      <Text>
        Star the teams you're interested in to add them to your favorites.
      </Text>
    </SectionBackground>
  )
}

export default FavoritesList
