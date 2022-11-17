import { ShareStoreSelector } from '@/redux/share-store'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

export const useTranslation = (key: string) => {
  const { language } = useSelector(ShareStoreSelector)

  const result = useMemo(() => {
    if (language[key]) return language[key]
    return `Error translation: ${key}!`
  }, [key, language])

  return result
}

export const useTranslationFunction = () => {
  const { language } = useSelector(ShareStoreSelector)

  const getTranslate = (key: string) => {
    if (language[key]) return language[key]
    return `Error translation: ${key}!`
  }

  return getTranslate
}
