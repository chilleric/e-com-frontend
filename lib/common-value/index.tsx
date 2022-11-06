import { OptionsType } from '@/types'

export const genderList: OptionsType<number>[] = [
  {
    value: 0,
    label: 'Male',
  },
  {
    value: 1,
    label: 'Female',
  },
]

export const statusList: OptionsType<number>[] = [
  {
    value: 0,
    label: 'Active',
  },
  {
    value: 1,
    label: 'Deactivated',
  },
]

export const statusListBoolean: OptionsType<boolean>[] = [
  {
    value: true,
    label: 'Active',
  },
  {
    value: false,
    label: 'Deactivated',
  },
]

export const accessStatus: OptionsType<number>[] = [
  {
    value: 0,
    label: 'Access',
  },
  {
    value: 1,
    label: 'Denied',
  },
]

export const formatDate = 'yyyy-MM-dd'
