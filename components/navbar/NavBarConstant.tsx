import { NavBarItemType } from '@/types'

export const NavBarItems: NavBarItemType[] = [
  {
    label: 'Dashboard',
    path: '/',
  },
  {
    label: 'User',
    path: '/user',
    children: [
      { label: 'User Management', path: '/user/management' },
      { label: 'Create User', path: '/user/create' },
    ],
  },
  {
    label: 'Permission',
    path: '/permission',
    children: [
      { label: 'Permission Management', path: '/permission/management' },
      { label: 'Create Permission', path: '/permission/create' },
    ],
  },
  {
    label: 'Language',
    path: '/language',
    children: [{ label: 'Language Management', path: '/language/management' }],
  },
]
