import { gql } from '@apollo/client'

const SUB_FINDER_QUERY = gql`
  query SubFinderQuery($date: Date!) {
    scheduledMatches(date: $date) {
      time
      locationName
      locationUrl
      homeTeam {
        id
        name
        slug
        contact
        division {
          name
          slug
        }
      }
      visitingTeam {
        id
        name
        slug
        contact
        division {
          name
          slug
        }
      }
    }
  }
`

export default SUB_FINDER_QUERY
