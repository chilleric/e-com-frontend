import { ChatLayout } from '@/components/layout/ChatLayout'
import { DEVICE_ID, USER_ID } from '@/constants/auth'
import { useApiCall } from '@/hooks'
import { generateToken } from '@/lib'
import { getInChatRoom } from '@/services'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'

export const ChatRoom = dynamic(() => import('../../modules/chat'), {
  ssr: false,
})

const ChatPage = () => {
  const [cookies] = useCookies([DEVICE_ID, USER_ID])

  const inChatRoom = useApiCall({
    callApi: () =>
      getInChatRoom(generateToken({ userId: cookies.userId, deviceId: cookies.deviceId })),
  })

  useEffect(() => {
    inChatRoom.setLetCall(true)
  }, [])

  return (
    <ChatLayout>
      <ChatRoom />
    </ChatLayout>
  )
}

export default ChatPage
