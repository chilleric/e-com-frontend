import { useTranslation } from '@/hooks'
import { AccessStatus, convertValueToLabel } from '@/lib'
import { ActionType } from '@/types'
import { NextRouter } from 'next/router'
import { AiOutlineEye } from 'react-icons/ai'

export const Header = () => {
  const name = useTranslation('permissionName')
  const created = useTranslation('created')
  const modified = useTranslation('modified')
  const skipAccessability = useTranslation('skipAccessability')

  return [
    {
      key: 'actions',
      name: '',
    },
    {
      key: 'name',
      name,
    },
    {
      key: 'created',
      name: created,
    },
    {
      key: 'modified',
      name: modified,
    },
    {
      key: 'skipAccessability',
      name: skipAccessability,
    },
  ]
}

export const ListActions = () => {
  const detail = useTranslation('detail')

  return [
    {
      content: detail,
      icon: <AiOutlineEye size={20} fill="#979797" />,
      func: (id: string, router: NextRouter) => {
        router.push(`/permission/${id}`)
      },
    },
  ] as ActionType[]
}

export const listFunctionParseValue = () => {
  const accessStatus = AccessStatus()

  return {
    skipAccessability: (value: number) => {
      return convertValueToLabel(value, accessStatus)
    },
  }
}
