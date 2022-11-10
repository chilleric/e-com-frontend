import { useResponsive } from '@/hooks'
import { Avatar, useTheme } from '@nextui-org/react'
import { useState } from 'react'

interface IChatUserList {
  userChooseId: string
  setUserChoose: Function
}

export const ChatUserList = ({ userChooseId, setUserChoose }: IChatUserList) => {
  const breakPoint = useResponsive()

  const { theme } = useTheme()

  const [hoverItem, setHover] = useState('')

  // const event = useEventSource<string[]>({
  //   eventUrl: '/message/online-users',
  //   eventName: 'get-online-users-event',
  // })

  const userList = [
    { id: '1', name: 'John', avt: '' },
    { id: '2', name: 'Tu Nguyen Van', avt: '' },
    { id: '3', name: 'Mark', avt: '' },
    { id: '4', name: 'Mark', avt: '' },
    { id: '5', name: 'Mark', avt: '' },
    { id: '6', name: 'Mark', avt: '' },
    { id: '7', name: 'Mark', avt: '' },
    { id: '8', name: 'Mark', avt: '' },
    { id: '9', name: 'Mark', avt: '' },
  ]

  const getBackGroundColor = (id: string) => {
    if (userChooseId === id) return theme?.colors.blue500.value
    if (id === hoverItem) return theme?.colors.accents1.value
    return ''
  }

  return (
    <div
      style={{
        width: breakPoint === 1 ? '100% ' : '500px',
        minWidth: 375,
        borderRight: breakPoint !== 1 ? '2px solid' : '',
        borderColor: theme?.colors.accents3.value,
        paddingRight: 10,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        className={`${breakPoint === 1 ? 'hide-scrollbar' : 'custom-scroolbar'}`}
        style={{
          width: '100%',
          display: 'flex',
          gap: 20,
          overflowX: 'scroll',
          marginBottom: 10,
          height: 180,
        }}
      >
        {userList.map((user) => {
          return (
            <div
              key={user.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
                alignItems: 'center',
                justifyContent: 'start',
              }}
              onClick={() => {
                setUserChoose(user)
              }}
            >
              <div style={{ position: 'relative' }}>
                <Avatar
                  bordered
                  as="button"
                  color="primary"
                  css={{ size: breakPoint === 1 ? 50 : 100 }}
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
                <div
                  style={{
                    position: 'absolute',
                    borderRadius: '100%',
                    backgroundColor: 'green',
                    width: 10,
                    height: 10,
                    bottom: 5,
                    right: 5,
                    zIndex: 100,
                    border: '2px solid white',
                  }}
                />
              </div>
              <div style={{ width: 100, textAlign: 'center' }}>{user.name}</div>
            </div>
          )
        })}
      </div>
      <div
        className="hide-scrollbar"
        style={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
          height: 'calc(100%-180px)',
        }}
      >
        {userList.map((user) => {
          return (
            <div
              onMouseEnter={() => {
                setHover(user.id)
              }}
              onMouseLeave={() => {
                setHover('')
              }}
              onClick={() => {
                setUserChoose(user)
              }}
              key={user.id}
              style={{
                display: 'flex',
                gap: 20,
                alignItems: 'center',
                cursor: 'pointer',
                backgroundColor: getBackGroundColor(user.id),
                padding: '10px 0',
              }}
            >
              <div style={{ position: 'relative' }}>
                <Avatar
                  bordered
                  as="button"
                  color="primary"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  css={{ size: breakPoint === 1 ? 50 : 100 }}
                />
                <div
                  style={{
                    position: 'absolute',
                    borderRadius: '100%',
                    backgroundColor: 'green',
                    width: 10,
                    height: 10,
                    bottom: 5,
                    right: 5,
                    zIndex: 100,
                    border: '2px solid white',
                  }}
                />
              </div>

              <div>{user.name}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
