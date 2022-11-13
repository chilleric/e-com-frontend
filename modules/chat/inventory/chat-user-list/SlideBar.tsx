import { useResponsive } from '@/hooks'
import { UserOnlineResponse } from '@/types'
import { useRef, useState } from 'react'
import { AiOutlineLeftCircle, AiOutlineRightCircle } from 'react-icons/ai'
import { OneUser } from './OneUser'

interface ISlideBar {
  userList: UserOnlineResponse[]
}

export const SlideBar = ({ userList }: ISlideBar) => {
  const breakPoint = useResponsive()
  const [index, setIndex] = useState(0)
  const refAvatar = useRef<HTMLDivElement>(null)

  const getTranslate = () => {
    if (refAvatar?.current?.offsetWidth) {
      return -index * refAvatar.current.offsetWidth
    }
    return 0
  }

  return (
    <div
      className="hide-scrollbar"
      style={{
        width: '100%',
        overflowX: 'scroll',
        position: 'relative',
      }}
    >
      {breakPoint > 1 ? (
        <div
          onClick={() => {
            if (index > 0) {
              setIndex((prev) => prev - 2)
            }
          }}
          style={{
            position: 'absolute',
            left: 0,
            bottom: '50%',
            transform: 'translateY(50%)',
            borderRadius: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '30px',
            zIndex: 101,
            cursor: index > 0 ? 'pointer' : 'default',
            opacity: index > 0 ? 1 : 0.5,
          }}
        >
          <AiOutlineLeftCircle />
        </div>
      ) : null}
      <div
        style={{
          transform: `translateX(${getTranslate()}px)`,
          display: 'flex',
          gap: 20,
          marginBottom: 10,
          height: breakPoint === 1 ? 100 : 150,
        }}
      >
        {userList.map((user) => {
          return (
            <div
              ref={refAvatar}
              key={user.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
                alignItems: 'center',
                justifyContent: 'start',
              }}
              onClick={() => {
                //   setUserChoose(user)
              }}
            >
              <OneUser user={user} isOnline />
            </div>
          )
        })}
      </div>
      {breakPoint > 1 ? (
        <div
          onClick={() => {
            if (index < userList.length - 2) {
              setIndex((prev) => prev + 2)
            }
          }}
          style={{
            position: 'absolute',
            right: 0,
            bottom: '50%',
            transform: 'translateY(50%)',
            borderRadius: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '30px',
            zIndex: 101,
            cursor: index < userList.length - 2 ? 'pointer' : 'default',
            opacity: index < userList.length - 2 ? 1 : 0.5,
          }}
        >
          <AiOutlineRightCircle />
        </div>
      ) : null}
    </div>
  )
}
