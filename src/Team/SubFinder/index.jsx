import React, {
  forwardRef,
  useState,
  useEffect,
  useImperativeHandle,
  useRef,
  useCallback,
} from 'react'
import styled from '@emotion/styled'
import { color } from 'utils/style'
import TeamList from './TeamList'
import XIcon from 'components/XIcon'
import IconButton from 'components/IconButton'
import useSubFinder from './useSubFinder'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
}
`

const Modal = styled.dialog`
  background-color: ${color('background')};
  color: ${color('text')};
  padding: 0;
  margin: 0;
  border: none;
  border-radius: 1rem;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 600px;
  height: auto;
  max-height: 500px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  overflow-y: auto;

  @media (max-width: 650px), (max-height: 700px) {
    inset: 2.5%;
    width: auto;
    height: 95%;
    max-width: none;
    max-height: none;
    transform: none;
  }
`

const ModalContent = styled.div`
  box-sizing: border-box;
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
`

const ContentContainer = styled.div`
  height: 100%;
  overflow: auto;
`

const Heading = styled.h2`
  color: ${color('text')};
  margin: 0;
`

const SubFinder = React.memo(
  forwardRef(({ teamId, match, close: externalClose }, ref) => {
    const modalRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    const { loading, error, before, after } = useSubFinder(teamId, match)

    useImperativeHandle(ref, () => ({
      showModal: () => {
        if (!isOpen && modalRef.current) {
          modalRef.current.showModal()
          setIsOpen(true)
        }
      },
      close: () => {
        if (isOpen && modalRef.current) {
          modalRef.current.close()
          setIsOpen(false)
        }
      },
    }))

    const handleClose = useCallback(() => {
      setIsOpen(false)
      externalClose?.()
    }, [externalClose])

    useEffect(() => {
      const modal = modalRef.current
      if (!modal) return

      modal.addEventListener('close', handleClose)
      return () => modal.removeEventListener('close', handleClose)
    }, [handleClose])

    const closeModal = useCallback(() => ref.current?.close(), [ref])

    const closeFromEvent = (event) => {
      if (event.target === event.currentTarget) {
        closeModal()
      }
    }

    if (error) {
      console.log(error)
      return null
    }

    return (
      <>
        {isOpen && <Overlay onClick={closeModal} />}
        <Modal ref={modalRef} onClick={closeFromEvent}>
          {!loading && (
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <TitleContainer>
                <Heading>Sub Finder</Heading>
                <IconButton
                  aria-label="Close"
                  type="button"
                  onClick={closeModal}
                >
                  <XIcon title="Close" />
                </IconButton>
              </TitleContainer>
              <ContentContainer>
                <TeamList
                  teams={before}
                  beforeOrAfter="Before"
                  close={closeModal}
                />
                <TeamList
                  teams={after}
                  beforeOrAfter="After"
                  close={closeModal}
                />
                {!before.length && !after.length && (
                  <p>
                    Unfortunately it looks like there are no teams playing
                    directly before or after this match at the gym at which this
                    match is being played.
                  </p>
                )}
              </ContentContainer>
            </ModalContent>
          )}
        </Modal>
      </>
    )
  }),
)

export default SubFinder
