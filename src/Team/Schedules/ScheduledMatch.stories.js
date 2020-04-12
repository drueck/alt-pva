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
    name: 'Court Jesters',
  },
  visitingTeam: {
    name: "Becky's All Star Jazz Hands Review",
  },
  location: 'Portland Adventist Elementary School',
  ref: 'Marty D.',
}

export const Default = () => (
  <ThemeProvider theme={theme}>
    <Global styles={globalStyles} />
    <ScheduledMatch match={match} />
  </ThemeProvider>
)
