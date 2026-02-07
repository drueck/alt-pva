import React from 'react'
import styled from '@emotion/styled'
import { color } from 'utils/style'
import { TertiaryHeading } from 'components/Headings'
import Text from 'components/Text'

const PVALink = styled.a`
  text-decoration: none;
  color: ${color('accent')};
`

const MaintenanceMessage = () => (
  <>
    <TertiaryHeading>Paused, For Now</TertiaryHeading>
    <Text>
      The main Portland Volleyball Association website is using a new platform
      now, and that means alt-pva needs to be updated to work with it.
      Unfortunately I will be be busy until early-to-mid January, but will do my
      best to get it up and running again as soon as I can.
    </Text>
    <Text>
      In the meantime, please check{' '}
      <PVALink href="https://portlandvolleyball.org">
        portlandvolleyball.org
      </PVALink>{' '}
      for your schedules, scores, and standings. Apologies for the
      inconvenience.
    </Text>
  </>
)

export default MaintenanceMessage
