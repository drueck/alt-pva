import React, { useState, useEffect } from 'react'
import Text from 'components/Text'
import ScheduledMatch from './ScheduledMatch'
import TabBackground from 'components/TabBackground'
import { isToday } from 'utils/calendar'
import NoDataCard from 'Team/NoDataCard'

const facilityIds = {
  'Delta Park': 2,
  'Brentwood Park': 3,
  'Flavel Park': 4,
  'Woodstock Park': 5,
  'Parklane Park': 6,
}

const checkInRequired = false

const checkInUrl = ({ date, location }) => {
  if (checkInRequired && isToday(date) && facilityIds[location]) {
    return `https://register.portlandvolleyball.org/checkin/facility/${facilityIds[location]}/`
  }
  return undefined
}

const Schedules = ({ scheduledMatches, teamId, divisionSlug }) => {
  const [futureMatches, setFutureMatches] = useState([])

  useEffect(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    setFutureMatches(
      scheduledMatches.filter(
        ({ date: matchDate }) => new Date(matchDate) >= today
      )
    )
  }, [scheduledMatches])

  return (
    <>
      {futureMatches.length ? (
        futureMatches.map((match, i) => (
          <ScheduledMatch
            key={i}
            match={match}
            teamId={teamId}
            divisionSlug={divisionSlug}
            checkInUrl={checkInUrl(match)}
          />
        ))
      ) : (
        <TabBackground>
          <NoDataCard>
            <Text>There are currently no scheduled matches for this team.</Text>
          </NoDataCard>
        </TabBackground>
      )}
    </>
  )
}

export default Schedules
