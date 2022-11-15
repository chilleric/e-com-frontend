import { useApiCall } from '@/hooks'
import { generateToken } from '@/lib'
import { updateLanguage } from '@/services'
import { LanguageRequest, LanguageResponseSuccess } from '@/types'
import { Button, Loading } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { LanguageTable } from '../inventory'

interface IOneLanguage {
  language: LanguageResponseSuccess
  setLetCallList: Function
}

export const OneLanguage = ({ language, setLetCallList }: IOneLanguage) => {
  const [cookies] = useCookies()

  const [editAble, setEditAble] = useState(false)
  const [languageState, setLanguageState] = useState<LanguageResponseSuccess>({
    id: '',
    key: '',
    language: '',
    dictionary: {},
  })

  const handleChangeState = (newUpdate: Partial<LanguageResponseSuccess>) => {
    const newLanguageState = { ...languageState }
    setLanguageState({ ...newLanguageState, ...newUpdate })
  }

  const updateResult = useApiCall<LanguageRequest, Record<keyof LanguageRequest, string>>({
    callApi: () =>
      updateLanguage(
        generateToken({ userId: cookies.userId, deviceId: cookies.deviceId }),
        languageState.id,
        {
          key: languageState.key,
          language: languageState.language,
          dictionary: languageState.dictionary,
        }
      ),
    handleSuccess(message) {
      toast.success(message)
      setLetCallList(true)
    },
    handleError(message) {
      toast.error(message)
    },
  })

  useEffect(() => {
    setLanguageState(language)
  }, [language])

  return (
    <>
      <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
        {editAble ? (
          <>
            <Button
              color="success"
              onClick={() => {
                updateResult.setLetCall(true)
                setEditAble(false)
              }}
              size="sm"
              disabled={updateResult.loading}
            >
              {updateResult.loading ? <Loading /> : <>Save</>}
            </Button>
            <Button
              color="warning"
              onClick={() => {
                setLetCallList(true)
                setEditAble(false)
              }}
              size="sm"
              disabled={updateResult.loading}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            onClick={() => {
              setEditAble(true)
            }}
            size="sm"
          >
            Edit
          </Button>
        )}
      </div>
      <LanguageTable language={language} edit={editAble} handleChangeState={handleChangeState} />
    </>
  )
}
