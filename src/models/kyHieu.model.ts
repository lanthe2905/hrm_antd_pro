import { BasicResponse, BasicListResponse } from './common.model'
interface KyHieuChamCong {
  id: number
  ky_hieu: string
  hs_cong: number
  mo_ta: string
}

interface KyHieuChamCongResponse extends BasicResponse<KyHieuChamCong> {}

interface KyHieuChamCongListResponse extends BasicListResponse<KyHieuChamCong> {}

type Dropdown = {
  id: number
  ky_hieu: string
  mo_ta: string
}

interface KyHieuDropDownResponse extends BasicListResponse<Dropdown> {}
export type {
  KyHieuChamCong,
  KyHieuChamCongListResponse,
  KyHieuChamCongResponse,
  KyHieuDropDownResponse,
  Dropdown,
}
