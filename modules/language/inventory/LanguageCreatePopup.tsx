import { useApiCall } from '@/hooks'
import { generateToken } from '@/lib'
import { addNewLanguage } from '@/services'
import { AddNewLanguageRequest, LanguageRequest } from '@/types'
import { Button, Input, Modal, Text } from '@nextui-org/react'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { inputStylesLanguage } from './Language.inventory'

interface ILanguageCreatePopup {
  setLetCallList: Function
}

export const LanguageCreatePopup = ({ setLetCallList }: ILanguageCreatePopup) => {
  const [cookies] = useCookies()

  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const [languageState, setLanguageState] = useState<AddNewLanguageRequest>({
    key: '',
    language: '',
  })

  const handleChangeState = (newUpdate: Partial<AddNewLanguageRequest>) => {
    const newLanguageState = { ...languageState }
    setLanguageState({ ...newLanguageState, ...newUpdate })
  }

  const createResult = useApiCall<LanguageRequest, Record<keyof LanguageRequest, string>>({
    callApi: () =>
      addNewLanguage(
        generateToken({ userId: cookies.userId, deviceId: cookies.deviceId }),
        languageState
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

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true)
        }}
        size="sm"
      >
        Create New Language
      </Button>
      {open ? (
        <Modal open={open} onClose={handleClose} blur>
          <Modal.Header>
            <Text h2 id="modal-title">
              Create New Language
            </Text>
          </Modal.Header>

          <Modal.Body>
            <Input
              css={{ width: '100%' }}
              value={languageState.key}
              label="language key"
              onChange={(event) => {
                handleChangeState({
                  key: event.currentTarget.value,
                })
              }}
              {...inputStylesLanguage({ error: createResult?.error?.result.key })}
            />
            <Input
              css={{ width: '100%' }}
              value={languageState.language}
              label="language name"
              onChange={(event) => {
                handleChangeState({
                  language: event.currentTarget.value,
                })
              }}
              {...inputStylesLanguage({ error: createResult?.error?.result.language })}
            />
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
