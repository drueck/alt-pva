import React from 'react'
import { TertiaryHeading } from 'components/Headings'
import Text from 'components/Text'
import ScheduledMatch from './ScheduledMatch'
import { isToday } from 'utils/calendar'

const facilityIds = {
  'Delta Park': 2,
  'Brentwood Park': 3,
  'Flavel Park': 4,
  'Parklane Park': 5,
}

const checkInUrl = ({ date, location }) => {
  if (isToday(date) && facilityIds[location]) {
    return `https://register.portlandvolleyball.org/checkin/facility/${facilityIds[location]}/`
  }
  return undefined
}

const Schedules = ({ scheduledMatches, teamId, divisionSlug }) => (
  <>
    <TertiaryHeading>Schedules</TertiaryHeading>
    {scheduledMatches.length ? (
      scheduledMatches.map((match, i) => (
        <ScheduledMatch
          key={i}
          match={match}
          teamId={teamId}
          divisionSlug={divisionSlug}
          checkInUrl={checkInUrl(match)}
        />
      ))
    ) : (
      <Text>There are currently no scheduled matches for this team.</Text>
    )}
  </>
)

export default Schedules
