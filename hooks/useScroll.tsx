import { useEffect, useRef } from 'react'

export const useScroll = <T,>(dep: T): React.MutableRefObject<HTMLDivElement> => {
  const ref = useRef<HTMLDivElement>()
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight
    }
  }, [dep])

  return ref as React.MutableRefObject<HTMLDivElement>
}
