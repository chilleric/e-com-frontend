import { apiRoute } from '@/constants/apiRoutes'
import { DEVICE_ID, USER_ID } from '@/constants/auth'
import { useApiCall, useEventSource, useResponsive } from '@/hooks'
import { generateToken } from '@/lib'
import { getChatRoom } from '@/services'
import { ChatRoom, UserOnlineResponse } from '@/types'
import { Avatar, Loading, useTheme } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

interface IChatUserList {
  userChooseId: string
  setUserChoose: Function
}

export const ChatUserList = ({ userChooseId, setUserChoose }: IChatUserList) => {
  const breakPoint = useResponsive()

  const [cookies] = useCookies([DEVICE_ID, USER_ID])

  const { theme } = useTheme()

  const [hoverItem, setHover] = useState('')

  const event = useEventSource<UserOnlineResponse[]>({
    eventUrl: apiRoute.message.onlineUser,
    eventName: 'get-online-users-event',
    token: generateToken({ userId: cookies.userId, deviceId: cookies.deviceId }),
  })

  const getChatRooms = useApiCall<ChatRoom[], string>({
    callApi: () =>
      getChatRoom(1, generateToken({ userId: cookies.userId, deviceId: cookies.deviceId })),
  })

  const getBackGroundColor = (id: string) => {
    if (userChooseId === id) return theme?.colors.blue500.value
    if (id === hoverItem) return theme?.colors.accents1.value
    return ''
  }

  useEffect(() => {
    getChatRooms.setLetCall(true)
  }, [])

  return (
    <div
      style={{
        width: breakPoint === 1 ? '100% ' : 375,
        minWidth: 375,
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
          height: breakPoint === 1 ? 100 : 150,
        }}
      >
        {event.evtData &&
          event.evtData
            .filter((user) => user.id !== cookies.userId)
            .map((user) => {
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
                      css={{ size: breakPoint === 1 ? 50 : 80 }}
                      src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    />
                    <div
                      style={{
                        position: 'absolute',
                        borderRadius: '100%',
                        backgroundColor: 'green',
                        width: 15,
                        height: 15,
                        bottom: 5,
                        right: 5,
                        zIndex: 100,
                        border: '2px solid white',
                      }}
                    />
                  </div>
                  <div
                    className="line-clamp-2"
                    style={{
                      width: 100,
                      textAlign: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    {user.name}
                  </div>
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
          height: `calc(100% - ${breakPoint === 1 ? '100px' : '150px'})`,
        }}
      >
        {getChatRooms.loading ? (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Loading />
          </div>
        ) : (
          getChatRooms.data &&
          getChatRooms.data?.result.map((user) => {
            return (
              <div
                onMouseEnter={() => {
                  setHover(user.receiveId)
                }}
                onMouseLeave={() => {
                  setHover('')
                }}
                onClick={() => {
                  setUserChoose({ id: user.receiveId, name: user.receiverName, avt: '' })
                }}
                key={user.receiveId}
                style={{
                  display: 'flex',
                  gap: 20,
                  alignItems: 'center',
                  cursor: 'pointer',
                  backgroundColor: getBackGroundColor(user.receiveId),
                  padding: '10px 10px',
                  borderRadius: '12px',
                }}
              >
                <div style={{ position: 'relative' }}>
                  <Avatar
                    bordered
                    as="button"
                    color="primary"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    css={{ size: breakPoint === 1 ? 50 : 80 }}
                  />
                  {event.evtData && event.evtData.find((item) => item.id === user.receiveId) && (
                    <div
                      style={{
                        position: 'absolute',
                        borderRadius: '100%',
                        backgroundColor: 'green',
                        width: 15,
                        height: 15,
                        bottom: 5,
                        right: 5,
                        zIndex: 100,
                        border: '2px solid white',
                      }}
                    />
                  )}
                </div>

                <div>{user.receiverName}</div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
