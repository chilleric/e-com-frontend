import { useEffect, useState } from 'react'

export const useResponsive = () => {
  const [breakPoint, setBreakPoint] = useState<number>(1)
  useEffect(() => {
    const getWidth = () => {
      if (window.innerWidth <= 960) {
        setBreakPoint(1)
        return
      }
      if (window.innerWidth <= 1280) {
        setBreakPoint(2)
        return
      }
      setBreakPoint(3)
    }

    window.addEventListener('resize', getWidth)

    return () => {
      window.removeEventListener('resize', getWidth)
    }
  }, [])

  return breakPoint
}
