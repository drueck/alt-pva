import React from 'react'
import { formatDate, formatTime } from '../utils'

const formatScore = ({ homeTeamScore, visitingTeamScore }) =>
  homeTeamScore === undefined ? '' : `${homeTeamScore} - ${visitingTeamScore}`

const Scores = ({ completedMatches }) => (
  <>
    <h3>Scores</h3>
    {completedMatches.length ? (
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Home</th>
            <th>Visitor</th>
            <th>Set 1</th>
            <th>Set 2</th>
            <th>Set 3</th>
          </tr>
        </thead>
        <tbody>
          {completedMatches.map(
            ({
              id,
              date,
              time,
              homeTeam: { name: home },
              visitingTeam: { name: visitor },
              setResults,
            }) => (
              <tr key={id}>
                <td>{formatDate(date)}</td>
                <td>{formatTime(time)}</td>
                <td>{home}</td>
                <td>{visitor}</td>
                <td>{formatScore(setResults[0])}</td>
                <td>{formatScore(setResults[1])}</td>
                <td>{formatScore(setResults[2])}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    ) : (
      <p>There are currently no completed matches for this team.</p>
    )}
  </>
)

export default Scores
