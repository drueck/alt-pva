import React from 'react'
import styled from '@emotion/styled'
import { color } from 'utils/style'
import { Routes, Route, useParams } from 'react-router-dom'
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
  border-bottom: 1px solid ${color('darkModeBackground')};
  margin-top: 1rem;
  margin-bottom: 0;
`

const Division = () => {
  const { divisionSlug } = useParams()

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
        <NavListTab to="." replace>
          Teams
        </NavListTab>
        <NavListTab to="standings" replace>
          Standings
        </NavListTab>
      </TabbedNavList>
      <TabBackground>
        <Routes>
          <Route
            index
            element={<Teams teams={teams} divisionSlug={divisionSlug} />}
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

export default Division
