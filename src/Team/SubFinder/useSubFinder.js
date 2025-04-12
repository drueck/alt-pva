import { useState, useEffect } from 'react'

import SUB_FINDER_QUERY from './SubFinder.query'
import { useQuery } from '@apollo/client'

export const timeToFloat = (time) => Number(time.slice(0, 4).replace(':', '.'))

export const teamsPlayingBeforeAndAfter = (scheduledMatches, match) => {
  const matchTime = timeToFloat(match.time)
  const beforeSet = new Set() // teams
  const afterSet = new Set() // teams
  const sameSet = new Set() // team ids

  scheduledMatches.forEach((otherMatch) => {
    if (otherMatch.locationUrl !== match.locationUrl) return

    const otherMatchTime = timeToFloat(otherMatch.time)

    if (Math.abs(otherMatchTime - matchTime) < 0.01) {
      sameSet.add(otherMatch.homeTeam.id)
      sameSet.add(otherMatch.visitingTeam.id)
      return
    }

    if (Math.abs(matchTime - otherMatchTime - 1) < 0.01) {
      beforeSet.add(otherMatch.homeTeam)
      beforeSet.add(otherMatch.visitingTeam)
    } else if (Math.abs(otherMatchTime - matchTime - 1) < 0.01) {
      afterSet.add(otherMatch.homeTeam)
      afterSet.add(otherMatch.visitingTeam)
    }
  })

  const before = [...beforeSet].filter(({ id }) => !sameSet.has(id))
  const after = [...afterSet].filter(({ id }) => !sameSet.has(id))

  return [before, after]
}

const useSubFinder = (teamId, match) => {
  const [before, setBefore] = useState([])
  const [after, setAfter] = useState([])

  const { loading, error, data } = useQuery(SUB_FINDER_QUERY, {
    variables: { date: match.date },
  })

  useEffect(() => {
    if (!data) {
      return
    }

    const [before, after] = teamsPlayingBeforeAndAfter(
      data.scheduledMatches,
      match,
    )

    setBefore(before)
    setAfter(after)
  }, [data, match, teamId, match.locationUrl])

  return { loading, error, before, after }
}

export default useSubFinder
