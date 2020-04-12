import React from 'react'
import { TertiaryHeading } from 'components/Headings'
import Text from 'components/Text'
import Standing from './Standing'

const Standings = ({ standings, divisionSlug }) => (
  <>
    <TertiaryHeading>Standings</TertiaryHeading>
    {standings.length ? (
      standings.map((standing) => (
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

export default Standings
