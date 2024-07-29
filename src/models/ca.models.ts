import {  BasicListResponse, BasicResponse } from './common.model'

interface Ca {
  id?: number
  ten: string
  loai: 'ca_hanh_chinh' | 'ca_gay'
  thoi_gian_bat_dau: string
  thoi_gian_ket_thuc: string
  cho_phep_tu_dong_cham_ve: boolean
  thoi_gian_tu_dong_cham_ve: string | null
  ngay_nghi?: ['thu_bay', 'chu_nhat', 'nua_thu_bay']
  mau?: string | null
  thoi_gian_giai_lao_bat_dau: string
  thoi_gian_giai_lao_ket_thuc: string
}

type DropdownCa = Pick<Ca, 'id' | 'ten'>

interface CaResponse extends BasicResponse<Ca> {}

interface CaDropdownResponse extends BasicListResponse<DropdownCa> {}

interface CaListResponse extends BasicListResponse<Ca> {}

export type {
  Ca,
  CaResponse,
  CaListResponse,
  CaDropdownResponse,
  DropdownCa,
}
