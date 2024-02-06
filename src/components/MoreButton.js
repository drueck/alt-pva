import React from 'react'
import IconButton from 'components/IconButton'
import PlusIcon from 'components/PlusIcon'
import MinusIcon from 'components/MinusIcon'

const MoreButton = ({ expanded, toggleExpanded }) => (
  <IconButton type="button" aria-label="More" onClick={() => toggleExpanded()}>
    {expanded ? <MinusIcon title="Collapse" /> : <PlusIcon title="Expand" />}
  </IconButton>
)

export default MoreButton
