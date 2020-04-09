import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { Link } from '@reach/router'

const DIVISION_QUERY = gql`
  query DivisionQuery($slug: String!) {
    division(slug: $slug) {
      id
      name
      slug
      teams {
        id
        name
        slug
      }
    }
  }
`

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
      <h2>{divisionName}</h2>
      <h3>Teams</h3>
      <ul>
        {teams.map(({ id, name, slug }) => (
          <li key={id}>
            <Link to={`/division/${divisionSlug}/team/${slug}/schedules`}>
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Division
