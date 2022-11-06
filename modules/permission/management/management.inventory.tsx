import { accessStatus, convertValueToLabel } from '@/lib'
import { ActionType } from '@/types'
import { NextRouter } from 'next/router'
import { AiOutlineEye } from 'react-icons/ai'

export const header = [
  {
    key: 'actions',
    name: '',
  },
  {
    key: 'get_id',
    name: 'ID',
  },
  {
    key: 'name',
    name: 'Name',
  },
  {
    key: 'created',
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
  {
    content: 'Details',
    icon: <AiOutlineEye size={20} fill="#979797" />,
    func: (id: string, router: NextRouter) => {
      router.push(`/user/${id}`)
    },
  },
]

export const listFunctionParseValue = {
  skipAccessability: (value: number) => {
    return convertValueToLabel(value, accessStatus)
  },
}
