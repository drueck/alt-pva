import React from 'react'
import Text from 'components/Text'
import CompletedMatch from './CompletedMatch'
import { useParams } from 'react-router-dom'
import TabBackground from 'components/TabBackground'
import NoDataCard from 'Team/NoDataCard'
import { compareMatchDatesDesc } from 'utils/matches'

const Scores = ({ completedMatches, teamId }) => {
  const { divisionSlug } = useParams()
  const sortedMatches = completedMatches.slice(0).sort(compareMatchDatesDesc)

  return (
    <>
      {sortedMatches.length ? (
        sortedMatches.map((match) => (
          <CompletedMatch
            key={match.id}
            match={match}
            teamId={teamId}
            divisionSlug={divisionSlug}
          />
        ))
      ) : (
        <TabBackground>
          <NoDataCard>
            <Text>There are currently no completed matches for this team.</Text>
          </NoDataCard>
        </TabBackground>
      )}
    </>
  )
}

export default Scores
