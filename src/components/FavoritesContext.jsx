import React, { useState, useEffect } from 'react'

const FavoritesContext = React.createContext({})

const isFavorite = (obj) =>
  obj.teamName && obj.divisionName && obj.teamSlug && obj.divisionSlug

const favoritesFromLocalStorage = () => {
  try {
    const favorites = JSON.parse(localStorage.getItem('favorites'))
    if (Array.isArray(favorites) && favorites.every(isFavorite)) {
      return favorites
    }
  } catch (error) {
    // if JSON.parse raises a SyntaxError we catch and ignore it, falling back
    // to the default return value
  }
  return []
}

const matchesSlugs = (testFavorite) => (existingFavorite) =>
  testFavorite.teamSlug === existingFavorite.teamSlug &&
  testFavorite.divisionSlug === existingFavorite.divisionSlug

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(favoritesFromLocalStorage())

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = (newFavorite) => {
    if (!favorites.some(matchesSlugs(newFavorite))) {
      const updatedFavorites = favorites.slice(0)
      updatedFavorites.push(newFavorite)
      setFavorites(updatedFavorites)
    }
  }

  const removeFavorite = (favoriteToRemove) => {
    const indexToRemove = favorites.findIndex(matchesSlugs(favoriteToRemove))
    if (indexToRemove !== -1) {
      const updatedFavorites = favorites.splice(0)
      updatedFavorites.splice(indexToRemove, 1)
      setFavorites(updatedFavorites)
    }
  }

  const isFavorite = (testFavorite) =>
    favorites.some(matchesSlugs(testFavorite))

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export default FavoritesContext
