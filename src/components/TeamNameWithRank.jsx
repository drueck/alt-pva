import React from 'react'
import styled from '@emotion/styled'
import RankOrdinal from './RankOrdinal'

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const TeamName = styled.span`
  display: inline-block;
  line-height: normal;
`

const TeamNameWithRank = ({ name, rank }) => (
  <Container>
    <RankOrdinal rank={rank} />
    <TeamName>{name}</TeamName>
  </Container>
)

export default TeamNameWithRank
