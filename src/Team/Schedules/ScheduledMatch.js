import React, { useState } from 'react'
import styled from '@emotion/styled'
import { color } from 'utils/style'
import { formatDate, formatTime } from 'utils/calendar'
import { Link } from 'react-router-dom'
import MoreButton from 'components/MoreButton'
import ExtraDetails from './ExtraDetails'

const Container = styled.div`
  display: grid;
  grid-template-areas:
    'datetime more'
    'opponent more'
    'location more'
    'ref more'
    'extra extra';

  grid-template-columns: 1fr auto;

  @media (min-width: 768px) {
    grid-template-areas:
      'datetime location more'
      'opponent ref more'
      'extra extra extra';

    grid-template-columns: 1fr 1fr auto;
    column-gap: 1rem;
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
  text-align: left;
`

const Location = styled.div`
  grid-area: location;
  text-align: left;

  @media (min-width: 768px) {
    text-align: right;
  }
`

const Opponent = styled.div`
  grid-area: opponent;
  text-align: left;
`

const Ref = styled.div`
  grid-area: ref;
  text-align: left;

  @media (min-width: 768px) {
    text-align: right;
  }
`

const More = styled.div`
  grid-area: more;
`

const Extra = styled.div`
  grid-area: extra;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${color('lightMutedBlue')};
`

const locationAndCourt = ({ location, court }) => {
  if (!court) {
    return location
  }

  return court.startsWith('(')
    ? `${location} ${court}`
    : `${location} (${court})`
}

const ScheduledMatch = ({ match, teamId, divisionSlug, checkInUrl }) => {
  const { date, time, homeTeam, visitingTeam, ref } = match
  const opponent = homeTeam.id === teamId ? visitingTeam : homeTeam
  const opponentRecord = ` (${opponent.record.wins}-${opponent.record.losses})`
  const vsOrAt = homeTeam.id === teamId ? 'vs.' : 'at'

  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <Container>
        <DateTime>
          {formatDate(date)} at {formatTime(time)}
        </DateTime>
        <Opponent>
          {vsOrAt}{' '}
          <StyledLink to={`/division/${divisionSlug}/team/${opponent.slug}`}>
            {opponent.name}
          </StyledLink>
          {opponentRecord}
        </Opponent>
        <Location>{locationAndCourt(match)}</Location>
        <Ref>Ref: {ref || 'None'}</Ref>
        <More>
          <MoreButton
            expanded={expanded}
            toggleExpanded={() => setExpanded(!expanded)}
          />
        </More>
        <Extra>{expanded ? <ExtraDetails match={match} /> : null}</Extra>
      </Container>
    </>
  )
}

export default ScheduledMatch
