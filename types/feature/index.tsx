export interface FeatureResponse {
  id: string
  name: string
  path: string
  deleted: number
}

export interface FeatureListResponse {
  data: FeatureResponse[]
  page: number
  pageSize: number
  totalRows: number
}
