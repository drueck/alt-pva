import React from 'react'

const Standings = ({ standings }) => (
  <>
    <h3>Standings</h3>
    {standings.length ? (
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Winning %</th>
            <th>Match Points</th>
            <th>Match Points %</th>
          </tr>
        </thead>
        <tbody>
          {standings.map(
            ({
              id,
              team: { name },
              wins,
              losses,
              winningPercentage,
              matchPoints,
              matchPointsPossible,
              matchPointsPercentage,
            }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{wins}</td>
                <td>{losses}</td>
                <td>{winningPercentage}</td>
                <td>
                  {matchPoints} / {matchPointsPossible}
                </td>
                <td>{matchPointsPercentage}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    ) : (
      <p>There are currently no standings for this team's division.</p>
    )}
  </>
)

export default Standings
