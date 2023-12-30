import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import DIVISION_QUERY from './Division.query'
import { SecondaryHeading } from 'components/Headings'
import NavList from 'components/NavList'
import NavListLink from 'components/NavListLink'
import TeamNameWithRank from 'components/TeamNameWithRank'
import QueryError from 'components/QueryError'
import NotFound from 'components/NotFound'

const Division = () => {
  const { slug } = useParams()

  const { loading, error, data } = useQuery(DIVISION_QUERY, {
    variables: { slug },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <QueryError error={error} />
  if (!data?.division) return <NotFound />

  const {
    division: { name: divisionName, slug: divisionSlug, teams },
  } = data

  const sortedTeams = teams.slice(0).sort((a, b) => {
    const rankResult = a.rank - b.rank
    if (rankResult !== 0) {
      return rankResult
    }
    if (a.name < b.name) {
      return -1
    }
    if (a.name > b.name) {
      return 1
    }
    return 0
  })

  return (
    <>
      <SecondaryHeading>{divisionName}</SecondaryHeading>
      <NavList>
        {sortedTeams.map(({ id, name, slug, rank }) => (
          <NavListLink key={id} to={`/division/${divisionSlug}/team/${slug}`}>
            <TeamNameWithRank name={name} rank={rank} />
          </NavListLink>
        ))}
      </NavList>
    </>
  )
}

export default Division
