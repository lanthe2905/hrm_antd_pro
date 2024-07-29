import { request } from '@umijs/max'
import { NguoiThamDuResponse } from '@/models/nguoiThamDu.model'
import {
  ChamCongV2ListResponse,
  ChamCongV2Response,
} from '@/models/chamCong-V2.model'
import paramtInterceptors from '@/util/paramtInterceptors'
const resource = '/api/v2/attendances'

const danhSachNhanVienChamCong = async (params: {
  thang_cham_cong: any
  id_bo_phan: any
}) => {
  const url = resource + '/for-add-or-update'

  return await request<NguoiThamDuResponse>(url, {
    params: params,
    url: url,
    method: 'GET',
  })
}

const createOrUpdate = async (params: any) => {
  return await request<any>(resource, {
    resource,
    params: params,
    method: 'POST',
  })
}

const getData = async (params: any) => {
  const rs = await request<ChamCongV2ListResponse>(resource, {
    params: paramtInterceptors(params),
    method: 'GET',
  })

  return {
    data: rs?.data ?? [],
    success: true,
    total: rs.meta.total ?? 0,
  }
}

const detail = async (params: any) => {
  const url = resource + '/' + params?.id
  return await request<ChamCongV2Response>(url, {
    params: params,
    method: 'GET',
  })
}

const update = async (params: any) => {
  return await request<any>(resource + '/' + params?.id, {
    params: params,
    method: 'PUT',
  })
}

const deleteDetail = async (params: any) => {
  return await request<any>(resource + '/' + params?.id, {
    params: params,
    method: 'DELETE',
  })
}

const chamCongDTLT = async (params: any) => {
  return await request<NguoiThamDuResponse>(resource + '/create-dt-lt', {
    params: params,
    method: 'POST',
  })
}

const xoaTatCa = async (params: any) => {
  return await request<NguoiThamDuResponse>(resource + '/delete-all', {
    params: params,
    method: 'DELETE',
  })
}

export {
  danhSachNhanVienChamCong,
  createOrUpdate,
  getData,
  detail,
  update,
  deleteDetail,
  chamCongDTLT,
  xoaTatCa,
}
