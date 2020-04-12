import React from 'react'
import { useQuery } from '@apollo/client'
import TEAM_QUERY from './Team.query'
import { Router, Link } from '@reach/router'
import Schedules from './Schedules'
import Scores from './Scores'
import Standings from './Standings'



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
      <h2>{teamName}</h2>
      <p>
        Currently with a record of {record.wins} wins and {record.losses} losses
        in <Link to={`/division/${divisionSlug}`}>{divisionName}</Link>
      </p>
      <ul>
        <li>
          <Link to="schedules" replace>
            Schedules
          </Link>
        </li>
        <li>
          <Link to="scores" replace>
            Scores
          </Link>
        </li>
        <li>
          <Link to="standings" replace>
            Standings
          </Link>
        </li>
      </ul>
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
