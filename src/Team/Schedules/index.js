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

const parseNaiveDate = (dateString) => {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day)
}

const Schedules = ({ scheduledMatches, teamId, divisionSlug }) => {
  const [futureMatches, setFutureMatches] = useState([])

  useEffect(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (scheduledMatches) {
      setFutureMatches(
        scheduledMatches.filter(({ date: matchDate }) => {
          return parseNaiveDate(matchDate || '1970-01-01') >= today
        })
      )
    }
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
