import React from 'react'
import styled from '@emotion/styled'
import { color } from 'utils/style'
import { formatDate, formatTime } from 'utils/calendar'
import { Link } from 'react-router-dom'
import { css } from '@emotion/react'
import {
  formatScoreFromPerspective,
  setResultFromPerspective,
  matchResultFromPerspective,
  pointDifferentialFromPerspective,
} from 'utils/scores'

const formatPointDifferential = (value) => (value > 0 ? '+' : '') + value

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
  border-bottom: 2px solid ${color('darkModeBackground')};

  &:last-child {
    border-bottom: none;
  }
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
  grid-area: set-results;
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

const resultStyles = ({ result, theme }) => css`
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

const ForfeitResult = styled.div`
  ${resultStyles}
`

const SetLabel = styled.div``

const SetScores = styled.div`
  ${resultStyles};
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${color('lightMutedBlue')};
`

const matchResultFromForfeit = (forfeitedTeam, opponent) => {
  if (!forfeitedTeam) return null

  return forfeitedTeam.id === opponent.id ? 'Win' : 'Loss'
}

const CompletedMatch = ({ match, teamId, divisionSlug }) => {
  const { date, time, homeTeam, visitingTeam, forfeitedTeam, setResults } =
    match
  const perspective = homeTeam.id === teamId ? 'home' : 'visitor'
  const opponent = homeTeam.id === teamId ? visitingTeam : homeTeam
  const result =
    matchResultFromForfeit(forfeitedTeam, opponent) ||
    matchResultFromPerspective(setResults, perspective)

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
        {setResults.length ? (
          setResults.map((setResult) => (
            <SetResult
              key={setResult.setNumber}
              result={setResultFromPerspective(setResult, perspective)}
              setResult={setResult}
              perspective={perspective}
            />
          ))
        ) : (
          <SetResultsContainer>
            <ForfeitResult result={result}>FORFEIT</ForfeitResult>
          </SetResultsContainer>
        )}
      </SetResultsContainer>
      <MatchResults>
        <Result result={result}>{result}</Result> point differential:{' '}
        {formatPointDifferential(
          pointDifferentialFromPerspective(setResults, perspective),
        )}
      </MatchResults>
    </Container>
  )
}

export default CompletedMatch
