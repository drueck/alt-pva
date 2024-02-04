import React from 'react'
import NavList from 'components/NavList'
import NavListItem from 'components/NavListItem'
import NavListLink from 'components/NavListLink'
import Text from 'components/Text'
import SectionBackground from 'components/SectionBackground'

const DivisionsList = ({ divisions }) =>
  divisions.length ? (
    <SectionBackground>
      <NavList>
        {divisions.map(({ id, slug, name }) => (
          <NavListItem>
            <NavListLink key={id} to={`/division/${slug}`}>
              {name}
            </NavListLink>
          </NavListItem>
        ))}
      </NavList>
    </SectionBackground>
  ) : (
    <SectionBackground>
      <Text>
        Looks like we're between seasons. No divisions have been posted yet.
      </Text>
    </SectionBackground>
  )

export default DivisionsList
