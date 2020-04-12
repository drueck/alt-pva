import React from 'react'
import styled from '@emotion/styled'
import { color } from 'utils/style'
import { formatDate, formatTime } from 'utils/calendar'
import { Link } from '@reach/router'

const Container = styled.div`
  display: grid;
  grid-template-areas:
    'datetime'
    'opponent'
    'location'
    'ref';

  @media(min-width: 768px) {
    grid-template-areas:
      'datetime location'
      'opponent ref';
    }
  }

  background-color: ${color('lightGrey')};
  padding: 20px;
  margin-bottom: 2px;
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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${color('mutedBlue')};
`

const ScheduledMatch = ({ match, teamId, divisionSlug }) => {
  const { date, time, homeTeam, visitingTeam, location, ref } = match
  const opponent = homeTeam.id === teamId ? visitingTeam : homeTeam

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
      <Location>{location}</Location>
      <Ref>Ref: {ref}</Ref>
    </Container>
  )
}

export default ScheduledMatch
