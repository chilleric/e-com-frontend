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
    label: 'Deactive',
  },
]

export const formatDate = 'yyyy-MM-dd'
