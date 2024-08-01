import { BasicListResponse, BasicResponse } from './common.model'

type CaiDat = {
  id: number
  cham_cong: JSON | string
  luong_khu_vuc: number
  he_so_tang_ca: number
  luong: {
    luong_toi_thieu: number | string
    hs_luong_ngay_le: number | string
    hs_luong_ca_dem: number | string
    clct: {
      don_gia_luong: number | string
    }
    sc: {
      kdc: number | string
      hs_luong_ca_dem: number | string
      don_gia_luong_san_pham: number | string
    }
    gt_bt: {
      kdc: number | string
      hs_luong_ca_dem: number | string
      don_gia_luong_ca_dem: number | string
    }
    lm: {
      kdc: number | string
      hs_luong_ca_dem: number | string
    }
    btc: {
      kdc: number | string
      hs_luong_ca_dem: number | string
    }
    dt_lt: {
      kdc: number | string
    }
  }
}

interface CaiDatResponse extends BasicResponse<CaiDat> {}
interface CaiDatListResponse extends BasicListResponse<CaiDat> {}

export type { CaiDat, CaiDatResponse, CaiDatListResponse }
