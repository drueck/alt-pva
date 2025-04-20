import React from 'react'
import { useQuery } from '@apollo/client'
import TEAM_QUERY from './Team.query'
import { Routes, Route, Link, useParams, useMatch } from 'react-router-dom'
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

  const onSchedulesTab = Boolean(useMatch({ path: '.', end: true }))
  const onScoresTab = Boolean(useMatch({ path: 'scores', end: true }))
  const onStandingsTab = Boolean(useMatch({ path: 'standings', end: true }))

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
        <NavListTab to="." replace>
          Schedules
        </NavListTab>
        <NavListTab to="scores" replace>
          Scores
        </NavListTab>
        <NavListTab to="standings" replace>
          Standings
        </NavListTab>
      </TabNavList>
      <TabBackground>
        <Routes>
          <Route
            index
            element={
              <Schedules
                scheduledMatches={scheduledMatches}
                teamId={teamId}
                divisionSlug={divisionSlug}
              />
            }
          />
          <Route
            path="scores"
            element={
              <Scores completedMatches={completedMatches} teamId={teamId} />
            }
          />
          <Route
            path="standings"
            element={<Standings standings={standings} />}
          />
        </Routes>
      </TabBackground>
    </>
  )
}

export default Team
