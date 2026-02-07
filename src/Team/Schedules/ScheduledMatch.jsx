import React from 'react'
import { Link } from 'react-router'
import styled from '@emotion/styled'
import { color } from 'utils/style'
import { formatDate, formatTime } from 'utils/calendar'
import MapIcon from 'components/MapIcon'
import ContextMenu from './ContextMenu'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-areas:
    'datetime header'
    'opponent header'
    'ref header'
    'location header'
    'checkin header';

  @media (min-width: 768px) {
    align-items: start;
    column-gap: 1rem;
    grid-template-columns: 1fr auto auto;
    grid-template-areas:
      'datetime ref header'
      'opponent location header'
      'checkin checkin header';
  }

  background-color: ${color('surface')};
  padding: 20px;
  border-bottom: 2px solid ${color('background')};

  &:last-child {
    border-bottom: none;
  }
`

const Header = styled.div`
  grid-area: header;
`

const DateTime = styled.div`
  grid-area: datetime;
  text-align: left;
`

const Location = styled.div`
  grid-area: location;
  text-align: left;

  @media (min-width: 768px) {
    padding-top: unset;
    text-align: right;
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
  color: ${color('success')};
`

const LocationLink = styled.a`
  text-decoration: none;
  color: ${color('success')};
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
  color: ${color('accent')};
`

const ScheduledMatch = ({ match, teamId, divisionSlug, checkInUrl }) => {
  const { date, time, homeTeam, visitingTeam, locationName, locationUrl, ref } =
    match
  const opponent = homeTeam.id === teamId ? visitingTeam : homeTeam
  const opponentRecord = ` (${opponent.record.wins}-${opponent.record.losses})`
  const vsOrAt = homeTeam.id === teamId ? 'vs.' : 'at'

  return (
    <Container>
      <Header>
        <ContextMenu teamId={teamId} match={match} />
      </Header>
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
