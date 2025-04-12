import React from 'react'
import styled from '@emotion/styled'
import { color } from 'utils/style'
import { Link } from 'react-router-dom'
import TeamNameWithRank from 'components/TeamNameWithRank'
import RankReason from './RankReason'

const formatPercentage = (percentageString) =>
  Number.parseFloat(percentageString).toFixed(2)

const formatPointDifferential = (value) =>
  (value > 0 ? '+' : '') + Number.parseFloat(value).toFixed(2)

const Container = styled.div`
  background-color: ${color('darkModeBlack')};
  padding: 20px;
  border-bottom: 2px solid ${color('darkModeBackground')};

  &:last-child {
    border-bottom: none;
  }
`

const TeamName = styled.div`
  line-height: 2em;
  margin-bottom: 1em;
`
const WinLossRecord = styled.div``

const AveragePointDifferential = styled.div``

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${color('lightMutedBlue')};
`

const Standing = ({ standing, divisionSlug }) => {
  const {
    team: { name, slug },
    wins,
    losses,
    winningPercentage,
    averagePointDifferential,
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
      <AveragePointDifferential>
        Average Point Differential:{' '}
        {formatPointDifferential(averagePointDifferential)}
      </AveragePointDifferential>
      {rankReason && <RankReason name={name} rankReason={rankReason} />}
    </Container>
  )
}

export default Standing
