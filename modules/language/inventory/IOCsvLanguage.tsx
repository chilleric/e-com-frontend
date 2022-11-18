import { DEVICE_ID, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslationFunction } from '@/hooks'
import { generateToken } from '@/lib'
import { ShareStoreSelector } from '@/redux/share-store'
import { updateDictionaryList } from '@/services'
import { DictionaryKey, LanguageResponseSuccess, UpdateDictionaryListRequest } from '@/types'
import { Button, Modal, Text } from '@nextui-org/react'
import { ChangeEvent, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export const IOCsvLanguage = ({
  viewLanguageResult,
  setLetCall,
}: {
  viewLanguageResult: LanguageResponseSuccess[]
  setLetCall: Function
}) => {
  const [cookies] = useCookies([DEVICE_ID, USER_ID])
  const { language } = useSelector(ShareStoreSelector)
  const translate = useTranslationFunction()
  const [open, setOpen] = useState(false)
  const [stateLanguage, setStateLanguage] = useState<UpdateDictionaryListRequest>([])

  const data = useApiCall<string, string>({
    callApi: () =>
      updateDictionaryList(
        generateToken({ userId: cookies.userId, deviceId: cookies.deviceId }),
        stateLanguage
      ),
    handleSuccess(message) {
      toast.success(translate(message))
      setLetCall(true)
    },
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
  })

  const headers = ['key'].concat(viewLanguageResult.map((language) => language.id) ?? [])
  const rows = Object.keys(language).map((key) => {
    return [key].concat(viewLanguageResult.map((language) => language.dictionary[key]) ?? [])
  })
  const csvContent = 'data:text/csv;charset=utf-8,'.concat(
    [headers]
      .concat(rows)
      .map((e) => e.join(','))
      .join('\n')
  )
  const encodedUri = encodeURI(csvContent)

  const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files?.length) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const text = (event?.target?.result ?? '').toString()
        const headers = text.slice(0, text.indexOf('\n')).split(',')
        const rows = text.slice(text.indexOf('\n') + 1).split('\n')

        const newUpdate = headers.slice(1, headers.length).map((header, index) => {
          let dictionary: DictionaryKey = {}

          rows.forEach((row) => {
            const value = row.split(',')
            dictionary = { ...dictionary, [value[0]]: value[index + 1] }
          }, {})

          return { id: header, dictionary }
        })

        setStateLanguage(newUpdate)
        setOpen(true)
      }
      reader.readAsText(e.target.files[0])
    }
  }

  return (
    <>
      <div style={{ position: 'relative', width: 150 }}>
        <input
          style={{ opacity: '0', width: '100%', zIndex: 1, position: 'fixed' }}
          type="file"
          id="csvFile"
          accept=".csv"
          onChange={handleUploadFile}
        />
        <Button
          size="sm"
          css={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, zIndex: 0 }}
        >
          Nhập file
        </Button>
      </div>
      <a href={encodedUri} download="language">
        <Button size="sm">Xuất File CSV</Button>
      </a>

      <Modal open={open} preventClose blur>
        <Modal.Header>
          <Text h2 id="modal-title">
            Import CSV File
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text h4>Việc này sẽ ghi đè toàn bộ dữ liệu!</Text>
        </Modal.Body>
        <Modal.Footer justify="center">
          <Button
            auto
            flat
            onClick={() => {
              setOpen(false)
            }}
          >
            Cancel
          </Button>
          <Button
            auto
            flat
            onClick={() => {
              setOpen(false)
              data.setLetCall(true)
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
