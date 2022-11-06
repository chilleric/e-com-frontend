import { convertValueToLabel, genderList, statusList, statusListBoolean } from '@/lib'
import { ActionType, HeaderTableType } from '@/types'
import { NextRouter } from 'next/router'
import { AiOutlineEye } from 'react-icons/ai'

export const headerUserTable: HeaderTableType[] = [
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
    key: 'created',
    name: 'Sign up date',
  },
  {
    key: 'verified',
    name: 'Verify status',
  },
  {
    key: 'deleted',
    name: 'Active status',
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
  gender: (value: number) => {
    return convertValueToLabel(value, genderList)
  },
  verified: (value: boolean) => {
    return convertValueToLabel(value, statusListBoolean)
  },
  deleted: (value: number) => {
    return convertValueToLabel(value, statusList)
  },
}
