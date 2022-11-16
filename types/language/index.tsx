export interface DictionaryKey {
  [key: string]: string
}

export interface LanguageResponseSuccess {
  id: string
  language: string
  key: string
  dictionary: DictionaryKey
}

export interface LanguageListResponseSuccess {
  data: LanguageResponseSuccess[]
  page: 0
  pageSize: 0
  totalRows: 0
}

export interface LanguageRequest {
  language: string
  key: string
  dictionary: DictionaryKey
}

export interface AddNewLanguageRequest {
  language: string
  key: string
}
