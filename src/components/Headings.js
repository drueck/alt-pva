import styled from '@emotion/styled'
import { color } from 'utils/style'

export const PrimaryHeading = styled.h1`
  margin: 0;
  padding: 10px;

  a {
    text-decoration: none;
    color: ${color('lightMutedBlue')};
  }
`

export const SecondaryHeading = styled.h2`
  color: ${color('perrywinkle')};
  margin: 10px 0;
  padding-left: 20px;
`

export const TertiaryHeading = styled.h3`
  color: ${color('perrywinkle')};
  margin: 10px 0;
  padding-left: 20px;
`
