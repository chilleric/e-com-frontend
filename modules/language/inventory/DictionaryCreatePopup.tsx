import { useApiCall, useTranslation } from '@/hooks'
import { generateToken } from '@/lib'
import { addNewDictionary } from '@/services'
import { DictionaryKey } from '@/types'
import { Button, Input, Modal, Text } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { inputStylesLanguage } from './Language.inventory'

interface IDictionaryCreatePopup {
  listKeyOfDictionary: string[]
  setLetCallList: Function
  updateStoreLanguage: Function
}

export const DictionaryCreatePopup = ({
  setLetCallList,
  listKeyOfDictionary,
  updateStoreLanguage,
}: IDictionaryCreatePopup) => {
  const [cookies] = useCookies()

  const [dictionaryState, setDictionaryState] = useState<DictionaryKey>({})

  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const createResult = useApiCall<DictionaryKey, Record<keyof DictionaryKey, string>>({
    callApi: () =>
      addNewDictionary(
        generateToken({ userId: cookies.userId, deviceId: cookies.deviceId }),
        dictionaryState
      ),
    handleSuccess(message) {
      toast.success(message)
      handleClose()
      setLetCallList(true)
      updateStoreLanguage()
    },
    handleError(message) {
      toast.error(message)
    },
  })

  useEffect(() => {
    let newDictionaryState: DictionaryKey = {}
    listKeyOfDictionary.forEach((key) => {
      newDictionaryState = { ...newDictionaryState, [key]: '' }
    })
    setDictionaryState(newDictionaryState)
  }, [listKeyOfDictionary])

  const labelButton = useTranslation('createNewDict')

  const cancel = useTranslation('cancel')

  const create = useTranslation('create')

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true)
        }}
        size="sm"
      >
        {labelButton}
      </Button>
      {open ? (
        <Modal open={open} onClose={handleClose} blur preventClose>
          <Modal.Header>
            <Text h2 id="modal-title">
              {labelButton}
            </Text>
          </Modal.Header>

          <Modal.Body>
            {listKeyOfDictionary.map((key) => (
              <Input
                css={{ width: '100%' }}
                value={dictionaryState[key] ?? ''}
                label={key}
                onChange={(event) => {
                  setDictionaryState({
                    ...dictionaryState,
                    [key]: event.currentTarget.value,
                  })
                }}
                {...inputStylesLanguage({ error: createResult?.error?.result.key })}
              />
            ))}
          </Modal.Body>

          <Modal.Footer justify="center">
            <Button disabled={createResult.loading} auto color="warning" onClick={handleClose}>
              {cancel}
            </Button>

            <Button
              disabled={createResult.loading}
              auto
              color="success"
              onClick={() => {
                createResult.setLetCall(true)
              }}
            >
              {create}
            </Button>
          </Modal.Footer>
        </Modal>
      ) : null}
    </>
  )
}
