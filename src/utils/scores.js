// TODO: there is a lot of duplicated effort here where every function
// takes the same arguments and computes results that could be computed
// once and reused if this was transitioned to an object-oriented design
// consider making that change, or at least organizing this file better

export const formatScoreFromPerspective = (setResult, perspective) => {
  if (setResult.homeTeamScore === undefined) return ''

  const teamScore = teamScoreFromPerspective(setResult, perspective)
  const opponentScore = opponentScoreFromPerspective(setResult, perspective)

  return `${teamScore} - ${opponentScore}`
}

const teamScoreKey = (perspective) =>
  perspective === 'home' ? 'homeTeamScore' : 'visitingTeamScore'

const opponentScoreKey = (perspective) =>
  perspective === 'home' ? 'visitingTeamScore' : 'homeTeamScore'

const teamScoreFromPerspective = (setResult, perspective) =>
  setResult[teamScoreKey(perspective)]

const opponentScoreFromPerspective = (setResult, perspective) =>
  setResult[opponentScoreKey(perspective)]

export const setResultFromPerspective = (setResult, perspective) => {
  const teamScore = teamScoreFromPerspective(setResult, perspective)
  const opponentScore = opponentScoreFromPerspective(setResult, perspective)

  if (teamScore > opponentScore) {
    return 'win'
  }
  if (teamScore < opponentScore) {
    return 'loss'
  }
  return 'tie'
}

export const setsWonFromPerspective = (setResults, perspective) =>
  setResults.reduce(
    (count, setResult) =>
      count +
      (setResultFromPerspective(setResult, perspective) === 'win' ? 1 : 0),
    0
  )

const setsLostFromPerspective = (setResults, perspective) =>
  setResults.reduce(
    (count, setResult) =>
      count +
      (setResultFromPerspective(setResult, perspective) === 'loss' ? 1 : 0),
    0
  )

export const matchResultFromPerspective = (setResults, perspective) => {
  const setsWon = setsWonFromPerspective(setResults, perspective)
  const setsLost = setsLostFromPerspective(setResults, perspective)

  if (setsWon === setsLost) {
    return matchResultByPointDifferentialFromPerspective(
      setResults,
      perspective
    )
  }

  return setsWon > setsLost ? 'W' : 'L'
}

export const pointDifferentialFromPerspective = (setResults, perspective) =>
  setResults.reduce(
    (diff, setResult) =>
      diff +
      teamScoreFromPerspective(setResult, perspective) -
      opponentScoreFromPerspective(setResult, perspective),
    0
  )

const matchResultByPointDifferentialFromPerspective = (
  setResults,
  perspective
) => {
  const pointDifferential = pointDifferentialFromPerspective(
    setResults,
    perspective
  )

  if (pointDifferential === 0) {
    return 'T'
  }

  return pointDifferential > 0 ? 'W' : 'L'
}

export const opponentNameFromPerspective = (
  homeTeam,
  visitingTeam,
  perspective
) => (perspective === 'home' ? visitingTeam.name : homeTeam.name)

export const matchPointsFromPerspective = (setResults, perspective) =>
  matchPointsForWinningSets(setResults, perspective) +
  matchPointsForPointDifferential(setResults, perspective) +
  matchPointsForMatchWin(setResults, perspective)

const matchPointsForWinningSets = (setResults, perspective) =>
  setsWonFromPerspective(setResults, perspective) * 0.5

const matchPointsForPointDifferential = (setResults, perspective) =>
  pointDifferentialFromPerspective(setResults, perspective) > 0 ? 1 : 0

const matchPointsForMatchWin = (setResults, perspective) =>
  matchResultFromPerspective(setResults, perspective) === 'W' ? 2 : 0
