import { NavBarItemType } from '@/types'
import { Navbar } from '@nextui-org/react'
import { useRouter } from 'next/router'

export const RenderItemMobile = ({ item, level }: { item: NavBarItemType; level: number }) => {
  const router = useRouter()

  return (
    <>
      <Navbar.CollapseItem
        isActive={router.asPath === item.path}
        activeColor="primary"
        key={item.path}
        css={{ marginLeft: level * 20 }}
      >
        <div style={{ cursor: 'pointer' }} onClick={() => router.push(item.path)}>
          {item.label}
        </div>
      </Navbar.CollapseItem>
      {item &&
        item.children &&
        item.children.length > 0 &&
        item.children.map((itemChild) => (
          <RenderItemMobile level={level + 1} key={item.path} item={itemChild} />
        ))}
    </>
  )
}
