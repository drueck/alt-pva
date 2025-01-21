import React, { useContext } from 'react'
import NavList from 'components/NavList'
import Text from 'components/Text'
import FavoritesContext from 'components/FavoritesContext'
import SectionBackground from 'components/SectionBackground'
import Favorite from './Favorite'

const favoriteKey = ({ divisionSlug, teamSlug }) =>
  `${divisionSlug}-${teamSlug}`

const FavoritesList = () => {
  const { favorites } = useContext(FavoritesContext)

  return favorites.length ? (
    <SectionBackground>
      <NavList>
        {favorites.map((favorite) => (
          <Favorite key={favoriteKey(favorite)} favorite={favorite} />
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
