import React from 'react'
import { TertiaryHeading } from 'components/Headings'
import Text from 'components/Text'
import CompletedMatch from './CompletedMatch'

const Scores = ({ completedMatches, teamId, divisionSlug }) => (
  <>
    <TertiaryHeading>Scores</TertiaryHeading>
    {completedMatches.length ? (
      completedMatches.map((match) => (
        <CompletedMatch
          key={match.id}
          match={match}
          teamId={teamId}
          divisionSlug="divisionSlug"
        />
      ))
    ) : (
      <Text>There are currently no completed matches for this team.</Text>
    )}
  </>
)

export default Scores
