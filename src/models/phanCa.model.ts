import { BasicResponse, BasicListResponse } from './common.model'
import { Ca } from './ca.models'
interface PhanCa {
  id: number
  loai_dang_ky: string //Loại đăng ký: nhom, ca_nhan
  id_nhan_viens: number[] //Dùng khi loại đăng ký là ca_nhan
  id_nhom_phan_cas: number[] //Dùng khi loại đăng ký là nhom
  id_ca: number
  ngay_bat_dau: string
  ngay_ket_thuc: string //Có thể null
}

interface TongHopPhanCa {
  id: number
  ho_va_ten: string
  ten_bo_phan: string
  id_nhom_phan_ca: number
  nhom_phan_ca: {
    id: number
    ten: string
    mo_ta: string
  }
}

interface NhanVienDaPhanCa {
  ho_va_ten: string
  id: number
  phan_cas: Array<{
    id: number
    id_ca: number
    id_nhan_vien: number
    meta: { ten_ca: string }
    ngay_bat_dau: string
    ngay_ket_thuc: string
    ca: Ca
  }>
}

interface NhanVienDaPhanCaResponse extends BasicListResponse<NhanVienDaPhanCa> {}

interface TongHopPhanCaResponse
  extends BasicResponse<{
    nhan_vien_chua_phan_ca: TongHopPhanCa[]
    nhan_vien_da_phan_ca: TongHopPhanCa[]
  }> {}

interface PhanCaResponse extends BasicResponse<PhanCa> {}

interface PhanCaListResponse extends BasicListResponse<PhanCa> {}

export type {
  PhanCa,
  PhanCaResponse,
  PhanCaListResponse,
  TongHopPhanCaResponse,
  TongHopPhanCa,
  NhanVienDaPhanCaResponse,
  NhanVienDaPhanCa,
}
