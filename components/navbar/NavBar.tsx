import { Avatar, Dropdown, Navbar, Switch, useTheme } from '@nextui-org/react'
import { useTheme as useNextTheme } from 'next-themes'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { NavBarItems } from './NavBarConstant'
import { RenderItemDesktop } from './RenderItemDesktop'
import { RenderItemMobile } from './RenderItemMobile'

export const NavBar = () => {
  const router = useRouter()

  const { isDark } = useTheme()
  const { setTheme } = useNextTheme()

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
          <Dropdown.Menu variant="light" onAction={(key) => router.push(key.toString())}>
            <Dropdown.Item>Setting</Dropdown.Item>
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Content>
    </Navbar>
  )
}
