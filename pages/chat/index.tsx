import dynamic from 'next/dynamic'

export const ChatRoom = dynamic(() => import('../../modules/chat'), {
  ssr: false,
})

const ChatPage = () => {
  return <ChatRoom />
}

export default ChatPage
