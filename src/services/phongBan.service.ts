import {
  PhongBan,
  PhongBanListResponse,
  PhongBansResponse
} from '@/models/phongBan.model'
import { request } from '@umijs/max';
import { getToken } from './login.service';
const resource = '/api/departments'

const getList = async (params: any, options?: { [key: string]: any }) => {
  const rs = await request<PhongBanListResponse>(resource, {
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
  return request<PhongBan[]>(resource +"/"+ 'dropdown', {
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

const updatePhongBan = async (params: PhongBan) => {
  return await request<PhongBansResponse>(resource +"/"+ params.id, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${getToken()}`
    },
    params: params,
  });
}

const deletePhongBan = async (id_phong_ban: any) => {
  return request<PhongBan[]>(resource +"/"+ id_phong_ban, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getToken()}`
    },
    params: { },
  });
}

const createPhongBan = async ({params = {}, options = {}}) => {
  const rs = await  request<PhongBansResponse>( resource , {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getToken()}`
    },
    params: params,
    ...(options || {}),
  });

  return rs
} 

export { getList , dropdown, createPhongBan, deletePhongBan, updatePhongBan }
