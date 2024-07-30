import {
  LuongKy1,
  LuongKy1ListResponse,
  LuongKy1Response,
} from '@/models/luongKy1.model'
import { request } from '@umijs/max'
import paramtInterceptors from '@/util/paramtInterceptors'
import { UserListResponse } from '@/models/user.model'
const resource = '/api/v1/advance-salaries'

const getList = async (params: any) => {
  const rs = await request<LuongKy1ListResponse>(resource, {
    params: paramtInterceptors(params),
    method: 'GET',
  })

  return {
    data: rs.data,
    total: rs.meta.total,
    success: true,
  }
}

const create = async (params: any) => {
  return await request<LuongKy1Response>(resource, {
    data: params,
    url: resource,
    method: 'POST',
  })
}

const update = async (params: LuongKy1) => {
  return await request<LuongKy1Response>(resource + '/' + params.id, {
    params: params,
    method: 'PUT',
  })
}

const remove = async (params: LuongKy1) => {
  return await request<LuongKy1Response>(resource + '/' + params.id, {
    method: 'DELETE',
  })
}

const getUserWithLuong = async (params: any) => {
  return await request<UserListResponse>(resource + '/for-add-or-update', {
    params,
    method: 'GET',
  })
}

export { getList, create, update, remove, getUserWithLuong }
