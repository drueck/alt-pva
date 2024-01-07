import { gql } from '@apollo/client'

const DIVISIONS_QUERY = gql`
  {
    divisions {
      id
      name
      slug
    }
  }
`

export default DIVISIONS_QUERY
