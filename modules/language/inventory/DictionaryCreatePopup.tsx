import { useApiCall } from '@/hooks'
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
}

export const DictionaryCreatePopup = ({
  setLetCallList,
  listKeyOfDictionary,
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

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true)
        }}
        size="sm"
      >
        Create New Dictionary
      </Button>
      {open ? (
        <Modal open={open} onClose={handleClose} blur>
          <Modal.Header>
            <Text h2 id="modal-title">
              Create New Dictionary
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
              Cancel
            </Button>

            <Button
              disabled={createResult.loading}
              auto
              color="success"
              onClick={() => {
                createResult.setLetCall(true)
              }}
            >
              Create
            </Button>
          </Modal.Footer>
        </Modal>
      ) : null}
    </>
  )
}
