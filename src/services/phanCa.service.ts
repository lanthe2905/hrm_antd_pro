import { TongHopPhanCaResponse, PhanCa, PhanCaResponse, NhanVienDaPhanCaResponse } from '@/models/phanCa.model'
import { request } from '@umijs/max';

const resource = '/api/assign-shifts'

const phanCa = async (params: PhanCa) => {
  return await request<TongHopPhanCaResponse>(resource + '/assign', {
    params: params,
    method: 'POST',
  })
}

const xoaPhanCa = async (params: PhanCa) => {
  return await request<PhanCaResponse>(resource + '/remove', {
    params: params,
    method: 'POST',
  })
}

const nhomPhanCa = async (
  params: Pick<PhanCa, 'id_ca' | 'ngay_bat_dau' | 'loai_dang_ky'>,
): Promise<TongHopPhanCaResponse> => {
  return await request<TongHopPhanCaResponse>(resource + '/' + 'users-assigned-and-not-assign', {
    params: params,
    method: 'GET',
  })
}

const danhSachDaPhanCa = async (params: {
  tu_ngay: string
  id_bo_phan?: number
}): Promise<NhanVienDaPhanCaResponse> => {
  return await request<NhanVienDaPhanCaResponse>( resource + '/' + 'users-with-shits', {
    params: params,
    method: 'GET',
  })
}

export { phanCa, xoaPhanCa, nhomPhanCa, danhSachDaPhanCa }
