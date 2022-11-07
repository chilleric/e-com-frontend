import { NavBarItemType } from '@/types'
import { Dropdown, Navbar } from '@nextui-org/react'
import { useRouter } from 'next/router'

export const RenderItemDesktop = ({ item }: { item: NavBarItemType }) => {
  const router = useRouter()

  return (
    <>
      {item && item.children && item.children.length > 0 ? (
        <Dropdown isBordered>
          <Navbar.Item isActive={router.asPath.includes(item.path)}>
            <Dropdown.Button
              ripple={false}
              auto
              light
              css={{
                px: 0,
                dflex: 'center',
                svg: { pe: 'none' },
              }}
            >
              {item.label}
            </Dropdown.Button>
          </Navbar.Item>
          <Dropdown.Menu variant="light" onAction={(key) => router.push(key.toString())}>
            {item.children.map((itemChild) => (
              <Dropdown.Item key={itemChild.path}>{itemChild.label}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Navbar.Item isActive={router.asPath === item.path} activeColor="primary" key={item.path}>
          <div style={{ cursor: 'pointer' }} onClick={() => router.push(item.path)}>
            {item.label}
          </div>
        </Navbar.Item>
      )}
    </>
  )
}
