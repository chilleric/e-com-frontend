import { useTranslation } from '@/hooks'
import { convertValueToLabel, StatusList } from '@/lib'
import { HeaderTableType, PermissionRequest, PermissionResponse } from '@/types'
import { InputProps } from '@nextui-org/react'

export const HeaderFeatureTable = () => {
  const path = useTranslation('path')
  const activeStatus = useTranslation('activeStatus')
  const nameFeature = useTranslation('nameFeature')

  return [
    {
      key: 'actions',
      name: '',
    },
    {
      key: 'name',
      name: nameFeature,
    },
    {
      key: 'path',
      name: path,
    },
    {
      key: 'deleted',
      name: activeStatus,
    },
  ] as HeaderTableType[]
}

export const listFunctionParseValue = () => {
  const statusList = StatusList()

  return {
    deleted: (value: number) => {
      return convertValueToLabel(value, statusList)
    },
  }
}

export const PermissionRequestDefault: PermissionRequest = {
  name: '',
  skipAccessability: 1,
  featureId: [],
  userId: [],
}

export const inputStylesPermission = ({ error }: { error?: string }) => {
  const initialValue: Partial<InputProps> = {
    status: error ? 'error' : 'default',
    helperText: error || '',
    underlined: true,
  }

  return {
    ...initialValue,
  }
}

export const PermissionResponseDefault: PermissionResponse = {
  id: '',
  name: '',
  featureId: [],
  userId: [],
  created: '',
  modified: '',
  skipAccessability: 0,
}
