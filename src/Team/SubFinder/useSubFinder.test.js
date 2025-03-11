import testResponse from './testResponse.json'
import { teamsPlayingBeforeAndAfter } from './useSubFinder'

describe('teamsPlayingBeforeAndAfter', () => {
  it('returns only teams playing before or after and not at the same time', () => {
    const match = {
      date: '2025-03-10',
      time: '20:00:00',
      homeTeam: {
        id: '1aebc1b56a71a4444403f3222b7f60bb',
        name: '12 Bad Knees',
      },
      visitingTeam: {
        id: 'acd74306b06b46b352ff695a9615efa1',
        name: 'Casual Sets',
      },
      locationUrl:
        'https://maps.google.com/maps?li=rwp&q=2301%20SE%20Willard%20St.%2CMilwaukie%2COR%2097222',
    }

    const [before, after] = teamsPlayingBeforeAndAfter(
      testResponse['data']['scheduledMatches'],
      match
    )

    const expectedBeforeTeamsNames = [
      'Motorboat',
      'Filberts',
      'Whoop Ace',
    ].toSorted()
    const beforeTeamNames = before.map((team) => team.name).toSorted()
    expect(beforeTeamNames).toEqual(expectedBeforeTeamsNames)

    const expectedAfterTeamNames = [
      'Out Past Bedtime',
      'Pancakes',
      'Lollipop Girls',
      'Motorboat',
      'Dig and Dive',
      'Slap that Ace',
    ].toSorted()
    const afterTeamNames = after.map((team) => team.name).toSorted()
    expect(afterTeamNames).toEqual(expectedAfterTeamNames)
  })
})
