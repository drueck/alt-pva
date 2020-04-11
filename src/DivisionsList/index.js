import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { Link } from '@reach/router'
import styled from '@emotion/styled'
import { color } from 'utils/style'

const DIVISIONS_QUERY = gql`
  {
    divisions {
      id
      name
      slug
    }
  }
`

const SubHeading = styled.h2`
  color: ${color('mutedBlue')};
  margin: 10px 0;
  padding-left: 20px;
`

const DivisionCard = ({ division: { id, name, slug }, ...props }) => (
  <li {...props}>
    <Link to={`/division/${slug}`}>{name}</Link>
  </li>
)

const StyledList = styled.ul`
  padding: 0;
  list-style: none;
  width: 100%;
`

const StyledDivisionCard = styled(DivisionCard)`
  list-style: none;
  background-color: ${color('lightGrey')};
  margin-bottom: 2px;

  a {
    text-decoration: none;
    color: black;
    height: 100%;
    padding: 20px;
    display: block;
  }
`

const DivisionsList = () => {
  const { loading, error, data } = useQuery(DIVISIONS_QUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Something went wrong :(</p>

  const { divisions } = data

  return (
    <>
      <SubHeading>Divisions</SubHeading>
      <StyledList>
        {divisions.map((division) => (
          <StyledDivisionCard key={division.id} division={division} />
        ))}
      </StyledList>
    </>
  )
}

export default DivisionsList
