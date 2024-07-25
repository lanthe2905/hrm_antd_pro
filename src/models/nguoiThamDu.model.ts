import { BasicListResponse, BasicResponse } from '@/models/common.model'
import { ChamCongv2 } from '@/models/chamCong-V2.model'

export type NguoiThamDu = {
  id: number,
  ho_va_ten: string,
  sdb: string,
  id_bo_phan: number,
  ten_bo_phan: string,
  meta?: {
    ma_bp: string
  },
  ma_bp: string
  cham_congs: ChamCongv2[]
}

export type NguoiThamDuResponse = BasicListResponse<NguoiThamDu>
