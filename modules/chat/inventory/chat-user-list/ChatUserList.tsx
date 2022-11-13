import { apiRoute } from '@/constants/apiRoutes'
import { DEVICE_ID, USER_ID } from '@/constants/auth'
import { useApiCall, useEventSource, useResponsive } from '@/hooks'
import { generateToken } from '@/lib'
import { getChatRoom } from '@/services'
import { ChatRoom, UserOnlineResponse } from '@/types'
import { Loading, useTheme } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { OneUser } from './OneUser'
import { SlideBar } from './SlideBar'

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
      {event.evtData && <SlideBar userList={event.evtData} />}
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
                <OneUser
                  user={{ id: user.receiveId, name: user.receiverName }}
                  isOnline={!!event?.evtData?.find((item) => item.id === user.receiveId)}
                />
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
