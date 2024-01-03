import { gql } from '@apollo/client'

const DIVISION_QUERY = gql`
  query DivisionQuery($slug: String!) {
    division(slug: $slug) {
      id
      name
      slug
      teams {
        id
        name
        slug
        rank
      }
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
  }
`

export default DIVISION_QUERY
