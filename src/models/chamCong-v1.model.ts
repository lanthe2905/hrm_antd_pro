import { BasicResponse, BasicListResponse } from './common.model'

interface ChamCong {
  id: number
  id_nhan_vien: number
  id_ky_hieu: number
  id_ca: number
  ngay: any
  gio_vao: string
  gio_ve: string
  ghi_chu: string
  co_gop: boolean
}

interface ChamCongResponse extends BasicResponse<ChamCong> {}

interface ChamCongListRequest {
  tu_ngay: string
  den_ngay: string
  id_bo_phan?: number | string
  id_nhan_vien?: number | string
}

interface ChamCongListResponse extends BasicListResponse<ChamCong> {}

export type {
  ChamCong,
  ChamCongResponse,
  ChamCongListResponse,
}
