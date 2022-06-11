import React from 'react'
import styled from '@emotion/styled'
import { color } from 'utils/style'
import { formatDate, formatTime } from 'utils/calendar'
import { Link } from 'react-router-dom'
import { css } from '@emotion/core'
import {
  formatScoreFromPerspective,
  setResultFromPerspective,
  matchResultFromPerspective,
  matchPointsFromPerspective,
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

  background-color: ${color('darkModeBlack')};
  padding: 20px;
  margin-bottom: 2px;
`

const DateTime = styled.div`
  grid-area: datetime;
`

const Opponent = styled.div`
  grid-area: opponent;
`

const MatchResults = styled.div`
  grid-area: match-results;

  @media (min-width: ${breakpoint}) {
    margin-top: 10px;
  }
`

const SetResultsContainer = styled.div`
  display: flex;
  margin: 10px 0 15px;

  @media (min-width: ${breakpoint}) {
    margin: 0;
    justify-content: flex-end;
    grid-row: span 2;
  }
`

const SetResultContainer = styled.div`
  margin-right: 20px;
  text-align: center;

  @media (min-width: ${breakpoint}) {
    margin-right: 0;
    margin-left: 20px;
  }
`

const accentColorNameForResult = (result) =>
  result === 'Win'
    ? 'lightGreen'
    : result === 'Loss'
    ? 'lightPink'
    : 'lightMutedBlue'

const resultStyles = ({ result, theme }) =>
  css`
    color: ${color(accentColorNameForResult(result), { theme })};
  `

const Result = styled.span`
  display: inline-block;
  min-width: 50px;
  padding: 5px;
  text-align: center;
  border: 1px solid ${color('darkModeText')};

  ${resultStyles};
`

const SetResult = ({ setResult, perspective, result }) => (
  <SetResultContainer>
    <SetLabel>Set {setResult.setNumber}</SetLabel>
    <SetScores result={result}>
      {formatScoreFromPerspective(setResult, perspective)}
    </SetScores>
  </SetResultContainer>
)

const SetLabel = styled.div``

const SetScores = styled.div`
  ${resultStyles};
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${color('lightMutedBlue')};
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
        <StyledLink to={`/division/${divisionSlug}/team/${opponent.slug}`}>
          {opponent.name}
        </StyledLink>
      </Opponent>
      <SetResultsContainer>
        {setResults.map((setResult) => (
          <SetResult
            key={setResult.setNumber}
            result={setResultFromPerspective(setResult, perspective)}
            setResult={setResult}
            perspective={perspective}
          />
        ))}
      </SetResultsContainer>
      <MatchResults>
        <Result result={result}>{result}</Result> with{' '}
        {matchPointsFromPerspective(setResults, perspective)} match points
      </MatchResults>
    </Container>
  )
}

export default CompletedMatch
