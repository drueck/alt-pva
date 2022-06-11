import React from 'react'
import styled from '@emotion/styled'
import { color } from 'utils/style'
import { TertiaryHeading } from 'components/Headings'
import Text from 'components/Text'

const PVALink = styled.a`
  text-decoration: none;
  color: ${color('lightMutedBlue')};
`

const MaintenanceMessage = () => (
  <>
    <TertiaryHeading>Paused, For Now</TertiaryHeading>
    <Text>
      This site is currently down for maintenance or updates. Please check{' '}
      <PVALink href="https://portlandvolleyball.org">
        portlandvolleyball.org
      </PVALink>{' '}
      for your schedules, scores, and standings, or ask your team captain for
      the details. Apologies for the inconvenience.
    </Text>
  </>
)

export default MaintenanceMessage
