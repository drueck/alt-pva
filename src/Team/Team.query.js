import { gql } from '@apollo/client'

const TEAM_QUERY = gql`
  query TeamQuery($divisionSlug: String!, $teamSlug: String!) {
    team(divisionSlug: $divisionSlug, teamSlug: $teamSlug) {
      id
      name
      slug
      rank
      division {
        id
        name
        slug
        standings {
          id
          team {
            id
            name
            slug
          }
          division {
            id
            name
            slug
          }
          wins
          losses
          matchPoints
          matchPointsPossible
          matchPointsPercentage
          winningPercentage
          rank
        }
      }
      record {
        id
        wins
        losses
        matchPoints
        matchPointsPossible
        matchPointsPercentage
        winningPercentage
      }
      scheduledMatches {
        id
        date
        time
        homeTeam {
          id
          name
          slug
          division {
            id
            slug
          }
          record {
            id
            wins
            losses
          }
        }
        visitingTeam {
          id
          name
          slug
          division {
            id
            slug
          }
          record {
            id
            wins
            losses
          }
        }
        location
        court
        ref
      }
      completedMatches {
        id
        date
        time
        homeTeam {
          id
          name
          slug
          division {
            id
            slug
          }
        }
        visitingTeam {
          id
          name
          slug
          division {
            id
            slug
          }
        }
        setResults {
          id
          setNumber
          homeTeamScore
          visitingTeamScore
        }
      }
    }
  }
`

export default TEAM_QUERY
