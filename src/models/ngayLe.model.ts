import { BasicResponse, BasicListRequest, BasicListResponse } from './common.model'

interface NgayLe {
  id: number
  ten: string
  ngay_bat_dau: string
  ngay_ket_thuc: string
  hs_cong: number
  hs_cong_di_lam: number
  chu_thich: string
}

interface NgayLeResponse extends BasicResponse<NgayLe> {}

interface NgayLeListResponse extends BasicListResponse<NgayLe> {}

export type {
  NgayLe,
  NgayLeResponse,
  NgayLeListResponse,
}
