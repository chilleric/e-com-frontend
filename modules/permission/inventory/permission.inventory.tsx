import { HeaderTableType, PermissionRequest, PermissionResponse } from '@/types'
import { InputProps } from '@nextui-org/react'

export const headerFeatureTable: HeaderTableType[] = [
  {
    key: 'actions',
    name: '',
  },
  {
    key: 'id',
    name: 'ID',
  },
  {
    key: 'name',
    name: 'Name',
  },
  {
    key: 'path',
    name: 'Path',
  },
  {
    key: 'deleted',
    name: 'Delete status',
  },
]

export const PermissionRequestDefault: PermissionRequest = {
  name: '',
  skipAccessability: 0,
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
