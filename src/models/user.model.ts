/* eslint-disable @typescript-eslint/no-empty-interface */
import { BasicListResponse, BasicResponse } from './common.model'
import { LuongKy1 } from './luongKy1.model'

interface User {
  id: number
  email?: string
  username: string
  password?: string
  rememberMeToken?: string | null
  sdb?: string
  ho_va_ten?: string
  khoi: string
  khoi_ll: string
  ngay_sinh: string
  gioi_tinh: string
  tinh_trang_hon_nhan: string
  //Hợp đồng lao động
  ngay_ky_hdld_dau_tien: string
  ngay_ky_hd_thu_viec: string
  ngay_ky_hdld: string
  ngay_het_hdld: string
  nam_nghi_huu: string
  // Trình độ đào tạo
  chuyen_mon: string
  chuyen_mon_khac: string
  chuyen_nganh: string
  noi_dao_tao: string
  ngay_cap: string
  //Chức vụ
  ngay_bo_nhiem: string
  ngay_bo_nhiem_lai: string
  qua_trinh_bo_nhiem: string
  // Thông tin cá nhân
  noi_sinh: string
  que_quan: string
  can_cuoc_cd: string
  ngay_cap_cc: string
  noi_cap_can_cuoc: string
  dia_chi: string
  sdt: string
  dan_toc: string
  quoc_tich: string
  so_the_atm: string
  chu_the_atm: string
  ngan_hang_atm: string
  chi_nhanh_atm: string
  so_so_bhxh: string
  // Nơi thường trú
  so_nha: string
  xa: string
  huyen: string
  tinh: string
  //Hợp đồng lao động
  chuc_danh_ll: string
  bang_luong: string
  bac: string
  hsl: number
  pccv: number
  pctn: number
  thoi_gian_giu_bac: string
  dien_bien_luong: string
  hinh_dai_dien: string
  id_vai_tro: number
  id_chuc_danh: number
  id_bo_phan: number
  don_vi_ct: string
  hinh_thuc_lam_viec: string
  ghi_chu_cv: string
  createdAt: string
  updatedAt: string

  //Thông tin khác
  id_nhom_phan_ca: number
  cho_phep_dang_nhap: boolean
  trang_thai: 'hoat_dong' | 'khong_hoat_dong'
  k2: number
  meta?: any

  //Relationship
  chuc_danh: {
    id: number
    ten: string
  }
  bo_phan: {
    id: number
    ten: string
  }

  luong_ky_1_s: LuongKy1[]
  //Anh thiên mới thêm
  ten_chuc_danh?: string
  ma_bp?: string
  ten_bo_phan?: string
}

interface UserResponse extends BasicResponse<User> {}

interface UserListResponse extends BasicListResponse<User> {}

export { User, UserResponse, UserListResponse }
