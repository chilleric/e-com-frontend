import { DefaultLayout } from '@/components'
import dynamic from 'next/dynamic'

export const ChatRoom = dynamic(() => import('../../modules/chat'), {
  ssr: false,
})

const ChatPage = () => {
  return (
    <DefaultLayout>
      <ChatRoom />
    </DefaultLayout>
  )
}

export default ChatPage
