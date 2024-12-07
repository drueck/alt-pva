import React from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import { color } from 'utils/style'
import { formatTime } from 'utils/calendar'

const Container = styled.div`
  display: grid;
  grid-template-areas:
    'timeandplace'
    'teams';
  column-gap: 1rem;
  padding-bottom: 1rem;

  @media (min-width: 768px) {
    grid-template-areas: 'teams timeandplace';
    grid-template-columns: 1fr auto;
    padding-bottom: 0;
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${color('lightMutedBlue')};
`

const Time = styled.div`
  grid-area: timeandplace;
`

const Teams = styled.div`
  grid-area: teams;
`

const OtherMatch = ({ match }) => {
  const { time, homeTeam, visitingTeam, location } = match

  return (
    <Container>
      <Time>
        {formatTime(time)} @ {location}
      </Time>
      <Teams>
        <StyledLink to="#">{homeTeam.name}</StyledLink> vs{' '}
        <StyledLink to="#">{visitingTeam.name}</StyledLink>
      </Teams>
    </Container>
  )
}

export default OtherMatch
