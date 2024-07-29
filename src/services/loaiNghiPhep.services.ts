import {
  LoaiNghiPhep,
  LoaiNghiPhepResponse,
  LoaiNghiPhepListResponse,
} from '@/models/loaiNghiPhep.model'
import { request } from '@umijs/max'

const resource = '/api/v1/leave-types'

const getList = async (params: any): Promise<LoaiNghiPhepListResponse> => {
  return await request<LoaiNghiPhepListResponse>(resource, {
    params: params,
    method: 'GET',
  })
}

const create = async (params: any) => {
  return await request<LoaiNghiPhepResponse>(resource, {
    data: params,
    method: 'POST',
  })
}

const update = async (params: any) => {
  return await request<LoaiNghiPhepResponse>(resource + '/' + params.id, {
    data: params,
    method: 'PUT',
  })
}

const deleteNgiPhep = async (params: any) => {
  return await request<LoaiNghiPhepResponse>(resource + '/' + params.id, {
    method: 'DELETE',
  })
}

const dropDown = async (params: any): Promise<LoaiNghiPhepListResponse> => {
  return await request<LoaiNghiPhepListResponse>(resource, {
    param: params,
    method: 'GET',
  })
}
export { getList, create, update, deleteNgiPhep, dropDown }
