import {
  // ChamCong,
  ChamCong,
  ChamCongListResponse,
  ChamCongResponse
} from '@/models/chamCong-v1.model'
import { request } from '@umijs/max';

const resource = 'attendances'

const getList = async (params: any): Promise<ChamCongListResponse> => {
  return await request<ChamCongListResponse>(resource, { param: params, hasUser: true,  method: 'GET' })
}

const create = async (params: any) => {
  return await request<ChamCongResponse>(resource, {
    params: params,
    method: 'POST',
  })
}

const update = async (params: any) => {
  return await request<ChamCongResponse>(resource + '/' + params.id,{
    param: params,
    method: 'PUT',
  })
}

const remove = async (params: any) => {
  return await request<ChamCongResponse>(resource + '/' + params.id,{
    method: 'DELETE',
  })
}

const importChamCong = async (data: any) => {
  return await request<ChamCongResponse>(resource + '/import-lm', {
    param: data,
    method: 'POST',
    hasFile: true,
  })
}

const importChamCongDTLT = async (data: any) => {
  return await request<ChamCongResponse>(resource + '/import-dt-lt', {
    param: data,
    method: 'POST',
    hasFile: true,
  })
}

const importChamCongKhoiSC = async (data: any) => {
  return await request<ChamCongResponse>(resource + '/import-sc',{
    param: data,
    method: 'POST',
    hasFile: true,
  })
}

const importChamCongKhoiConLai = async (data: any) => {
  return await request<ChamCongResponse>(resource + '/import-gt-bt',{
    param: data,
    method: 'POST',
    hasFile: true,
  })
}

export { getList, create, update, remove, importChamCong, importChamCongDTLT, importChamCongKhoiConLai, importChamCongKhoiSC }
