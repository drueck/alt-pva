import {
  opponentNameFromPerspective,
  formatScoreFromPerspective,
  setResultFromPerspective,
  setsWonFromPerspective,
  pointDifferentialFromPerspective,
  matchResultFromPerspective,
} from './scores'

describe('opponentNameFromPerspective', () => {
  describe('when the perspective is home', () => {
    it('it returns the visiting team name', () => {
      const homeTeam = { name: 'Home' }
      const visitingTeam = { name: 'Visitor' }

      expect(
        opponentNameFromPerspective(homeTeam, visitingTeam, 'home')
      ).toEqual('Visitor')
    })
  })

  describe('when the perspective is visitor', () => {
    it('it returns the home team name', () => {
      const homeTeam = { name: 'Home' }
      const visitingTeam = { name: 'Visitor' }

      expect(
        opponentNameFromPerspective(homeTeam, visitingTeam, 'visitor')
      ).toEqual('Home')
    })
  })
})

describe('formatScoreFromPerspective', () => {
  describe('when the perspective is home', () => {
    it("puts the home team's score first", () => {
      const setResult = {
        homeTeamScore: 25,
        visitingTeamScore: 20,
      }

      expect(formatScoreFromPerspective(setResult, 'home')).toEqual('25-20')
    })
  })

  describe('when the perspective is visitor', () => {
    it("puts the visiting team's score first", () => {
      const setResult = {
        homeTeamScore: 25,
        visitingTeamScore: 20,
      }

      expect(formatScoreFromPerspective(setResult, 'visitor')).toEqual('20-25')
    })
  })
})

describe('setResultFromPerspective', () => {
  describe('when the home team won', () => {
    it("returns 'win' from 'home' perspective, 'loss' from 'visitor'", () => {
      const setResult = { homeTeamScore: 25, visitingTeamScore: 20 }

      expect(setResultFromPerspective(setResult, 'home')).toEqual('win')
      expect(setResultFromPerspective(setResult, 'visitor')).toEqual('loss')
    })
  })

  describe('when the perspective is home and the home team lost', () => {
    it("returns 'loss' from 'home' perspective, 'win' from 'visitor'", () => {
      const setResult = { homeTeamScore: 20, visitingTeamScore: 25 }

      expect(setResultFromPerspective(setResult, 'home')).toEqual('loss')
      expect(setResultFromPerspective(setResult, 'visitor')).toEqual('win')
    })
  })

  describe('when the teams tied, no matter the perspective', () => {
    it("returns 'tie'", () => {
      const setResult = { homeTeamScore: 25, visitingTeamScore: 25 }

      expect(setResultFromPerspective(setResult, 'home')).toEqual('tie')
      expect(setResultFromPerspective(setResult, 'visitor')).toEqual('tie')
    })
  })
})

describe('setsWonFromPerspective', () => {
  describe('when the perspective is home', () => {
    it('returns the number of sets the home team won', () => {
      const setResults = [
        { homeTeamScore: 25, visitingTeamScore: 20 },
        { homeTeamScore: 25, visitingTeamScore: 23 },
        { homeTeamScore: 8, visitingTeamScore: 15 },
      ]

      expect(setsWonFromPerspective(setResults, 'home')).toEqual(2)
    })
  })

  describe('when the perspective is home', () => {
    it('returns the number of sets the home team won', () => {
      const setResults = [
        { homeTeamScore: 25, visitingTeamScore: 20 },
        { homeTeamScore: 25, visitingTeamScore: 23 },
        { homeTeamScore: 8, visitingTeamScore: 15 },
      ]

      expect(setsWonFromPerspective(setResults, 'visitor')).toEqual(1)
    })
  })
})

describe('pointDifferentialFromPerspective', () => {
  it('returns the teams total points minus the opponents total points', () => {
    const setResults = [
      { homeTeamScore: 25, visitingTeamScore: 20 },
      { homeTeamScore: 22, visitingTeamScore: 25 },
    ]

    expect(pointDifferentialFromPerspective(setResults, 'home')).toEqual(2)
  })
})

describe('matchResultFromPerspective', () => {
  describe('when the perspective is home and the home team won more sets', () => {
    it('returns W', () => {
      const setResults = [
        { homeTeamScore: 25, visitingTeamScore: 20 },
        { homeTeamScore: 25, visitingTeamScore: 20 },
        { homeTeamScore: 8, visitingTeamScore: 15 },
      ]

      expect(matchResultFromPerspective(setResults, 'home')).toEqual('W')
    })
  })

  describe('when the perspective is home and the home team lost more sets', () => {
    it('returns L', () => {
      const setResults = [
        { homeTeamScore: 20, visitingTeamScore: 25 },
        { homeTeamScore: 25, visitingTeamScore: 20 },
        { homeTeamScore: 8, visitingTeamScore: 15 },
      ]

      expect(matchResultFromPerspective(setResults, 'home')).toEqual('L')
    })
  })

  describe('when the perspective is home and the home team won by points', () => {
    it('returns W', () => {
      const setResults = [
        { homeTeamScore: 25, visitingTeamScore: 20 },
        { homeTeamScore: 22, visitingTeamScore: 25 },
      ]

      expect(matchResultFromPerspective(setResults, 'home')).toEqual('W')
    })
  })

  describe('if the teams tied by sets and points', () => {
    it('returns T', () => {
      const setResults = [
        { homeTeamScore: 25, visitingTeamScore: 25 },
        { homeTeamScore: 25, visitingTeamScore: 25 },
      ]

      expect(matchResultFromPerspective(setResults, 'home')).toEqual('T')
    })
  })
})
