import React from 'react'
import Text from 'components/Text'
import Standing from './Standing'
import TabBackground from 'components/TabBackground'
import { useParams } from 'react-router-dom'
import NoDataCard from '../Team/NoDataCard'

const Standings = ({ standings }) => {
  const { divisionSlug } = useParams()

  const sortedStandings = standings.slice(0).sort((a, b) => {
    const rankResult = a.rank - b.rank
    if (rankResult !== 0) {
      return rankResult
    }
    if (a.team.name < b.team.name) {
      return -1
    }
    if (a.team.name > b.team.name) {
      return 1
    }
    return 0
  })

  return (
    <>
      {sortedStandings.length ? (
        sortedStandings.map((standing) => (
          <Standing
            key={standing.id}
            standing={standing}
            divisionSlug={divisionSlug}
          />
        ))
      ) : (
        <TabBackground>
          <NoDataCard>
            <Text>There are currently no standings for this division.</Text>
          </NoDataCard>
        </TabBackground>
      )}
    </>
  )
}

export default Standings
