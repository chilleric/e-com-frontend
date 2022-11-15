import { useApiCall, useResponsive } from '@/hooks'
import { generateToken } from '@/lib'
import { addNewLanguage, getDefaultDictionary } from '@/services'
import { DictionaryKey, LanguageRequest } from '@/types'
import { Button, Input, Loading, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { LanguageTable } from '../inventory'
import { inputStylesLanguage } from '../inventory/Language.inventory'

export const LanguageCreate = () => {
  const [cookies] = useCookies()
  const router = useRouter()
  const breakPoint = useResponsive()

  const [languageState, setLanguageState] = useState<LanguageRequest>({
    key: '',
    language: '',
    dictionary: {},
  })

  const handleChangeState = (newUpdate: Partial<LanguageRequest>) => {
    const newLanguageState = { ...languageState }
    setLanguageState({ ...newLanguageState, ...newUpdate })
  }

  const getDefaultDictionaryResult = useApiCall<DictionaryKey, string>({
    callApi: () =>
      getDefaultDictionary(generateToken({ userId: cookies.userId, deviceId: cookies.deviceId })),
    handleSuccess(message, data) {
      toast.success(message)
      handleChangeState({ dictionary: data })
    },
    handleError(message) {
      toast.error(message)
    },
  })

  const createResult = useApiCall<LanguageRequest, Record<keyof LanguageRequest, string>>({
    callApi: () =>
      addNewLanguage(
        generateToken({ userId: cookies.userId, deviceId: cookies.deviceId }),
        languageState
      ),
    handleSuccess(message) {
      toast.success(message)
      router.push('/language/management')
    },
    handleError(message) {
      toast.error(message)
    },
  })

  useEffect(() => {
    getDefaultDictionaryResult.setLetCall(true)
  }, [])

  return (
    <div style={{ marginTop: 18, marginBottom: 80 }}>
      <Text h2 showIn="sm">
        Create Permission
      </Text>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        <Text h1 hideIn="sm">
          Create Permission
        </Text>
        <div
          style={{
            display: 'flex',
            gap: 10,
          }}
        >
          <Button
            color="success"
            onClick={() => {
              createResult.setLetCall(true)
            }}
            size="sm"
            disabled={createResult.loading || getDefaultDictionaryResult.loading}
          >
            {createResult.loading ? <Loading /> : <>Save</>}
          </Button>
          <Button
            color="warning"
            onClick={() => {
              router.push('/permission/management')
            }}
            size="sm"
            disabled={createResult.loading}
          >
            Cancel
          </Button>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${breakPoint === 1 ? 1 : 2}, minmax(0, 1fr))`,
          gap: 16,
          marginBottom: 32,
        }}
      >
        <div style={{ gridColumn: 'span 1 / span 1' }}>
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
        </div>
        <div style={{ gridColumn: 'span 1 / span 1' }}>
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
        </div>
      </div>

      <LanguageTable language={languageState} handleChangeState={handleChangeState} edit />
    </div>
  )
}
