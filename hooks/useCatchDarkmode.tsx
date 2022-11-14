import { useEffect, useState } from 'react'

export const useGetDarkMode = () => {
  const [isDarkMode, setIdDarkMode] = useState<boolean>(false)

  useEffect(() => {
    const getDarkMode = () => {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setIdDarkMode(true)
      } else {
        setIdDarkMode(false)
      }
    }

    getDarkMode()

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', getDarkMode)

    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', getDarkMode)
    }
  }, [])

  return isDarkMode
}
