import React from 'react'
import Standing from './Standing'
import Story from 'components/Story'

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
  rank: 7,
  rankReason: null,
}

export const Default = () => (
  <Story>
    <Standing standing={standing} divisionSlug="coed-a-wednesday" />
  </Story>
)

export const DoubleDigitRank = () => (
  <Story>
    <Standing
      standing={{ ...standing, rank: 15 }}
      divisionSlug="coed-a-wednesday"
    />
  </Story>
)

export const WithTieBreakInfo = () => (
  <Story>
    <Standing
      standing={{
        ...standing,
        rankReason: {
          statistic: 'head to head record (points differential)',
          lowerTeam: {
            name: 'East of Eden',
          },
          teamValue: 1,
          lowerTeamValue: -1,
        },
      }}
      divisionSlug="coed-a-wednesday"
    />
  </Story>
)

export const DoubleDigitRank = () => (
  <ThemeProvider theme={theme}>
    <Global styles={globalStyles} />
    <Standing
      standing={{ ...standing, rank: 15 }}
      divisionSlug="coed-a-wednesday"
    />
  </ThemeProvider>
)
