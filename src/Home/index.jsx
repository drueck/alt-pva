import React from 'react'
import { useQuery } from '@apollo/client'
import DIVISIONS_QUERY from './DivisionsList.query'
import { SecondaryHeading } from 'components/Headings'
import QueryError from 'components/QueryError'
import DivisionsList from './DivisionsList'
import FavoritesList from './FavoritesList'

const Home = () => {
  const { loading, error, data } = useQuery(DIVISIONS_QUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <QueryError error={error} />

  const { divisions } = data

  return (
    <>
      <SecondaryHeading>Favorites</SecondaryHeading>
      <FavoritesList />
      <SecondaryHeading>Divisions</SecondaryHeading>
      <DivisionsList divisions={divisions} />
    </>
  )
}

export default Home
