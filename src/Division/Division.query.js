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
    }
  }
`

export default DIVISION_QUERY
