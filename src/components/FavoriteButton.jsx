import React, { useContext } from 'react'
import { color, theme } from 'utils/style'
import IconButton from './IconButton'
import StarIcon from './StarIcon'
import FavoritesContext from './FavoritesContext'

const FavoriteButton = ({ favoriteData }) => {
  const { isFavorite, addFavorite, removeFavorite } =
    useContext(FavoritesContext)

  const favorite = isFavorite(favoriteData)

  return (
    <IconButton
      type="button"
      aria-label="Toggle Favorite"
      onClick={() =>
        favorite ? removeFavorite(favoriteData) : addFavorite(favoriteData)
      }
    >
      <StarIcon
        title={favorite ? 'Favorite' : 'Not Favorite'}
        strokeColor={color('accent', { theme })}
        fillColor={favorite ? color('accent', { theme }) : 'none'}
      />
    </IconButton>
  )
}

export default FavoriteButton
