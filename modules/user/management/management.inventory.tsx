import { ActionType, HeaderTableType } from '@/types'
import { NextRouter } from 'next/router'
import { AiOutlineEdit, AiOutlineEye } from 'react-icons/ai'

export const header: HeaderTableType[] = [
  {
    key: 'actions',
    name: '',
  },
  {
    key: 'id',
    name: 'ID',
  },
  {
    key: 'gender',
    name: 'Gender',
  },
  {
    key: 'dob',
    name: 'Date of birth',
  },
  {
    key: 'firstName',
    name: 'First name',
  },
  {
    key: 'email',
    name: 'Email',
  },
  {
    key: 'phone',
    name: 'Phone',
  },
  {
    key: 'create',
    name: 'Sign up date',
  },
  {
    key: 'verify',
    name: 'Verify status',
  },
  {
    key: 'verify2FA',
    name: 'Two factor verify status',
  },
  {
    key: 'deleted',
    name: 'Delete status',
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
