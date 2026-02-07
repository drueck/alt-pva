import React, { useState, useRef, useCallback } from 'react'
import {
  useFloating,
  autoUpdate,
  useClick,
  useDismiss,
  useInteractions,
  flip,
} from '@floating-ui/react'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import { color } from 'utils/style'
import IconButton from 'components/IconButton'
import MoreIcon from 'components/MoreIcon'
import SubFinder from '../SubFinder'

const Menu = styled.ul`
  margin: 0;
  padding: 0.5rem 0;
  list-style: none;

  background-color: ${color('surface')};
  border: 1px solid ${color('text')};
  border-radius: 4px;

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`

const MenuItem = styled.li`
  padding: 0.5rem 1rem;
  color: ${color('text')};
  text-align: left;
  cursor: pointer;

  &:hover {
    color: ${color('accentMuted')};
  }
`

const ContextMenu = ({ teamId, match }) => {
  const theme = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [isSubFinderLoaded, setIsSubFinderLoaded] = useState(false)
  const subFinderRef = useRef(null)

  const openSubFinder = useCallback(() => {
    setIsSubFinderLoaded(true)
    setTimeout(() => subFinderRef.current?.showModal(), 0)
  }, [])

  const closeSubFinder = useCallback(() => subFinderRef.current?.close(), [])

  const { refs, floatingStyles, context } = useFloating({
    placement: 'bottom-end',
    whileElementsMounted: autoUpdate,
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [flip()],
  })

  const click = useClick(context)
  const dismiss = useDismiss(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ])

  return (
    <>
      <IconButton
        aria-label="More"
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        <MoreIcon strokeColor={color('text', { theme })} />
      </IconButton>
      {isOpen && (
        <Menu
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          <MenuItem onClick={openSubFinder}>Find a Sub</MenuItem>
        </Menu>
      )}
      {isSubFinderLoaded && (
        <SubFinder
          teamId={teamId}
          match={match}
          ref={subFinderRef}
          close={closeSubFinder}
        />
      )}
    </>
  )
}

export default ContextMenu
