import React from 'react'
import { useQuery } from '@apollo/client'
import TEAM_QUERY from './Team.query'
import { Router, Link } from '@reach/router'
import Schedules from './Schedules'
import Scores from './Scores'
import Standings from './Standings'
import { SecondaryHeading } from 'components/Headings'
import NavList from 'components/NavList'
import NavListLink from 'components/NavListLink'
import styled from '@emotion/styled'
import { color } from 'utils/style'

const Text = styled.p`
  font-size: 14px;
  margin: 10px 20px;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${color('mutedBlue')};
`

const Team = ({ divisionSlug, teamSlug }) => {
  const { loading, error, data } = useQuery(TEAM_QUERY, {
    variables: { divisionSlug, teamSlug },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Something went wrong :(</p>

  const {
    team: {
      id: teamId,
      name: teamName,
      record,
      division: { name: divisionName, standings },
      scheduledMatches,
      completedMatches,
    },
  } = data

  return (
    <>
      <SecondaryHeading>{teamName}</SecondaryHeading>
      <Text>
        Currently with a record of {record.wins} wins and {record.losses} losses
        in{' '}
        <StyledLink to={`/division/${divisionSlug}`}>{divisionName}</StyledLink>
      </Text>
      <NavList>
        <NavListLink to="schedules" replace>
          Schedules
        </NavListLink>
        <NavListLink to="scores" replace>
          Scores
        </NavListLink>
        <NavListLink to="standings" replace>
          Standings
        </NavListLink>
      </NavList>
      <Router>
        <Schedules path="schedules" scheduledMatches={scheduledMatches} />
        <Scores
          path="scores"
          completedMatches={completedMatches}
          teamId={teamId}
        />
        <Standings path="standings" standings={standings} />
      </Router>
    </>
  )
}

export default Team
