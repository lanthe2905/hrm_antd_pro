interface PaginationParam {
  per_page: 10 | 25 | 50 | 100 | 0
  page: number
}

interface BasicUpdate {
  idSelected?: number
}

interface BasicListRequest extends PaginationParam {
  search?: string
}

interface BasicResponse<T> {
  error?: string
  message?: string
  data?: T
}

interface BasicListResponse<T> {
  error?: string
  data?: T[]
  message?: string
  meta: {
    total: number
    per_page: number
    current_page: number
    last_page: number
    first_page: number
    first_page_url: string
    last_page_url: string
    next_page_url: string
    previous_page_url: string
  }
}

type Action = 'create' | 'update' | 'delete' | 'export' | 'history' | 'filter'

type Method = 'GET' | 'PUT' | 'PATCH' | 'POST' | 'DELETE'

interface ControlDialog {
  msgId: string
  params?: Array<any>
  title: string
  back?: string
}

export type {
  PaginationParam,
  BasicUpdate,
  BasicResponse,
  BasicListRequest,
  Action,
  ControlDialog,
  BasicListResponse,
  Method,
}
