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
import Text from 'components/Text'

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${color('mutedBlue')};
`

const StyledNavList = styled(NavList)`
  margin-bottom: 32px;
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

  const winsText = record.wins === 1 ? 'win' : 'wins'
  const lossesText = record.losses === 1 ? 'loss' : 'losses'

  return (
    <>
      <SecondaryHeading>{teamName}</SecondaryHeading>
      <Text>
        Currently with a record of {record.wins} {winsText} and {record.losses}{' '}
        {lossesText} in{' '}
        <StyledLink to={`/division/${divisionSlug}`}>{divisionName}</StyledLink>
      </Text>
      <StyledNavList>
        <NavListLink to="schedules" replace>
          Schedules
        </NavListLink>
        <NavListLink to="scores" replace>
          Scores
        </NavListLink>
        <NavListLink to="standings" replace>
          Standings
        </NavListLink>
      </StyledNavList>
      <Router>
        <Schedules
          path="schedules"
          scheduledMatches={scheduledMatches}
          teamId={teamId}
          divisionSlug={divisionSlug}
        />
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
