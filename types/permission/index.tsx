export interface PermissionResponse {
  id: string
  name: string
  featureId: string[]
  userId: string[]
  created: string
  modified: string
  skipAccessability: number
  viewPoints: { [key: string]: string[] }
}

export interface PermissionRequest {
  name: string
  featureId: string[]
  userId: string[]
  skipAccessability: number
  viewPoints: { [key: string]: string[] }
}

export interface PermissionListResponse {
  data: PermissionResponse[]
  page: number
  pageSize: number
  totalRows: number
}

export type PermissionRequestFailure = Record<keyof PermissionRequest, string>
