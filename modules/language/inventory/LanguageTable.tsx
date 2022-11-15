import { LanguageRequest } from '@/types'
import { Input } from '@nextui-org/react'
import { inputStylesLanguage } from './Language.inventory'

interface ILanguageTable {
  language: LanguageRequest
  edit?: boolean
  handleChangeState: Function
}

export const LanguageTable = ({ language, edit, handleChangeState }: ILanguageTable) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(min-content, 1fr))',
      }}
    >
      <div style={{ gridColumn: 'span 1 / span 1' }}>key</div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>dictionary</div>
      <hr style={{ gridColumn: 'span 2 / span 2', margin: '10px 0px' }} />
      {Object.keys(language.dictionary).map((dictionaryKey) => {
        if (edit)
          return (
            <>
              <div style={{ gridColumn: 'span 1 / span 1' }}>
                <Input
                  css={{ width: '100%' }}
                  value={dictionaryKey}
                  onChange={(event) => {
                    const dictionary = {
                      ...language.dictionary,
                      [event.currentTarget.value]: language.dictionary[dictionaryKey],
                    }
                    delete dictionary[dictionaryKey]
                    handleChangeState({
                      dictionary,
                    })
                  }}
                  {...inputStylesLanguage({})}
                />
              </div>
              <div style={{ gridColumn: 'span 1 / span 1' }}>
                <Input
                  css={{ width: '100%' }}
                  value={language.dictionary[dictionaryKey]}
                  onChange={(event) => {
                    handleChangeState({
                      dictionary: {
                        ...language.dictionary,
                        [dictionaryKey]: event.currentTarget.value,
                      },
                    })
                  }}
                  {...inputStylesLanguage({})}
                />
              </div>
            </>
          )
        return (
          <>
            <div style={{ gridColumn: 'span 1 / span 1' }}>{dictionaryKey}</div>
            <div style={{ gridColumn: 'span 1 / span 1' }}>
              {language.dictionary[dictionaryKey]}
            </div>
          </>
        )
      })}
    </div>
  )
}
