import { DEVICE_ID, USER_ID } from '@/constants/auth'
import { useApiCall } from '@/hooks'
import { generateToken } from '@/lib'
import { logout } from '@/services'
import { Avatar, Dropdown, Navbar, Switch, useTheme } from '@nextui-org/react'
import { useTheme as useNextTheme } from 'next-themes'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { useCookies } from 'react-cookie'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { toast } from 'react-toastify'
import { NavBarItems } from './NavBarConstant'
import { RenderItemDesktop } from './RenderItemDesktop'
import { RenderItemMobile } from './RenderItemMobile'

export const NavBar = () => {
  const [cookies, , removeCookie] = useCookies([DEVICE_ID, USER_ID])

  const router = useRouter()

  const { isDark } = useTheme()
  const { setTheme } = useNextTheme()

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

  return (
    <Navbar isBordered variant="sticky" css={{ zIndex: 1000 }}>
      <Navbar.Toggle showIn="xs" />
      <Navbar.Content hideIn="xs" enableCursorHighlight variant="underline">
        {NavBarItems.map((item) => (
          <Fragment key={item.path}>
            <RenderItemDesktop item={item} />
          </Fragment>
        ))}
        <Switch
          checked={!isDark}
          onChange={() => {
            setTheme(isDark ? 'light' : 'dark')
          }}
          iconOn={<MdLightMode />}
          iconOff={<MdDarkMode />}
        />
      </Navbar.Content>
      <Navbar.Collapse showIn="xs">
        {NavBarItems.map((item) => (
          <Fragment key={item.path}>
            <RenderItemMobile level={0} item={item} />
          </Fragment>
        ))}
      </Navbar.Collapse>
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
              <div onClick={() => router.push('/settings')}>Settings</div>
            </Dropdown.Item>
            <Dropdown.Item>
              <div
                onClick={() => {
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
