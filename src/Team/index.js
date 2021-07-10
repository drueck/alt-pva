import React from 'react'
import { useQuery } from '@apollo/client'
import TEAM_QUERY from './Team.query'
import { Switch, Route, Link, useParams, useRouteMatch } from 'react-router-dom'
import Schedules from './Schedules'
import Scores from './Scores'
import Standings from './Standings'
import { SecondaryHeading } from 'components/Headings'
import NavList from 'components/NavList'
import NavListLink from 'components/NavListLink'
import styled from '@emotion/styled'
import { color } from 'utils/style'
import Text from 'components/Text'
import QueryError from 'components/QueryError'

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${color('mutedBlue')};
`

const StyledNavList = styled(NavList)`
  margin-bottom: 32px;
`

const Team = () => {
  const { divisionSlug, teamSlug } = useParams()
  const { url, path } = useRouteMatch()

  const { loading, error, data } = useQuery(TEAM_QUERY, {
    variables: { divisionSlug, teamSlug },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <QueryError error={error} />

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
        <NavListLink to={`${url}`} replace>
          Schedules
        </NavListLink>
        <NavListLink to={`${url}/scores`} replace>
          Scores
        </NavListLink>
        <NavListLink to={`${url}/standings`}>Standings</NavListLink>
      </StyledNavList>
      <Switch>
        <Route exact path={`${path}`}>
          <Schedules
            scheduledMatches={scheduledMatches}
            teamId={teamId}
            divisionSlug={divisionSlug}
          />
        </Route>
        <Route path={`${path}/scores`}>
          <Scores completedMatches={completedMatches} teamId={teamId} />
        </Route>
        <Route path={`${path}/standings`}>
          <Standings standings={standings} />
        </Route>
      </Switch>
    </>
  )
}

export default Team
