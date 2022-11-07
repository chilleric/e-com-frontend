import { ShareStoreSelector } from '@/redux/share-store'
import { Loading, Modal, Text } from '@nextui-org/react'
import { useSelector } from 'react-redux'

export const BackDropModal = () => {
  const { loading } = useSelector(ShareStoreSelector)

  return (
    <Modal open={loading} preventClose blur>
      <Modal.Header>
        <Text h2 id="modal-title">
          Loading
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Loading size="md" />
      </Modal.Body>
    </Modal>
  )
}
