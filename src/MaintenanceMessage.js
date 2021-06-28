import React from 'react'
import styled from '@emotion/styled'
import { color } from 'utils/style'
import { SecondaryHeading } from 'components/Headings'
import Text from 'components/Text'

const PVALink = styled.a`
  text-decoration: none;
  color: ${color('mutedBlue')};
`

const MaintenanceMessage = () => (
  <>
    <SecondaryHeading>Strange things are afoot at the PVA</SecondaryHeading>
    <Text>
      This site is on hold for now due to things being in flux on{' '}
      <PVALink href="https://portlandvolleyball.org">
        portlandvolleyball.org
      </PVALink>
      . Please check the main PVA website for your schedules, scores, and
      standings, or ask your team captain for the 411. Hope to be back in action
      when things settle down. #ThanksPortlandParksAndRec #Sarcasm
    </Text>
  </>
)

export default MaintenanceMessage
