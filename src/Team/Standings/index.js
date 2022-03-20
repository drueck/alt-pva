import React from 'react'
import { TertiaryHeading } from 'components/Headings'
import Text from 'components/Text'
import Standing from './Standing'
import { useParams } from 'react-router-dom'

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
      <TertiaryHeading>Standings</TertiaryHeading>
      {sortedStandings.length ? (
        sortedStandings.map((standing) => (
          <Standing
            key={standing.id}
            standing={standing}
            divisionSlug={divisionSlug}
          />
        ))
      ) : (
        <Text>There are currently no standings for this team's division.</Text>
      )}
    </>
  )
}

export default Standings
