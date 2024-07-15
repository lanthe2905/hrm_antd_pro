import {
  PhongBanListResponse,
} from '@/models/phongBan.model'
import { request } from '@umijs/max';
import { getToken } from './login.service';


const resource = '/api/departments'

const getList = async (params: any, options?: { [key: string]: any }) => {
  // return await ApiHelper.execute<PhongBanListResponse>({ param: params, hasUser: true, url: resource, method: 'GET' })
  return request<PhongBanListResponse>(resource, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getToken()}`
    },
    params: params,
    ...(options || {}),
  });
}


export { getList }
