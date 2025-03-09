import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import { color } from 'utils/style'
import { compose } from 'utils/fp'

const DAY_REGEX =
  /\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b/

const GENDER_REGEX = /\b(Coed|Women'?s|Men'?s)\b/

const removeDay = (divisionName) => divisionName.replace(DAY_REGEX, '')
const removeGender = (divisionName) => divisionName.replace(GENDER_REGEX, '')
const removeExtraWhitespace = (divisionName) =>
  divisionName.trim().replace(/\s+/, ' ')

const simpleDivision = compose(removeDay, removeGender, removeExtraWhitespace)

const SubHeading = styled.h3`
  color: ${color('perrywinkle')};
`

const StyledList = styled.ul`
  list-style: none;
  padding-left: 0;
`

const TeamLink = styled(Link)`
  text-decoration: none;
  color: ${color('lightMutedBlue')};
`

const TeamList = ({ teams, beforeOrAfter }) => {
  if (!teams.length) return null

  return (
    <>
      <SubHeading>Teams Playing {beforeOrAfter}</SubHeading>
      <StyledList>
        {teams.map(({ id, name, slug, division }) => (
          <li key={id}>
            <TeamLink key={id} to={`/division/${division.slug}/team/${slug}`}>
              {name} ({simpleDivision(division.name)})
            </TeamLink>
          </li>
        ))}
      </StyledList>
    </>
  )
}

export default TeamList
