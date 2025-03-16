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
          winningPercentage
          averagePointDifferential
          rank
          rankReason {
            id
            statistic
            lowerTeam {
              name
            }
            teamValue
            lowerTeamValue
          }
        }
      }
      record {
        id
        wins
        losses
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
        locationName
        locationUrl
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
        forfeitedTeam {
          id
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
