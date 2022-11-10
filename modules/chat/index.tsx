import { useResponsive } from '@/hooks'
import { useState } from 'react'
import { ChatContent, ChatUserList } from './inventory'

export default function ChatRoom() {
  const breakPoint = useResponsive()

  const [userChoose, setUserChoose] = useState({ id: '', name: '', avt: '' })

  return (
    <div style={{ padding: breakPoint !== 1 ? 40 : 10, height: '100vh', display: 'flex' }}>
      {breakPoint !== 1 || !userChoose.id ? (
        <ChatUserList userChooseId={userChoose?.id} setUserChoose={setUserChoose} />
      ) : null}
      {breakPoint !== 1 || userChoose.id ? (
        <ChatContent user={userChoose} setUserChoose={setUserChoose} />
      ) : null}
    </div>
  )
}
