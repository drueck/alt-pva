import React from 'react'
import styled from '@emotion/styled'
import { TertiaryHeading } from 'components/Headings'
import Text from 'components/Text'

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
    <TertiaryHeading>Standings</TertiaryHeading>
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
      <Text>There are currently no standings for this team's division.</Text>
    )}
  </>
)

export default Standings
