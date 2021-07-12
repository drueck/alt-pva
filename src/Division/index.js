import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import DIVISION_QUERY from './Division.query'
import { SecondaryHeading } from 'components/Headings'
import NavList from 'components/NavList'
import NavListLink from 'components/NavListLink'
import QueryError from 'components/QueryError'
import RankOrdinal from 'components/RankOrdinal'

const Division = () => {
  const { slug } = useParams()

  const { loading, error, data } = useQuery(DIVISION_QUERY, {
    variables: { slug },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <QueryError error={error} />

  const {
    division: { name: divisionName, slug: divisionSlug, teams },
  } = data

  const sortedTeams = teams.slice(0).sort((a, b) => a.rank - b.rank)

  return (
    <>
      <SecondaryHeading>{divisionName}</SecondaryHeading>
      <NavList>
        {sortedTeams.map(({ id, name, slug, rank }) => (
          <NavListLink key={id} to={`/division/${divisionSlug}/team/${slug}`}>
            <RankOrdinal rank={rank} />
            {name}
          </NavListLink>
        ))}
      </NavList>
    </>
  )
}

export default Division
