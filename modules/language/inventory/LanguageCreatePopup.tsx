import { useApiCall, useTranslation } from '@/hooks'
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
    handleError(status, message) {
      if (status) toast.error(message)
    },
  })

  const labelButton = useTranslation('createNewLang')

  const labelKey = useTranslation('languageKey')

  const labelName = useTranslation('languageName')

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
        <Modal open={open} onClose={handleClose} blur>
          <Modal.Header>
            <Text h2 id="modal-title">
              {labelButton}
            </Text>
          </Modal.Header>

          <Modal.Body>
            <Input
              css={{ width: '100%' }}
              value={languageState.key}
              label={labelKey}
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
              label={labelName}
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
