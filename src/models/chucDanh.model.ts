import { BasicResponse, BasicListResponse } from './common.model'

interface ChucDanh {
  id: number
  ten: string
  ki_hieu: string
  kpp: number
  mo_ta: string
}

interface ChucDanhResponse extends BasicResponse<ChucDanh> { }

interface ChucDanhListResponse extends BasicListResponse<ChucDanh> { }

export type {
  ChucDanh,
  ChucDanhResponse,
  ChucDanhListResponse,
}
