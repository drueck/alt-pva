import React from 'react'
import ScheduledMatch from './ScheduledMatch'
import Story from 'components/Story'

export default {
  component: ScheduledMatch,
  title: 'ScheduledMatch',
}

const match = {
  date: '2020-04-11',
  time: '22:00:00',
  homeTeam: {
    id: '12345',
    slug: 'court-jesters',
    name: 'Court Jesters',
    record: {
      id: '98764',
      wins: 2,
      losses: 0,
    },
  },
  visitingTeam: {
    id: '67890',
    slug: 'becks-all-star-jazz-hands-review',
    name: "Becky's All Star Jazz Hands Review",
    record: {
      id: '98765',
      wins: 1,
      losses: 1,
    },
  },
  location: 'Portland Adventist Elementary School',
  ref: 'Marty D.',
}

export const Home = () => (
  <Story>
    <ScheduledMatch
      match={match}
      teamId="12345"
      divisionSlug="coed-a-thursday"
    />
  </Story>
)

export const Visitor = () => (
  <Story>
    <ScheduledMatch
      match={match}
      teamId="67890"
      divisionSlug="coed-a-thursday"
    />
  </Story>
)

export const WithCourtInParens = () => (
  <Story>
    <ScheduledMatch
      match={{ ...match, court: '(2)' }}
      teamId="12345"
      divisionSlug="coed-a-thursday"
    />
  </Story>
)

export const WithCourtWithoutParens = () => (
  <Story>
    <ScheduledMatch
      match={{ ...match, court: 'Aux Gym' }}
      teamId="12345"
      divisionSlug="coed-a-thursday"
    />
  </Story>
)

export const WithCheckIn = () => (
  <Story>
    <ScheduledMatch
      match={match}
      teamId="12345"
      divisionSlug="coed-a-thursday"
      checkInUrl="https://register.portlandvolleyball.org/checkin/facility/2/"
    />
  </Story>
)
