

import {
    ChucDanh,ChucDanhListResponse,ChucDanhResponse
} from '@/models/chucDanh.model'
import { request } from '@umijs/max';
import { getToken } from './login.service';
const resource = '/api/job-titles'

const getList = async (params: any, options?: { [key: string]: any }) => {
  const rs = await request<ChucDanhListResponse>(resource, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getToken()}`
    },
    params: params,
    ...(options || {}),
  });

  return {
    data: rs?.data ?? [],
    success: true,
    total: rs.meta.total ?? 0,
  }
}

const dropdown = async (params: any, options: any) => {
  return request<ChucDanhListResponse>(resource +"/"+ 'dropdown', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getToken()}`
    },
    params: {
      khoi_lai_may: params.khoi_lai_may,
    },
    ...(options || {}),
  });
}

const updateChucDanh = async (params: ChucDanh) => {
  return await request<ChucDanhResponse>(resource +"/"+ params.id, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${getToken()}`
    },
    params: params,
  });
}

const deleteChucDanh = async (id_phong_ban: any) => {
  return request<ChucDanh[]>(resource +"/"+ id_phong_ban, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getToken()}`
    },
    params: { },
  });
}

const createChucDanh = async ({params = {}, options = {}}) => {
  const rs = await  request<ChucDanhResponse>( resource , {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getToken()}`
    },
    params: params,
    ...(options || {}),
  });

  return rs
} 

export { getList , dropdown, createChucDanh, deleteChucDanh, updateChucDanh }
