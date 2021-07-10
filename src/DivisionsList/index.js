import React from 'react'
import { useQuery } from '@apollo/client'
import DIVISIONS_QUERY from './DivisionList.query'
import { SecondaryHeading } from 'components/Headings'
import NavList from 'components/NavList'
import NavListLink from 'components/NavListLink'
import QueryError from 'components/QueryError'

const DivisionsList = () => {
  const { loading, error, data } = useQuery(DIVISIONS_QUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <QueryError error={error} />

  const { divisions } = data

  return (
    <>
      <SecondaryHeading>Divisions</SecondaryHeading>
      <NavList>
        {divisions.map(({ id, slug, name }) => (
          <NavListLink key={id} to={`/division/${slug}`}>
            {name}
          </NavListLink>
        ))}
      </NavList>
    </>
  )
}

export default DivisionsList
