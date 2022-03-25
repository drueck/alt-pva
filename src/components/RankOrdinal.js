import React from 'react'
import styled from '@emotion/styled'
import { color } from 'utils/style'
import ordinal from 'ordinal'

const Rank = styled.span`
  background-color: white;
  border-radius: 0.5em;
  color: ${color('mutedBlue')};
  display: inline-block;
  line-height: 2em;
  margin-right: 1em;
  text-align: center;
  vertical-align: middle;
  width: 4em;
  flex-shrink: 0;
`

const RankOrdinal = ({ rank }) => <Rank>{ordinal(rank)}</Rank>

export default RankOrdinal
