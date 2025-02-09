import React from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import { color } from 'utils/style'
import { formatDate, formatTime } from 'utils/calendar'
import MapIcon from 'components/MapIcon'

const Container = styled.div`
  display: grid;
  grid-template-areas:
    'datetime'
    'opponent'
    'location'
    'ref'
    'checkin';

  @media(min-width: 768px) {
    grid-template-areas:
      'datetime location'
      'opponent ref'
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
  margin-top: 1rem;

  @media (min-width: 768px) {
    text-align: right;
    margin-top: unset;
  }
`

const Ref = styled.div`
  grid-area: ref;
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
  color: ${color('lightGreen')};
  display: flex;
  column-gap: 0.5rem;
  justify-content: flex-start;
  align-items: center;

  @media (min-width: 768px) {
    justify-content: flex-end;
  }
`

const LocationName = styled.span`
  display: inline-block;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${color('lightMutedBlue')};
`

const ScheduledMatch = ({ match, teamId, divisionSlug, checkInUrl }) => {
  const { date, time, homeTeam, visitingTeam, locationName, locationUrl, ref } =
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
        <LocationLink href={locationUrl}>
          <MapIcon strokeColor="currentColor" size="1rem" />
          <LocationName>{locationName}</LocationName>
        </LocationLink>
      </Location>
      <Ref>{ref ? ref : 'No Ref'}</Ref>
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
