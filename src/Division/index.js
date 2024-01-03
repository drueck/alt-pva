import React from 'react'
import styled from '@emotion/styled'
import { color } from 'utils/style'
import {
  Switch,
  Route,
  useParams,
  useRouteMatch,
  useLocation,
} from 'react-router-dom'
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
  const { url, path } = useRouteMatch()
  const location = useLocation()

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
        <NavListTab to={url} current={location.pathname === url} replace>
          Teams
        </NavListTab>
        <NavListTab
          to={`${url}/standings`}
          current={location.pathname === `${url}/standings`}
          replace
        >
          Standings
        </NavListTab>
      </TabbedNavList>
      <TabBackground>
        <Switch>
          <Route exact path={path}>
            <Teams teams={teams} divisionSlug={divisionSlug} />
          </Route>
          <Route path={`${path}/standings`}>
            <Standings standings={standings} />
          </Route>
        </Switch>
      </TabBackground>
    </>
  )
}

export default Division
