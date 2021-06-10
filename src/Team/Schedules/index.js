import React from 'react'
import { TertiaryHeading } from 'components/Headings'
import Text from 'components/Text'
import ScheduledMatch from './ScheduledMatch'
import { isToday } from 'utils/calendar'

const checkInUrls = {
  'Delta Park': 'https://register.portlandvolleyball.org/checkin/facility/2/',
  'Brentwood Park':
    'https://register.portlandvolleyball.org/checkin/facility/3/',
}

const checkInUrl = ({ date, location }) => {
  if (isToday(date)) {
    return checkInUrls[location]
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
