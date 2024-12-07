import { gql } from '@apollo/client'

const EXTRA_DETAILS_QUERY = gql`
  query ExtraDetailsQuery($date: Date!) {
    scheduledMatches(date: $date) {
      id
      date
      time
      location
      division {
        name
      }
      homeTeam {
        name
      }
      visitingTeam {
        name
      }
    }
  }
`

export default EXTRA_DETAILS_QUERY
