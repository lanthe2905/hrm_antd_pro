import { BasicResponse, BasicListResponse } from './common.model'

interface AssetsRequest {
    id : number
    ma_tai_san: string
    ten: string
    id_nhom_tai_san: number
    don_vi: string
    don_gia: number
    so_luong: number
    ngay_mua: any
    nha_cung_cap: string
    bao_hanh: string
    nhom_tai_san: {
      id: number
      ten: string
      created_at: string
      updated_at: string
    }
  }

  interface GroupAssetsRequest {
    id: number
    ten: string
    // created_at: string
    // updated_at: string
  }

interface AssetsReponse extends BasicResponse<AssetsRequest>{}
interface AssetsRequestListResponse extends BasicListResponse<AssetsRequest> {}

interface GroupAssetsRequestListResponse extends BasicListResponse<GroupAssetsRequest> {}
  
export type { AssetsRequest, AssetsReponse, AssetsRequestListResponse, GroupAssetsRequest, GroupAssetsRequestListResponse}