import { NavBarItemType } from '@/types';

export const NavBarItems: NavBarItemType[] = [
  {
    label: 'Dashboard',
    path: '/',
  },
  {
    label: 'Settings',
    path: '/settings',
    children: [
      {
        label: 'Account',
        path: '/settings/account',
      },
      {
        label: 'System',
        path: '/settings/system',
      },
    ],
  },
];
