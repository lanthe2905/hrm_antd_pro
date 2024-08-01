import { BasicListRequest } from '@/models/common.model'
import { LuongResponse, LuongListResponse } from '@/models/luong.model'
import { request } from '@umijs/max'

const resource = 'salaries'

type CreateForm = {
  thang: string
  quy_luong: number
  luong_toi_thieu: number
  kdc: number //Hệ số điều chỉnh
}

const getLuongGTBTData = async (params: BasicListRequest) => {
  return await request<LuongListResponse>(resource + '/gt-bt', {
    params: params,
    method: 'GET',
  })
}

const createLuongGTBT = async (params: CreateForm) => {
  return await request<LuongResponse>(resource + '/gt-bt', {
    params: params,
    method: 'POST',
  })
}

const getLuongBTCData = async (params: BasicListRequest) => {
  return await request<LuongListResponse>(resource + '/btc', {
    params: params,
    method: 'GET',
  })
}

const createLuongBTC = async (params: CreateForm) => {
  return await request<LuongResponse>(resource + '/btc', {
    data: params,
    method: 'POST',
  })
}

const getLuongSCData = async (params: BasicListRequest) => {
  return await request<LuongListResponse>(resource + '/sc', {
    params: params,
    method: 'GET',
  })
}

const createLuongSC = async (params: CreateForm) => {
  return await request<LuongResponse>(resource + '/sc', {
    data: params,
    method: 'POST',
  })
}

const createLuongLM = async (params: CreateForm) => {
  return await request<LuongResponse>(resource + '/lm', {
    data: params,
    method: 'POST',
  })
}

const getLuongLMData = async (params: BasicListRequest) => {
  return await request<LuongListResponse>(resource + '/lm', {
    param: params,
    method: 'GET',
  })
}

const createLuongDTLT = async (params: BasicListRequest) => {
  return await request<LuongListResponse>(resource + '/dt-lt', {
    data: params,
    method: 'POST',
  })
}

const getLuongDTLT = async (params: BasicListRequest) => {
  return await request<LuongListResponse>(resource + '/dt-lt', {
    params: params,
    method: 'GET',
  })
}

const getLuongHTVT = async (params: BasicListRequest) => {
  return await request<LuongListResponse>(resource + '/htvt', {
    params: params,
    method: 'GET',
  })
}

const createLuongHTVT = async (params: BasicListRequest) => {
  return await request<LuongListResponse>(resource + '/htvt', {
    param: params,
    method: 'POST',
  })
}

const exportExcelLuong = async (params: any) => {
  return await request<LuongListResponse>(resource + '/dt-lt', {
    params: params,
  })
}

const createLuongClct = async (params: BasicListRequest) => {
  return await request<LuongListResponse>(resource + '/clct', {
    data: params,
    method: 'POST',
  })
}

const getLuongCLCT = async (params: any) => {
  return await request<LuongListResponse>(resource + '/clct', {
    params: params,
    method: 'GET',
  })
}

export {
  getLuongGTBTData,
  createLuongGTBT,
  createLuongBTC,
  getLuongBTCData,
  getLuongSCData,
  createLuongSC,
  getLuongLMData,
  createLuongLM,
  exportExcelLuong,
  createLuongDTLT,
  getLuongDTLT,
  createLuongHTVT,
  getLuongHTVT,
  getLuongCLCT,
  createLuongClct,
}
