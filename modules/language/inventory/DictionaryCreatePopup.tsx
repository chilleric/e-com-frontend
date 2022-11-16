import { useApiCall, useTranslation } from '@/hooks'
import { generateToken } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { setLanguage } from '@/redux/share-store'
import { addNewDictionary, getLanguageByKey } from '@/services'
import { DictionaryKey, LanguageResponseSuccess } from '@/types'
import { Button, Input, Modal, Text } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
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

  const dispatch = useDispatch()

  const { languageKey } = useSelector(GeneralSettingsSelector)

  const handleClose = () => {
    setOpen(false)
  }

  const getLanguage = useApiCall<LanguageResponseSuccess, string>({
    callApi: () =>
      getLanguageByKey(
        generateToken({ userId: cookies.userId, deviceId: cookies.deviceId }),
        languageKey
      ),
    handleError(status, message) {
      if (status) {
        toast.error(message)
      }
    },
    handleSuccess(message, data) {
      dispatch(setLanguage(data.dictionary))
    },
  })

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
      getLanguage.setLetCall(true)
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
        <Modal open={open} onClose={handleClose} blur>
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
