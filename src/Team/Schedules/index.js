import React from 'react'
import { TertiaryHeading } from 'components/Headings'
import Text from 'components/Text'
import ScheduledMatch from './ScheduledMatch'

const Schedules = ({ scheduledMatches, teamId, divisionSlug }) => (
  <>
    <TertiaryHeading>Schedules</TertiaryHeading>
    {scheduledMatches.length ? (
      scheduledMatches.map((match) => (
        <ScheduledMatch
          match={match}
          teamId={teamId}
          divisionSlug={divisionSlug}
        />
      ))
    ) : (
      <Text>There are currently no scheduled matches for this team.</Text>
    )}
  </>
)

export default Schedules
