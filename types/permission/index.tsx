import { FeatureResponse } from '../feature'
import { UserResponseSuccess } from '../user'

export interface PermissionResponse {
  get_id: string
  name: string
  features: FeatureResponse[]
  users: UserResponseSuccess[]
  created: string
  modified: string
  skipAccessability: number
}

export interface PermissionRequest {
  name: string
  featureId: string[]
  userId: string[]
  skipAccessability: number
}

export interface PermissionListResponse {
  data: PermissionResponse[]
  page: number
  pageSize: number
  totalRows: number
}
