import React from 'react'
import styled from '@emotion/styled'
import { color } from 'utils/style'
import { Link } from 'react-router-dom'
import TeamNameWithRank from 'components/TeamNameWithRank'
import RankReason from './RankReason'

const formatPercentage = (percentageString) =>
  Number.parseFloat(percentageString).toFixed(2)

const formatMatchPoints = (matchPointsString) =>
  Number.parseFloat(matchPointsString).toFixed(1)

const Container = styled.div`
  background-color: ${color('lighterGrey')};
  padding: 20px;
  margin-bottom: 2px;
`

const TeamName = styled.div`
  line-height: 2em;
  margin-bottom: 1em;
`
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
    rank,
    rankReason,
  } = standing
  return (
    <Container>
      <TeamName>
        <StyledLink to={`/division/${divisionSlug}/team/${slug}`}>
          <TeamNameWithRank name={name} rank={rank} />
        </StyledLink>
      </TeamName>
      <WinLossRecord>
        Wins: {wins}, Losses: {losses} ({formatPercentage(winningPercentage)}
        %)
      </WinLossRecord>
      <MatchPointsRecord>
        Match Points: {formatMatchPoints(matchPoints)}/
        {formatMatchPoints(matchPointsPossible)} (
        {formatPercentage(matchPointsPercentage)}%)
      </MatchPointsRecord>
      {rankReason && <RankReason name={name} rankReason={rankReason} />}
    </Container>
  )
}

export default Standing
