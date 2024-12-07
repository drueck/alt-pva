const getMatchDate = (match) => new Date(`${match.date}T${match.time}`)

export const compareMatchDatesDesc = (matchA, matchB) =>
  getMatchDate(matchB) - getMatchDate(matchA)

export const compareMatchDatesAsc = (matchA, matchB) =>
  getMatchDate(matchA) - getMatchDate(matchB)
