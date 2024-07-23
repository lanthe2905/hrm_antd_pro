import { NgayLeListResponse, NgayLeResponse } from '@/models/ngayLe.model'
import { request } from '@umijs/max'

const resource = '/api/holidays'

const getList = async (params: any) => {
  return await request<NgayLeListResponse>(resource,{
    params: params,
    method: 'GET',
  })
}

const create = async (data: any) => {
  return await request<NgayLeResponse>(resource,{
    data: data,
    method: 'POST',
  })
}

const update = async (data: any) => {
  return await request<NgayLeResponse>(resource + '/' + data.id, {
    data: data,
    method: 'PUT',
  })
}

const deleteNgayle = async (params: any) => {
  return await request<NgayLeResponse>(resource + '/' + params.id, {
    method: 'DELETE',
  })
}

export { getList, create, update, deleteNgayle }
