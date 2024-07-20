import { BasicResponse, BasicListResponse } from './common.model'
import { LoaiNghiPhep } from './loaiNghiPhep.model'
import { User } from './user.model'


export interface NghiPhep {
  id: number
  id_nhan_vien: number
  id_loai_nghi_phep: number
  tu_ngay: string
  den_ngay: string
  so_ngay?: number
  li_do?: string
  trang_thai: 'cho_xu_ly' | 'da_duyet' | 'da_tu_choi'
  thoi_gian_nghi: 'trong_ngay' | 'theo_gio' | 'nhieu_ngay'
  xu_ly_boi?: number
  ghi_chu?: string
  created_at?: Date
  updated_at?: Date
  loaiNghiPhep: LoaiNghiPhep

  //ORM
  user: User
}

export interface NghiPhepListResponse extends BasicListResponse<NghiPhep> {}

export interface NghiPhepsResponse extends BasicResponse<NghiPhep> {}