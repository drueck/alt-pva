import React, { useContext } from 'react'
import { color, theme } from 'utils/style'
import IconButton from './IconButton'
import TrashIcon from 'components/TrashIcon'
import FavoritesContext from './FavoritesContext'
import styled from '@emotion/styled'

const StyledIconButton = styled(IconButton)`
  padding: 20px;
`

const RemoveFavoriteButton = ({ favorite }) => {
  const { removeFavorite } = useContext(FavoritesContext)

  return (
    <StyledIconButton
      type="button"
      aria-label="Remove Favorite"
      onClick={() => removeFavorite(favorite)}
    >
      <TrashIcon
        title="Remove Favorite"
        strokeColor={color('lightPink', { theme })}
      />
    </StyledIconButton>
  )
}

export default RemoveFavoriteButton
