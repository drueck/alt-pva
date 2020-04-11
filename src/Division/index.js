import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { Link } from '@reach/router'
import SubHeading from 'components/SubHeading'
import styled from '@emotion/styled'
import { color } from 'utils/style'

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

const TeamCard = ({
  team: { name, slug: teamSlug },
  divisionSlug,
  ...props
}) => (
  <li {...props}>
    <Link to={`/division/${divisionSlug}/team/${teamSlug}/schedules`}>
      {name}
    </Link>
  </li>
)

const StyledTeamCard = styled(TeamCard)`
  list-style: none;
  background-color: ${color('lightGrey')};
  margin-bottom: 2px;

  a {
    text-decoration: none;
    color: black;
    height: 100%;
    padding: 20px;
    display: block;
    color: ${color('mutedBlue')};
  }
`

const StyledList = styled.ul`
  padding: 0;
  list-style: none;
  width: 100%;
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
      <SubHeading>{divisionName}</SubHeading>
      <StyledList>
        {teams.map((team) => (
          <StyledTeamCard
            key={team.id}
            team={team}
            divisionSlug={divisionSlug}
          />
        ))}
      </StyledList>
    </>
  )
}

export default Division
