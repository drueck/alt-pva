import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useQuery } from '@apollo/client'
import EXTRA_DETAILS_QUERY from './ExtraDetails.query'
import QueryError from 'components/QueryError'
import NotFound from 'components/NotFound'
import { compareMatchDatesAsc } from 'utils/matches'
import OtherMatch from './OtherMatch'
import { TertiaryHeading } from 'components/Headings'
import { formatTime } from 'utils/calendar'

const Details = styled.div`
  padding: 1rem 0;
`

const Heading = styled(TertiaryHeading)`
  padding-left: 0;
`

const buildObj = (matches) => {
  const obj = {}
  matches.forEach((match) => {
    if (!obj[match.location]) {
      obj[match.location] = {}
    }
    if (!obj[match.location][match.time]) {
      obj[match.location][match.time] = []
    }
    obj[match.location][match.time].push(match.homeTeam.name)
    obj[match.location][match.time].push(match.visitingTeam.name)
  })
  return obj
}

const ExtraDetails = ({ match }) => {
  const { loading, error, data } = useQuery(EXTRA_DETAILS_QUERY, {
    variables: { date: match.date },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <QueryError error={error} />
  if (!data?.scheduledMatches) return <NotFound />

  const matches = data.scheduledMatches
    .filter(({ id }) => id !== match.id)
    .sort(compareMatchDatesAsc)

  const obj = buildObj(matches)

  return (
    <Details>
      <Heading>Teams Playing Tonight</Heading>
      {Object.keys(obj).map((location) => (
        <>
          <h4>{location}</h4>
          {Object.keys(obj[location]).map((time) => (
            <>
              <h5>{formatTime(time)}</h5>
              {obj[location][time].map((teamName) => (
                <div>{teamName}</div>
              ))}
            </>
          ))}
        </>
      ))}
    </Details>
  )
}

export default ExtraDetails
