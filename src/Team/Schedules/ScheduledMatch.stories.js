import React from 'react'
import ScheduledMatch from './ScheduledMatch'
import { ThemeProvider } from 'emotion-theming'
import { theme, globalStyles } from 'utils/style'
import { Global } from '@emotion/core'

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
  },
  visitingTeam: {
    id: '67890',
    slug: 'becks-all-star-jazz-hands-review',
    name: "Becky's All Star Jazz Hands Review",
  },
  location: 'Portland Adventist Elementary School',
  ref: 'Marty D.',
}

export const Default = () => (
  <ThemeProvider theme={theme}>
    <Global styles={globalStyles} />
    <ScheduledMatch
      match={match}
      teamId="12345"
      divisionSlug="coed-a-thursday"
    />
  </ThemeProvider>
)

export const WithCourtInParens = () => (
  <ThemeProvider theme={theme}>
    <Global styles={globalStyles} />
    <ScheduledMatch
      match={{ ...match, court: '(2)' }}
      teamId="12345"
      divisionSlug="coed-a-thursday"
    />
  </ThemeProvider>
)

export const WithCourtWithoutParens = () => (
  <ThemeProvider theme={theme}>
    <Global styles={globalStyles} />
    <ScheduledMatch
      match={{ ...match, court: 'Aux Gym' }}
      teamId="12345"
      divisionSlug="coed-a-thursday"
    />
  </ThemeProvider>
)

export const WithCheckIn = () => (
  <ThemeProvider theme={theme}>
    <Global styles={globalStyles} />
    <ScheduledMatch
      match={match}
      teamId="12345"
      divisionSlug="coed-a-thursday"
      checkInUrl="https://register.portlandvolleyball.org/checkin/facility/2/"
    />
  </ThemeProvider>
)
