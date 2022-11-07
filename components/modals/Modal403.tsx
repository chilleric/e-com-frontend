import { authenticationSelector, setIsForbidden } from '@/redux/authentication'
import { Button, Modal, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

export const Modal403 = () => {
  const router = useRouter()

  const dispatch = useDispatch()

  const { isForbidden } = useSelector(authenticationSelector)

  return (
    <Modal open={isForbidden} preventClose blur>
      <Modal.Header>
        <Text h2 id="modal-title">
          Access denied!
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text h4>Your account does not have this permission!</Text>
      </Modal.Body>
      <Modal.Footer justify="center">
        <Button
          auto
          flat
          onClick={() => {
            dispatch(setIsForbidden(false))
            router.push('/')
          }}
        >
          Back to dashboard
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
