import { BasicResponse, BasicListRequest, BasicListResponse } from './common.model'

interface LoaiNghiPhep {
  id: number
  ten: string
  co_tinh_luong: boolean
  so_ngay_trong_nam: number
  hs: number
}

interface LoaiNghiPhepResponse extends BasicResponse<LoaiNghiPhep> {}

interface LoaiNghiPhepListResponse extends BasicListResponse<LoaiNghiPhep> {}

export type {
  LoaiNghiPhep,
  LoaiNghiPhepResponse,
  LoaiNghiPhepListResponse,
}
