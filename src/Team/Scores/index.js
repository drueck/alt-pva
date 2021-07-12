import React from 'react'
import { TertiaryHeading } from 'components/Headings'
import Text from 'components/Text'
import CompletedMatch from './CompletedMatch'
import { useParams } from 'react-router-dom'

const Scores = ({ completedMatches, teamId }) => {
  const { divisionSlug } = useParams()

  return (
    <>
      <TertiaryHeading>Scores</TertiaryHeading>
      {completedMatches.length ? (
        completedMatches.map((match) => (
          <CompletedMatch
            key={match.id}
            match={match}
            teamId={teamId}
            divisionSlug={divisionSlug}
          />
        ))
      ) : (
        <Text>There are currently no completed matches for this team.</Text>
      )}
    </>
  )
}

export default Scores
