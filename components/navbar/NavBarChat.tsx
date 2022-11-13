import { DEVICE_ID, USER_ID } from '@/constants/auth'
import { useApiCall } from '@/hooks'
import { generateToken } from '@/lib'
import { getOutChatRoom, logout } from '@/services'
import { Avatar, Button, Dropdown, Navbar } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'

export const NavBarChat = () => {
  const [cookies, , removeCookie] = useCookies([DEVICE_ID, USER_ID])
  const router = useRouter()

  const logoutResult = useApiCall({
    callApi: () =>
      logout(
        cookies.deviceId,
        generateToken({ userId: cookies.userId, deviceId: cookies.deviceId })
      ),
    handleError(status, message) {
      if (status) {
        toast.error(message)
      }
    },
    handleSuccess(message) {
      toast.success(message)
      removeCookie('deviceId')
      removeCookie('userId')
      router.push('/login')
    },
  })

  const outChatRoom = useApiCall({
    callApi: () =>
      getOutChatRoom(generateToken({ userId: cookies.userId, deviceId: cookies.deviceId })),
    handleSuccess(message) {
      if (message) {
        router.push('/')
      }
    },
  })

  return (
    <Navbar variant="sticky" css={{ zIndex: 1000 }}>
      <Navbar.Content>
        <Button
          onClick={() => {
            outChatRoom.setLetCall(true)
          }}
        >
          Back to Dashboard
        </Button>
      </Navbar.Content>
      <Navbar.Content>
        <Dropdown isBordered>
          <Dropdown.Trigger>
            <Navbar.Item>
              <Avatar
                bordered
                as="button"
                color="primary"
                size="md"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </Navbar.Item>
          </Dropdown.Trigger>
          <Dropdown.Menu variant="light">
            <Dropdown.Item>
              <div
                onClick={() => {
                  router.push('/settings')
                  outChatRoom.setLetCall(true)
                }}
              >
                Settings
              </div>
            </Dropdown.Item>
            <Dropdown.Item>
              <div
                onClick={() => {
                  outChatRoom.setLetCall(true)
                  logoutResult.setLetCall(true)
                }}
              >
                Sign out
              </div>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Content>
    </Navbar>
  )
}
