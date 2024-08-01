import * as CaiDatType from '@/models/caiDat.model'
import { request } from '@umijs/max'
const resource = '/api/v1/settings'

const getDetail = async (): Promise<CaiDatType.CaiDatResponse> => {
  return await request<CaiDatType.CaiDatResponse>(resource, {
    method: 'GET',
  })
}

const createOrUpdateLuong = async (params: any) => {
  return await request<CaiDatType.CaiDatResponse>(resource + '/salary', {
    data: params,
    method: 'POST',
  })
}

export { getDetail, createOrUpdateLuong }
