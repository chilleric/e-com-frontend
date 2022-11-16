import { useTranslation } from '@/hooks'
import { DictionaryKey } from '@/types'
import { Input } from '@nextui-org/react'
import { DeleteDictionaryPopup } from './DeleteDictionaryPopup'
import { inputStylesLanguage } from './Language.inventory'

interface ILanguageTable {
  dictionaryList: DictionaryKey
  edit?: boolean
  handleChangeState: Function
  setLetCallList: Function
}

export const LanguageTable = ({
  dictionaryList,
  edit,
  handleChangeState,
  setLetCallList,
}: ILanguageTable) => {
  const labelKey = useTranslation('labelKey')
  const labelDict = useTranslation('labelDict')

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(min-content, 1fr))',
      }}
    >
      <div style={{ gridColumn: 'span 1 / span 1' }}>{labelKey}</div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>{labelDict}</div>
      <hr style={{ gridColumn: 'span 2 / span 2', margin: '10px 0px' }} />
      {Object.keys(dictionaryList).map((dictionaryKey) => {
        if (edit)
          return (
            <>
              <div
                style={{
                  gridColumn: 'span 1 / span 1',
                  display: 'flex',
                  gap: 5,
                  alignItems: 'center',
                }}
              >
                <Input
                  css={{ width: '100%' }}
                  value={dictionaryKey}
                  readOnly
                  {...inputStylesLanguage({})}
                />
                <DeleteDictionaryPopup
                  dictionaryKey={dictionaryKey}
                  setLetCallList={setLetCallList}
                />
              </div>
              <div style={{ gridColumn: 'span 1 / span 1' }}>
                <Input
                  css={{ width: '100%' }}
                  value={dictionaryList[dictionaryKey]}
                  onChange={(event) => {
                    handleChangeState({
                      ...dictionaryList,
                      [dictionaryKey]: event.currentTarget.value,
                    })
                  }}
                  {...inputStylesLanguage({})}
                />
              </div>
            </>
          )
        return (
          <>
            <div
              style={{
                gridColumn: 'span 1 / span 1',
                display: 'flex',
                gap: 5,
                alignItems: 'center',
              }}
            >
              <span>{dictionaryKey}</span>
              <DeleteDictionaryPopup
                dictionaryKey={dictionaryKey}
                setLetCallList={setLetCallList}
              />
            </div>
            <div style={{ gridColumn: 'span 1 / span 1' }}>{dictionaryList[dictionaryKey]}</div>
          </>
        )
      })}
    </div>
  )
}
