import React from 'react'
import { useQuery } from '@apollo/client'
import DIVISION_QUERY from './Division.query'
import SubHeading from 'components/SubHeading'
import NavList from 'components/NavList'
import NavListLink from 'components/NavListLink'

const Division = ({ slug }) => {
  const { loading, error, data } = useQuery(DIVISION_QUERY, {
    variables: { slug },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Something went wrong :(</p>

  const {
    division: { name: divisionName, slug: divisionSlug, teams },
  } = data

  return (
    <>
      <SubHeading>{divisionName}</SubHeading>
      <NavList>
        {teams.map(({ id, name, slug }) => (
          <NavListLink
            key={id}
            to={`/division/${divisionSlug}/team/${slug}/schedules`}
          >
            {name}
          </NavListLink>
        ))}
      </NavList>
    </>
  )
}

export default Division
