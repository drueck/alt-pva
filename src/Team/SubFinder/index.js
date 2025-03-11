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
import SUB_FINDER_QUERY from './SubFinder.query'
import { useQuery } from '@apollo/client'
import TeamList from './TeamList'
import XIcon from 'components/XIcon'
import IconButton from 'components/IconButton'

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
  background-color: ${color('darkModeBackground')};
  color: ${color('darkModeText')};
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
  color: ${color('darkModeText')};
  margin: 0;
`

const timeToFloat = (time) => Number(time.slice(0, 4).replace(':', '.'))

const SubFinder = React.memo(
  forwardRef(({ teamId, match, close: externalClose }, ref) => {
    const modalRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    const [before, setBefore] = useState([])
    const [after, setAfter] = useState([])

    const { loading, error, data } = useQuery(SUB_FINDER_QUERY, {
      variables: { date: match.date },
    })

    useEffect(() => {
      if (!data) {
        return
      }

      const opponentId =
        match.homeTeam.id === teamId ? match.visitingTeam.id : match.homeTeam.id

      const matchTime = timeToFloat(match.time)
      const matchTeams = [teamId, opponentId]

      const before = new Set()
      const after = new Set()

      data.scheduledMatches
        .filter((otherMatch) => match.locationUrl === otherMatch.locationUrl)
        .forEach((otherMatch) => {
          const otherMatchTime = timeToFloat(otherMatch.time)
          if (matchTime - otherMatchTime === 1) {
            before.add(otherMatch.homeTeam)
            before.add(otherMatch.visitingTeam)
          } else if (otherMatchTime - matchTime === 1) {
            after.add(otherMatch.homeTeam)
            after.add(otherMatch.visitingTeam)
          }
        })

      for (const team in before) {
        if (team.id in matchTeams) {
          before.delete(team)
        }
      }

      for (const team in after) {
        if (team.id in matchTeams) {
          after.delete(team)
        }
      }

      setBefore(Array.from(before))
      setAfter(Array.from(after))
    }, [
      data,
      match.homeTeam.id,
      match.visitingTeam.id,
      match.time,
      teamId,
      match.locationUrl,
    ])

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
  })
)

export default SubFinder
