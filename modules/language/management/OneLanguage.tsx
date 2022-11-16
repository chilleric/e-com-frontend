import { useApiCall } from '@/hooks'
import { generateToken } from '@/lib'
import { updateLanguage } from '@/services'
import { DictionaryKey, LanguageRequest, LanguageResponseSuccess } from '@/types'
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
  const [dictionaryList, setDictionaryList] = useState<DictionaryKey>({})

  const updateResult = useApiCall<LanguageRequest, Record<keyof LanguageRequest, string>>({
    callApi: () =>
      updateLanguage(
        language.id,
        generateToken({ userId: cookies.userId, deviceId: cookies.deviceId }),
        {
          key: language.key,
          language: language.language,
          dictionary: dictionaryList,
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
    setDictionaryList(language.dictionary)
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
      <LanguageTable
        dictionaryList={dictionaryList}
        edit={editAble}
        handleChangeState={setDictionaryList}
        setLetCallList={setLetCallList}
      />
    </>
  )
}
