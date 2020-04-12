import React from 'react'
import { formatDate, formatTime } from 'utils/calendar'
import {
  opponentNameFromPerspective,
  formatScoreFromPerspective,
  matchResultFromPerspective,
  matchPointsFromPerspective,
  formatMatchPoints,
} from 'utils/scores'
import { TertiaryHeading } from 'components/Headings'
import Text from 'components/Text'

const CompletedMatch = ({ match, teamId }) => {
  const { date, time, homeTeam, visitingTeam, setResults } = match
  const perspective = homeTeam.id === teamId ? 'home' : 'visitor'

  return (
    <tr>
      <td>{formatDate(date)}</td>
      <td>{formatTime(time)}</td>
      <td>
        {opponentNameFromPerspective(homeTeam, visitingTeam, perspective)}
      </td>
      <td>{formatScoreFromPerspective(setResults[0], perspective)}</td>
      <td>{formatScoreFromPerspective(setResults[1], perspective)}</td>
      <td>{formatScoreFromPerspective(setResults[2], perspective)}</td>
      <td>{matchResultFromPerspective(setResults, perspective)}</td>
      <td>
        {formatMatchPoints(matchPointsFromPerspective(setResults, perspective))}
      </td>
    </tr>
  )
}

const Scores = ({ completedMatches, teamId }) => (
  <>
    <TertiaryHeading>Scores</TertiaryHeading>
    {completedMatches.length ? (
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Opponent</th>
            <th>Set 1</th>
            <th>Set 2</th>
            <th>Set 3</th>
            <th>Result</th>
            <th>MPs</th>
          </tr>
        </thead>
        <tbody>
          {completedMatches.map((match) => (
            <CompletedMatch key={match.id} match={match} teamId={teamId} />
          ))}
        </tbody>
      </table>
    ) : (
      <Text>There are currently no completed matches for this team.</Text>
    )}
  </>
)

export default Scores
