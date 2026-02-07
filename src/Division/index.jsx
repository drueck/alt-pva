import React from 'react'
import styled from '@emotion/styled'
import { color } from 'utils/style'
import { useParams, useSearchParams } from 'react-router'
import { useQuery } from '@apollo/client'
import DIVISION_QUERY from './Division.query'
import { SecondaryHeading } from 'components/Headings'
import NavList from 'components/NavList'
import NavListTab from 'components/NavListTab'
import TabBackground from 'components/TabBackground'
import Teams from './Teams'
import Standings from '../Standings'
import QueryError from 'components/QueryError'
import NotFound from 'components/NotFound'

const TabbedNavList = styled(NavList)`
  border-bottom: 1px solid ${color('background')};
  margin-top: 1rem;
  margin-bottom: 0;
`

const Division = () => {
  const { divisionSlug } = useParams()
  const [searchParams] = useSearchParams()
  const tab = searchParams.get('tab') || 'teams'

  const { loading, error, data } = useQuery(DIVISION_QUERY, {
    variables: { slug: divisionSlug },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <QueryError error={error} />
  if (!data?.division) return <NotFound />

  const {
    division: { name: divisionName, teams, standings },
  } = data

  return (
    <>
      <SecondaryHeading>{divisionName}</SecondaryHeading>
      <TabbedNavList>
        <NavListTab to="." replace active={tab === 'teams'}>
          Teams
        </NavListTab>
        <NavListTab to="?tab=standings" replace active={tab === 'standings'}>
          Standings
        </NavListTab>
      </TabbedNavList>
      <TabBackground>
        {tab === 'standings' ? (
          <Standings standings={standings} />
        ) : (
          <Teams teams={teams} divisionSlug={divisionSlug} />
        )}
      </TabBackground>
    </>
  )
}

export default Division
