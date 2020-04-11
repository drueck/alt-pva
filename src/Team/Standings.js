import React from 'react'
import styled from '@emotion/styled'

const formatPercentage = (percentageString) =>
  Number.parseFloat(percentageString).toFixed(2)

const formatMatchPoints = (matchPointsString) =>
  Number.parseFloat(matchPointsString).toFixed(1)

const Standing = ({ standing }) => {
  const {
    team: { name },
    wins,
    losses,
    winningPercentage,
    matchPoints,
    matchPointsPossible,
    matchPointsPercentage,
  } = standing

  return (
    <StyledStandingRow>
      <td>{name}</td>
      <td>{wins}</td>
      <td>{losses}</td>
      <td>{formatPercentage(winningPercentage)}</td>
      <td>
        {formatMatchPoints(matchPoints)} /{' '}
        {formatMatchPoints(matchPointsPossible)}
      </td>
      <td>{formatPercentage(matchPointsPercentage)}</td>
    </StyledStandingRow>
  )
}

const StyledStandingRow = styled.tr`
  th:nth-of-type(n + 2),
  td:nth-of-type(n + 2) {
    text-align: right;
  }
`

const Standings = ({ standings }) => (
  <>
    <h3>Standings</h3>
    {standings.length ? (
      <table>
        <thead>
          <StyledStandingRow>
            <th>Team</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Winning %</th>
            <th>Match Points</th>
            <th>Match Points %</th>
          </StyledStandingRow>
        </thead>
        <tbody>
          {standings.map((standing) => (
            <Standing key={standing.id} standing={standing} />
          ))}
        </tbody>
      </table>
    ) : (
      <p>There are currently no standings for this team's division.</p>
    )}
  </>
)

export default Standings
