import React from 'react'
import styled from '@emotion/styled'
import { color } from 'utils/style'
import { formatDate, formatTime } from 'utils/calendar'
import { Link } from 'react-router-dom'

const Container = styled.div`
  display: grid;
  grid-template-areas:
    'datetime'
    'opponent'
    'location'
    'checkin';

  @media(min-width: 768px) {
    grid-template-areas:
      'datetime location'
      'opponent opponent'
      'checkin checkin';
    }
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

const CheckIn = styled.div`
  grid-area: checkin;
  padding-top: 1em;
`

const CheckInLink = styled.a`
  text-decoration: none;
  color: ${color('lightGreen')};
`

const LocationLink = styled.a`
  text-decoration: none;
  color: ${color('lightMutedBlue')};
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${color('lightMutedBlue')};
`

const ScheduledMatch = ({ match, teamId, divisionSlug, checkInUrl }) => {
  const { date, time, homeTeam, visitingTeam, locationName, locationUrl } =
    match
  const opponent = homeTeam.id === teamId ? visitingTeam : homeTeam
  const opponentRecord = ` (${opponent.record.wins}-${opponent.record.losses})`
  const vsOrAt = homeTeam.id === teamId ? 'vs.' : 'at'

  return (
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
      <Location>
        <LocationLink
          href={locationUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {locationName}
        </LocationLink>
      </Location>
      {checkInUrl && (
        <CheckIn>
          <CheckInLink
            href={checkInUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Check In
          </CheckInLink>
        </CheckIn>
      )}
    </Container>
  )
}

export default ScheduledMatch
