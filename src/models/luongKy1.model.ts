import { BasicResponse, BasicListResponse } from './common.model'
import { User } from './user.model'
interface LuongKy1 {
  id: number
  id_nhan_vien: number
  thong_tin_nhan_vien: any // JSON type is not directly supported in TypeScript, use any or a custom interface
  thang_ung_tien: string
  tien_ung: number
  trang_thai_duyet: string
  id_nhan_vien_duyet: number
  duyet_luc: Date // DateTime is not directly supported in TypeScript, use Date
  ly_do_tu_choi: string
  ghi_chu: string
  createdAt: Date // DateTime is not directly supported in TypeScript, use Date
  updatedAt: Date // DateTime is not directly supported in TypeScript, use Date
  user: User // Assuming User is a valid type or interface in your code
}

interface LuongKy1Response extends BasicResponse<LuongKy1> {}

interface LuongKy1ListResponse extends BasicListResponse<LuongKy1> {}

export type { LuongKy1, LuongKy1ListResponse, LuongKy1Response }
