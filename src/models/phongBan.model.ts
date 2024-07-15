/* eslint-disable @typescript-eslint/no-empty-interface */
import { BasicResponse, BasicListResponse } from './common.model'

interface PhongBan {
  id: number
  ten: string
  ma_bp?: string
}

interface PhongBansResponse extends BasicResponse<PhongBan> {}
interface PhongBanListResponse extends BasicListResponse<PhongBan> {}

export type {
  PhongBan,
  PhongBansResponse,
  PhongBanListResponse,
}
