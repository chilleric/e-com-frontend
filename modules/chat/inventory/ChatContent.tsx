import { Input, useTheme } from '@nextui-org/react'
import { useRef } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'

interface IChatContent {
  user: { id: string; name: string; avt: string }
  setUserChoose: Function
}

export const ChatContent = ({ setUserChoose, user }: IChatContent) => {
  const { theme } = useTheme()

  const InputRef = useRef<HTMLInputElement>(null)

  if (!user.id) return null

  const listChat = [
    { id: 1, title: 'abcaskhjk' },
    { id: 2, title: 'abcaskhjk' },
    { id: 1, title: 'abcaskhjk' },
    { id: 1, title: 'abcaskhjk' },
    { id: 2, title: 'abcaskhjk' },
    { id: 2, title: 'abcaskhjk' },
    { id: 2, title: 'abcaskhjk' },
    { id: 2, title: 'abcaskhjk' },
    { id: 1, title: 'abcaskhjk' },
    { id: 1, title: 'abcaskhjk' },
    { id: 1, title: 'abcaskhjk' },
    { id: 1, title: 'abcaskhjk' },
    { id: 1, title: 'abcaskhjk' },
    { id: 1, title: 'abcaskhjk' },
    { id: 1, title: 'abcaskhjk' },
    { id: 1, title: 'abcaskhjk' },
    { id: 1, title: 'abcaskhjk' },
    { id: 1, title: 'abcaskhjk' },
    { id: 1, title: 'abcaskhjk' },
    { id: 1, title: 'abcaskhjk' },
    { id: 1, title: 'abcaskhjk' },
    { id: 1, title: 'abcaskhjk' },
    { id: 1, title: 'abcaskhjk' },
    { id: 1, title: 'abcaskhjk' },
    { id: 1, title: 'abcaskhjk' },
    { id: 1, title: 'abcaskhjk' },
    { id: 1, title: 'abcaskhjk' },
  ]

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          borderBottom: '1px solid',
          borderColor: theme?.colors.accents1.value,
          paddingLeft: 20,
          height: 100,
        }}
      >
        <AiOutlineArrowLeft
          onClick={() => {
            setUserChoose({ id: '', name: '', avt: '' })
          }}
          style={{ fontSize: 30, color: theme?.colors.blue500.value, fontWeight: 700 }}
        />
        <div style={{ fontSize: 30 }}>{user.name}</div>
      </div>
      <div
        className="hide-scrollbar"
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          height: '90vh',
          overflow: 'auto',
        }}
      >
        {listChat.map((chat, index) => {
          return (
            <div
              key={index}
              style={{ display: 'flex', justifyContent: chat.id === 1 ? 'right' : 'left' }}
            >
              <div
                style={{
                  maxWidth: 'max-content',
                  marginLeft: 20,
                  padding: '10px 20px',
                  borderRadius: 20,
                  backgroundColor:
                    chat.id === 1 ? theme?.colors.accents5.value : theme?.colors.blue500.value,
                  fontSize: 20,
                }}
              >
                {chat.title}
              </div>
            </div>
          )
        })}
      </div>
      <Input
        css={{ fontSize: 20, width: '100%', padding: 5 }}
        placeholder="write a message..."
        ref={InputRef}
      />
    </div>
  )
}
