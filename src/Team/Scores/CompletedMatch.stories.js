import React from 'react'
import CompletedMatch from './CompletedMatch'
import { ThemeProvider } from 'emotion-theming'
import { theme, globalStyles } from 'utils/style'
import { Global } from '@emotion/core'

export default {
  component: CompletedMatch,
  title: 'CompletedMatch',
}

const wonMatch = {
  date: '2020-04-11',
  time: '22:00:00',
  homeTeam: {
    id: '12345',
    slug: 'court-jesters',
    name: 'Court Jesters',
  },
  visitingTeam: {
    id: '56789',
    slug: 'becks-all-star-jazz-hands-review',
    name: "Becky's All Star Jazz Hands Review",
  },
  setResults: [
    { setNumber: 1, homeTeamScore: 25, visitingTeamScore: 20 },
    { setNumber: 2, homeTeamScore: 20, visitingTeamScore: 25 },
    { setNumber: 3, homeTeamScore: 15, visitingTeamScore: 12 },
  ],
}

const lostMatch = {
  ...wonMatch,
  setResults: [
    { setNumber: 1, homeTeamScore: 10, visitingTeamScore: 25 },
    { setNumber: 2, homeTeamScore: 20, visitingTeamScore: 25 },
    { setNumber: 3, homeTeamScore: 15, visitingTeamScore: 12 },
  ],
}

const tiedMatch = {
  ...wonMatch,
  setResults: [
    { setNumber: 1, homeTeamScore: 20, visitingTeamScore: 25 },
    { setNumber: 2, homeTeamScore: 25, visitingTeamScore: 20 },
  ],
}

export const Win = () => (
  <ThemeProvider theme={theme}>
    <Global styles={globalStyles} />
    <CompletedMatch
      match={wonMatch}
      teamId="12345"
      divisionSlug="coed-a-thursday"
    />
  </ThemeProvider>
)

export const Loss = () => (
  <ThemeProvider theme={theme}>
    <Global styles={globalStyles} />
    <CompletedMatch
      match={lostMatch}
      teamId="12345"
      divisionSlug="coed-a-thursday"
    />
  </ThemeProvider>
)

export const Tie = () => (
  <ThemeProvider theme={theme}>
    <Global styles={globalStyles} />
    <CompletedMatch
      match={tiedMatch}
      teamId="12345"
      divisionSlug="coed-a-thursday"
    />
  </ThemeProvider>
)
