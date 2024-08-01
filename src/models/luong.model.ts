import { BasicListResponse, BasicResponse } from '@/models/common.model'

type Luong = {
  id: number

  id_nhan_vien: number

  khoi_ll: string

  thang: string

  trang_thai_duyet: string

  id_nhan_vien_duyet: number

  duyet_luc: Date | string

  ly_do_tu_choi: string

  hsl: number

  hscvu: number

  hspctn: number

  k2: number

  k1: number

  kdc: number

  nctt: number

  t1: number

  spp: number

  t2: number

  luong_khoan: number

  luong_dem: number

  luong_om: number

  luong_com: number

  luong_phep: number

  luong_kiem_nhiem: number

  luong_ung: number

  luong_pctn: number

  luong_toi_thieu: number

  bhxh: number

  bhyt: number

  phi_cong_doan: number

  thuc_lanh: number

  quy_luong: number

  thong_tin_nhan_vien: {
    chuc_danh_ll: string
    ho_va_ten: string
    id_bo_phan: number
    sdb: string
  }

  thong_tin_chay_tau?: any
  luong_chay_tau?: any
}

interface LuongResponse extends BasicResponse<Luong> {}
interface LuongListResponse extends BasicListResponse<Luong> {}

export type { Luong, LuongResponse, LuongListResponse }
