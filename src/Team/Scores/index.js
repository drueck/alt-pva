import React from 'react'
import { TertiaryHeading } from 'components/Headings'
import Text from 'components/Text'
import CompletedMatch from './CompletedMatch'
import { useParams } from 'react-router-dom'

const getMatchDate = (match) => new Date(`${match.date}T${match.time}`)

const compareMatchDatesDesc = (matchA, matchB) =>
  getMatchDate(matchB) - getMatchDate(matchA)

const Scores = ({ completedMatches, teamId }) => {
  const { divisionSlug } = useParams()
  const sortedMatches = completedMatches.slice(0).sort(compareMatchDatesDesc)

  return (
    <>
      <TertiaryHeading>Scores</TertiaryHeading>
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
        <Text>There are currently no completed matches for this team.</Text>
      )}
    </>
  )
}

export default Scores
