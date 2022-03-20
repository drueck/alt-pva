import React from 'react'
import styled from '@emotion/styled'

const obviousReasons = [
  'win percentage',
  'percentage of possible match points',
  'team name',
]

const Container = styled.div``

const TieBreaker = styled.p`
  font-style: italic;
`

const ValueList = styled.dl`
  margin-bottom: 0;
`
const TeamName = styled.dt`
  display: inline;
  &::after {
    content: ': ';
  }
`
const Value = styled.dd`
  display: inline;
  margin: 0;
`

const RankReason = ({ name, rankReason }) => {
  if (!rankReason || obviousReasons.includes(rankReason.statistic)) {
    return null
  }

  const {
    statistic,
    teamValue,
    lowerTeamValue,
    lowerTeam: { name: lowerTeamName },
  } = rankReason

  return (
    <Container>
      <TieBreaker>tie breaker: {statistic}</TieBreaker>
      <ValueList>
        <div>
          <TeamName>{name}</TeamName>
          <Value>{teamValue}</Value>
        </div>
        <div>
          <TeamName>{lowerTeamName}</TeamName>
          <Value>{lowerTeamValue}</Value>
        </div>
      </ValueList>
    </Container>
  )
}

export default RankReason
