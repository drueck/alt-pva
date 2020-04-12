import React from 'react'
import { formatDate, formatTime } from 'utils/calendar'
import { TertiaryHeading } from 'components/Headings'
import Text from 'components/Text'

const Schedules = ({ scheduledMatches }) => (
  <>
    <TertiaryHeading>Schedules</TertiaryHeading>
    {scheduledMatches.length ? (
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Home</th>
            <th>Visitor</th>
            <th>Location</th>
            <th>Ref</th>
          </tr>
        </thead>
        <tbody>
          {scheduledMatches.map(
            ({
              id,
              date,
              time,
              homeTeam: { name: home },
              visitingTeam: { name: visitor },
              location,
              ref,
            }) => (
              <tr key="id">
                <td>{formatDate(date)}</td>
                <td>{formatTime(time)}</td>
                <td>{home}</td>
                <td>{visitor}</td>
                <td>{location}</td>
                <td>{ref}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    ) : (
      <Text>There are currently no scheduled matches for this team.</Text>
    )}
  </>
)

export default Schedules
