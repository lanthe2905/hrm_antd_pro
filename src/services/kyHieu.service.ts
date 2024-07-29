import {
  KyHieuChamCong,
  KyHieuChamCongListResponse,
  KyHieuChamCongResponse,
  KyHieuDropDownResponse,
} from '@/models/kyHieu.model'
import { request } from '@umijs/max';

const resource = '/api/attendance-symbols'

const getList = async (params: any) => {
  const rs = await request<KyHieuChamCongListResponse>(resource, {
    params: params,
    method: 'GET',
  })

  return {
    data: rs.data,
    total: rs.meta.total,
    success: true
  }
}

const create = async (params: KyHieuChamCong) => {
  return await request<KyHieuChamCongResponse>(resource, {
    params: params,
    url: resource,
    method: 'POST',
  })
}

const update = async (params: KyHieuChamCong) => {
  return await request<KyHieuChamCongResponse>(resource + '/' + params.id, {
    params: params,
    method: 'PUT',
  })
}

const remove = async (params: KyHieuChamCong) => {
  return await request<KyHieuChamCongResponse>(resource + '/' + params.id, {
    method: 'DELETE',
  })
}

const dropdown = async () => {
  return await request<KyHieuDropDownResponse>(resource + '/for-dropdown',{
    method: 'GET',
  })
}

export { getList, create, update, remove, dropdown }
