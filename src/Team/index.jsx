import React from 'react'
import { useQuery } from '@apollo/client'
import TEAM_QUERY from './Team.query'
import {
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  useLocation,
} from 'react-router-dom'
import Schedules from './Schedules'
import Scores from './Scores'
import Standings from '../Standings'
import { SecondaryHeading } from 'components/Headings'
import NavList from 'components/NavList'
import NavListTab from 'components/NavListTab'
import styled from '@emotion/styled'
import { color } from 'utils/style'
import Text from 'components/Text'
import QueryError from 'components/QueryError'
import ordinal from 'ordinal'
import NotFound from 'components/NotFound'
import TabBackground from 'components/TabBackground'
import FavoriteButton from 'components/FavoriteButton'

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${color('lightMutedBlue')};
`

const TabNavList = styled(NavList)`
  border-bottom: 1px solid ${color('darkModeBackground')};
  margin-top: 1.5rem;
  margin-bottom: 0;
`

const HeadingContainer = styled.div`
  padding: 0 1em;
  display: flex;
  align-items: center;
`

const TeamNameHeading = styled(SecondaryHeading)`
  display: inline-block;
  padding-left: 1rem;
`

const Team = () => {
  const { divisionSlug, teamSlug } = useParams()
  const { url, path } = useRouteMatch()
  const location = useLocation()

  const { loading, error, data } = useQuery(TEAM_QUERY, {
    variables: { divisionSlug, teamSlug },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <QueryError error={error} />
  if (!data?.team) return <NotFound />

  const {
    team: {
      id: teamId,
      name: teamName,
      rank,
      record,
      division: { name: divisionName, standings },
      scheduledMatches,
      completedMatches,
    },
  } = data

  const favoriteData = { teamName, divisionName, teamSlug, divisionSlug }

  const winsText = record.wins === 1 ? 'win' : 'wins'
  const lossesText = record.losses === 1 ? 'loss' : 'losses'

  return (
    <>
      <HeadingContainer>
        <FavoriteButton favoriteData={favoriteData} />
        <TeamNameHeading>{teamName}</TeamNameHeading>
      </HeadingContainer>
      <Text>
        Currently in {ordinal(rank)} place in{' '}
        <StyledLink to={`/division/${divisionSlug}`}>{divisionName}</StyledLink>{' '}
        with a record of {record.wins} {winsText} and {record.losses}{' '}
        {lossesText}.
      </Text>
      <TabNavList>
        <NavListTab to={`${url}`} current={location.pathname === url} replace>
          Schedules
        </NavListTab>
        <NavListTab
          to={`${url}/scores`}
          current={location.pathname === `${url}/scores`}
          replace
        >
          Scores
        </NavListTab>
        <NavListTab
          to={`${url}/standings`}
          current={location.pathname === `${url}/standings`}
          replace
        >
          Standings
        </NavListTab>
      </TabNavList>
      <TabBackground>
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
      </TabBackground>
    </>
  )
}

export default Team
