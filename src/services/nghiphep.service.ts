import { request } from '@umijs/max'

import type {
  NghiPhep,
  NghiPhepListResponse,
  NghiPhepsResponse,
} from '@/models/nghiPhep.model'
import paramtInterceptors from '@/util/paramtInterceptors'

const resource = '/api/v1/leaves'
export const getList = async (
  params: any,
  options?: { [key: string]: any },
) => {
  const rs = await request<NghiPhepListResponse>(resource, {
    method: 'GET',
    params: paramtInterceptors(params),
    ...(options || {}),
  })

  return {
    data: rs?.data ?? [],
    success: true,
    total: rs.meta.total ?? 0,
  }
}

export const deleteNghiPhep = async (payload: NghiPhep) => {
  return await request<NghiPhepListResponse>(resource + '/' + payload.id, {
    method: 'DELETE',
    params: {},
  })
}

export const approveOrReject = async (payload: Partial<NghiPhep>) => {
  return await request<NghiPhepsResponse>(resource + '/approve-orreject', {
    method: 'POST',
    params: payload,
  })
}

export const create = async (payload: NghiPhep) => {
  return await request<NghiPhepsResponse>(resource, {
    method: 'POST',
    data: payload,
  })
}

export const update = async (payload: NghiPhep) => {
  return await request<NghiPhepsResponse>(resource + '/' + payload.id, {
    method: 'PUT',
    data: payload,
  })
}
