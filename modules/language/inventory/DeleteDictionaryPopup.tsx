import { DEVICE_ID, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { generateToken } from '@/lib'
import { deleteDictionaryKey } from '@/services'
import { Button, Modal, Text } from '@nextui-org/react'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { TiDelete } from 'react-icons/ti'
import { toast } from 'react-toastify'

interface IDeleteDictionaryPopup {
  dictionaryKey: string
  setLetCallList: Function
  updateStoreLanguage: Function
}

export const DeleteDictionaryPopup = ({
  dictionaryKey,
  setLetCallList,
  updateStoreLanguage,
}: IDeleteDictionaryPopup) => {
  const [cookies] = useCookies([DEVICE_ID, USER_ID])
  const [open, setOpen] = useState(false)

  const translate = useTranslationFunction()

  const handleClose = () => {
    setOpen(false)
  }

  const deleteResult = useApiCall({
    callApi: () =>
      deleteDictionaryKey(
        generateToken({ userId: cookies.userId, deviceId: cookies.deviceId }),
        dictionaryKey
      ),
    handleSuccess(message) {
      toast.success(translate(message))
      setOpen(false)
      setLetCallList(true)
      updateStoreLanguage()
    },
    handleError(status, message) {
      if (status) toast.error(translate(message))
    },
  })

  const deleteLabel = useTranslation('delete')
  const cancel = useTranslation('cancel')
  const deleteKeyLabel = useTranslation('deleteKeyLabel')

  return (
    <>
      <TiDelete
        style={{ cursor: 'pointer' }}
        size={25}
        color="red"
        onClick={() => {
          setOpen(true)
        }}
      />
      <Modal open={open} onClose={handleClose} blur>
        <Modal.Header>
          <Text h2 id="modal-title">
            {deleteLabel} {dictionaryKey}
          </Text>
        </Modal.Header>

        <Modal.Body>{deleteKeyLabel}</Modal.Body>

        <Modal.Footer justify="center">
          <Button disabled={deleteResult.loading} auto color="warning" onClick={handleClose}>
            {cancel}
          </Button>

          <Button
            disabled={deleteResult.loading}
            auto
            color="success"
            onClick={() => {
              deleteResult.setLetCall(true)
            }}
          >
            {deleteLabel}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
