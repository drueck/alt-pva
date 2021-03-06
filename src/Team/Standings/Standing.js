import React from 'react'
import styled from '@emotion/styled'
import { color } from 'utils/style'
import { Link } from '@reach/router'

const formatPercentage = (percentageString) =>
  Number.parseFloat(percentageString).toFixed(2)

const formatMatchPoints = (matchPointsString) =>
  Number.parseFloat(matchPointsString).toFixed(1)

const Container = styled.div`
  background-color: ${color('lighterGrey')};
  padding: 20px;
  margin-bottom: 2px;
`

const TeamName = styled.div``
const WinLossRecord = styled.div``
const MatchPointsRecord = styled.div``

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${color('mutedBlue')};
`

const Standing = ({ standing, divisionSlug }) => {
  const {
    team: { name, slug },
    wins,
    losses,
    winningPercentage,
    matchPoints,
    matchPointsPossible,
    matchPointsPercentage,
  } = standing
  return (
    <Container>
      <TeamName>
        <StyledLink to={`/division/${divisionSlug}/team/${slug}/schedules`}>
          {name}
        </StyledLink>
      </TeamName>
      <WinLossRecord>
        Wins: {wins}, Losses: {losses} ({formatPercentage(winningPercentage)}%)
      </WinLossRecord>
      <MatchPointsRecord>
        Match Points: {formatMatchPoints(matchPoints)}/
        {formatMatchPoints(matchPointsPossible)} (
        {formatPercentage(matchPointsPercentage)}%)
      </MatchPointsRecord>
    </Container>
  )
}

export default Standing
