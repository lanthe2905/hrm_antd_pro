import { BasicListRequest } from '@/models/common.model'
import { LuongResponse, LuongListResponse } from '@/models/luong.model'
import paramtInterceptors from '@/util/paramtInterceptors'
import { request } from '@umijs/max'

const resource = '/api/v1/salaries'

type CreateForm = {
  thang: string
  quy_luong: number
  luong_toi_thieu: number
  kdc: number //Hệ số điều chỉnh
}

const getLuongGTBTData = async (params: BasicListRequest) => {
  const rs = await request<LuongListResponse>(resource + '/gt-bt', {
    params: paramtInterceptors(params),
    method: 'GET',
  })
  return {
    data: rs?.data ?? [],
    success: true,
    total: rs.meta.total ?? 0,
  }
}

const createLuongGTBT = async (params: CreateForm) => {
  return await request<LuongResponse>(resource + '/gt-bt', {
    data: params,
    method: 'POST',
  })
}

const getLuongBTCData = async (params: BasicListRequest) => {
  const rs = await request<LuongListResponse>(resource + '/btc', {
    params: paramtInterceptors(params),
    method: 'GET',
  })

  return {
    data: rs?.data ?? [],
    success: true,
    total: rs.meta.total ?? 0,
  }
}

const createLuongBTC = async (params: CreateForm) => {
  return await request<LuongResponse>(resource + '/btc', {
    data: params,
    method: 'POST',
  })
}

const getLuongSCData = async (params: BasicListRequest) => {
  const rs = await request<LuongListResponse>(resource + '/sc', {
    params: paramtInterceptors(params),
    method: 'GET',
  })

  return {
    data: rs?.data ?? [],
    success: true,
    total: rs.meta.total ?? 0,
  }
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
  const rs = await request<LuongListResponse>(resource + '/lm', {
    param: paramtInterceptors(params),
    method: 'GET',
  })

  return {
    data: rs?.data ?? [],
    success: true,
    total: rs.meta.total ?? 0,
  }
}

const createLuongDTLT = async (params: BasicListRequest) => {
  return await request<LuongListResponse>(resource + '/dt-lt', {
    data: params,
    method: 'POST',
  })
}

const getLuongDTLT = async (params: BasicListRequest) => {
  const rs = await request<LuongListResponse>(resource + '/dt-lt', {
    params: paramtInterceptors(params),
    method: 'GET',
  })

  return {
    data: rs?.data ?? [],
    success: true,
    total: rs.meta.total ?? 0,
  }
}

const getLuongHTVT = async (params: BasicListRequest) => {
  const rs = await request<LuongListResponse>(resource + '/htvt', {
    params: paramtInterceptors(params),
    method: 'GET',
  })

  return {
    data: rs?.data ?? [],
    success: true,
    total: rs.meta.total ?? 0,
  }
}

const createLuongHTVT = async (params: BasicListRequest) => {
  return await request<LuongListResponse>(resource + '/htvt', {
    data: params,
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
  const rs = await request<LuongListResponse>(resource + '/clct', {
    params: paramtInterceptors(params),
    method: 'GET',
  })

  return {
    data: rs?.data ?? [],
    success: true,
    total: rs.meta.total ?? 0,
  }
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
