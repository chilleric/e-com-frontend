import { useTranslation } from '@/hooks'
import { convertValueToLabel, GenderList, StatusList, StatusListBoolean } from '@/lib'
import { ActionType, HeaderTableType } from '@/types'
import { NextRouter } from 'next/router'
import { AiOutlineEye } from 'react-icons/ai'

export const HeaderUserTable = () => {
  const createLabel = useTranslation('created')
  const firstNameLabel = useTranslation('firstName')
  const dobLabel = useTranslation('dob')
  const genderLabel = useTranslation('gender')
  const phoneLabel = useTranslation('phone')
  const emailLabel = useTranslation('email')
  const verifyStatus = useTranslation('verifyStatus')
  const activeStatus = useTranslation('activeStatus')

  return [
    {
      key: 'actions',
      name: '',
    },
    {
      key: 'gender',
      name: genderLabel,
    },
    {
      key: 'dob',
      name: dobLabel,
    },
    {
      key: 'firstName',
      name: firstNameLabel,
    },
    {
      key: 'email',
      name: emailLabel,
    },
    {
      key: 'phone',
      name: phoneLabel,
    },
    {
      key: 'created',
      name: createLabel,
    },
    {
      key: 'verified',
      name: verifyStatus,
    },
    {
      key: 'deleted',
      name: activeStatus,
    },
  ] as HeaderTableType[]
}

export const ListActions = () => {
  const detail = useTranslation('detail')

  return [
    {
      content: detail,
      icon: <AiOutlineEye size={20} fill="#979797" />,
      func: (id: string, router: NextRouter) => {
        router.push(`/user/${id}`)
      },
    },
  ] as ActionType[]
}

export const listFunctionParseValue = () => {
  const statusList = StatusList()

  const genderList = GenderList()

  const statusListBoolean = StatusListBoolean()

  return {
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
}
