<<<<<<< HEAD
import { accessStatus, convertValueToLabel } from '@/lib'
import { ActionType } from '@/types'
import { NextRouter } from 'next/router'
import { AiOutlineEye } from 'react-icons/ai'

export const header = [
=======
import { ActionType, HeaderTableType } from '@/types'
import { NextRouter } from 'next/router'
import { AiOutlineEye } from 'react-icons/ai'

export const headerPermissionTable: HeaderTableType[] = [
>>>>>>> 6e2819a (implement permission management)
  {
    key: 'actions',
    name: '',
  },
  {
<<<<<<< HEAD
    key: 'get_id',
=======
    key: 'id',
>>>>>>> 6e2819a (implement permission management)
    name: 'ID',
  },
  {
    key: 'name',
    name: 'Name',
  },
  {
    key: 'created',
<<<<<<< HEAD
    name: 'Created',
  },
  {
    key: 'modified',
    name: 'Modified',
  },
  {
    key: 'skipAccessability',
    name: 'Skip Access',
  },
]

export const listActions: ActionType[] = [
=======
    name: 'Sign up date',
  },
  {
    key: 'skipAccessability',
    name: 'Skip Accessability',
  },
]

export const permisstionListActions: ActionType[] = [
>>>>>>> 6e2819a (implement permission management)
  {
    content: 'Details',
    icon: <AiOutlineEye size={20} fill="#979797" />,
    func: (id: string, router: NextRouter) => {
<<<<<<< HEAD
      router.push(`/user/${id}`)
    },
  },
]

export const listFunctionParseValue = {
  skipAccessability: (value: number) => {
    return convertValueToLabel(value, accessStatus)
  },
}
=======
      router.push(`/permission/${id}`)
    },
  },
]
>>>>>>> 6e2819a (implement permission management)
