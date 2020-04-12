import React from 'react'
import styled from '@emotion/styled'
import { color } from 'utils/style'
import { formatDate, formatTime } from 'utils/calendar'
import { Link } from '@reach/router'
import { css } from '@emotion/core'
import {
  formatScoreFromPerspective,
  matchResultFromPerspective,
  matchPointsFromPerspective,
  formatMatchPoints,
} from 'utils/scores'

const breakpoint = '615px'

const Container = styled.div`
  display: grid;
  grid-template-areas:
    'datetime'
    'opponent'
    'set-results'
    'match-results';

  @media (min-width: ${breakpoint}) {
    grid-template-areas:
      'datetime set-results'
      'opponent set-results'
      'match-results set-results';
  }

  background-color: ${color('lighterGrey')};
  padding: 20px;
  margin-bottom: 2px;
`

const DateTime = styled.div`
  grid-area: datetime;
`

const Opponent = styled.div`
  grid-area: opponent;
`

const accentColorNameForMatchResult = (result) =>
  result === 'Win' ? 'darkGreen' : result === 'Loss' ? 'darkPink' : 'mutedBlue'

const resultStyles = ({ result, theme }) =>
  css`
    color: ${color(accentColorNameForMatchResult(result), { theme })};
  `

const MatchResults = styled.div`
  grid-area: match-results;

  @media (min-width: ${breakpoint}) {
    margin-top: 10px;
  }

  ${resultStyles};
`

const SetResultsContainer = styled.div`
  display: flex;
  margin: 10px 0;

  @media (min-width: ${breakpoint}) {
    margin: 0;
    justify-content: flex-end;
    grid-row: span 2;
  }
`

const SetResultContainer = styled.div`
  margin-right: 20px;

  @media (min-width: ${breakpoint}) {
    margin-right: 0;
    margin-left: 20px;
  }
`

const SetResult = ({ setResult, perspective }) => (
  <SetResultContainer>
    <SetLabel>Set {setResult.setNumber}</SetLabel>
    <SetScores>{formatScoreFromPerspective(setResult, perspective)}</SetScores>
  </SetResultContainer>
)

const SetLabel = styled.div`
  font-weight: bold;
`

const SetScores = styled.div``

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${color('mutedBlue')};
`

const CompletedMatch = ({ match, teamId, divisionSlug }) => {
  const { date, time, homeTeam, visitingTeam, setResults } = match
  const perspective = homeTeam.id === teamId ? 'home' : 'visitor'
  const opponent = homeTeam.id === teamId ? visitingTeam : homeTeam
  const result = matchResultFromPerspective(setResults, perspective)

  return (
    <Container>
      <DateTime>
        {formatDate(date)} at {formatTime(time)}
      </DateTime>
      <Opponent>
        vs.{' '}
        <StyledLink
          to={`/division/${divisionSlug}/team/${opponent.slug}/schedules`}
        >
          {opponent.name}
        </StyledLink>
      </Opponent>
      <SetResultsContainer>
        {setResults.map((setResult) => (
          <SetResult
            key={setResult.setNumber}
            setResult={setResult}
            perspective={perspective}
          />
        ))}
      </SetResultsContainer>
      <MatchResults result={result}>
        {result} with {matchPointsFromPerspective(setResults, perspective)}{' '}
        match points
      </MatchResults>
    </Container>
  )
}

export default CompletedMatch