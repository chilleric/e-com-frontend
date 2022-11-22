import { ShareStoreSelector } from '@/redux/share-store'
import { Loading, Modal, Text } from '@nextui-org/react'
import { useSelector } from 'react-redux'

export const BackDropModal = () => {
  const { settingsLoading, languageLoading } = useSelector(ShareStoreSelector)

  return (
    <Modal open={settingsLoading || languageLoading} preventClose blur>
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
