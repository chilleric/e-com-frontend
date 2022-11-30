export interface PermissionResponse {
  id: string
  name: string
  userId: string[]
  created: string
  modified: string
  viewPoints: ViewPointKey
  editable: ViewPointKey
}

export interface PermissionRequest {
  name: string
  userId: string[]
  viewPoints: ViewPointKey
  editable: ViewPointKey
}

export interface PermissionListResponse {
  data: PermissionResponse[]
  page: number
  pageSize: number
  totalRows: number
}

export type PermissionRequestFailure = Record<keyof PermissionRequest, string>

export type ViewPointType = { key: string; label: string }
export type ViewPointKey = { [key: string]: ViewPointType[] }
