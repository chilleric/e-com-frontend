import { NavBarItemType } from '@/types';
import { Navbar, Switch, useTheme } from '@nextui-org/react';
import { useTheme as useNextTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { NavBarItems } from './NavBarConstant';

export const NavBar = () => {
  const router = useRouter();

  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();

  const RenderItem = ({
    item,
    level,
  }: {
    item: NavBarItemType;
    level: number;
  }) => {
    return (
      <>
        <Navbar.CollapseItem
          isActive={router.asPath === item.path}
          activeColor='primary'
          key={item.path}
          css={{ marginLeft: level * 20 }}
        >
          <Link href={item.path}>{item.label}</Link>
        </Navbar.CollapseItem>
        {item &&
          item.children &&
          item.children.length > 0 &&
          item.children.map((itemChild) => (
            <RenderItem level={level + 1} key={item.path} item={itemChild} />
          ))}
      </>
    );
  };

  return (
    <Navbar isBordered variant='sticky'>
      <Navbar.Toggle />
      <Navbar.Collapse>
        {NavBarItems.map((item) => (
          <Fragment key={item.path}>
            <RenderItem level={0} item={item} />
          </Fragment>
        ))}
        <Navbar.CollapseItem>
          Darkmode:
          <Switch
            css={{ marginLeft: 10 }}
            checked={isDark}
            onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
          />
        </Navbar.CollapseItem>
      </Navbar.Collapse>
    </Navbar>
  );
};
