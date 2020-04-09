import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { Link } from '@reach/router'

const DIVISIONS_QUERY = gql`
  {
    divisions {
      id
      name
      slug
    }
  }
`

const DivisionsList = () => {
  const { loading, error, data } = useQuery(DIVISIONS_QUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Something went wrong :(</p>

  const { divisions } = data

  return (
    <>
      <h2>Divisions</h2>
      <ul>
        {divisions.map(({ id, name, slug }) => (
          <li key={id}>
            <Link to={`/division/${slug}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default DivisionsList
