import React from 'react'
import Standing from './Standing'
import { ThemeProvider } from 'emotion-theming'
import { theme, globalStyles } from 'utils/style'
import { Global } from '@emotion/core'

export default {
  component: Standing,
  title: 'Standing',
}

const standing = {
  team: {
    name: "Becky's All-Star Jazz Hands Review",
    slug: 'beckys-all-star-jazz-hands-review',
  },
  wins: 1,
  losses: 8,
  winningPercentage: 11.11,
  matchPoints: 4.5,
  matchPointsPossible: 40.5,
  matchPointsPercentage: 11.11,
}

export const Default = () => (
  <ThemeProvider theme={theme}>
    <Global styles={globalStyles} />
    <Standing standing={standing} divisionSlug="coed-a-wednesday" />
  </ThemeProvider>
)
