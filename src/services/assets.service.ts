import {
    AssetsRequest,
    AssetsReponse,
    AssetsRequestListResponse,
    GroupAssetsRequest,
    GroupAssetsRequestListResponse
  } from '@/models/assets.model'
  import { request } from '@umijs/max'
  import paramtInterceptors from '@/util/paramtInterceptors'
  const resource = '/api/v1/assets'
  
  const getList = async (params: any, options?: { [key: string]: any }) => {
    const rs = await request<AssetsRequestListResponse>(resource, {
      method: 'GET',
      params: paramtInterceptors(params),
      ...(options || {}),
    })
  
    return {
      data: rs?.data ?? [],
      success: true,
      total: rs.meta.total ?? 0,
    }
  }

  const deleteAssets = async (id_phong_ban: any) => {
    return request<AssetsRequest[]>(resource + '/' + id_phong_ban, {
      method: 'DELETE',
      params: {},
    })
  }

  const createAssets = async ({ params = {}, options = {} }) => {
    const rs = await request<AssetsReponse>(resource, {
      method: 'POST',
      params: params,
      ...(options || {}),
    })
  
    return rs
  }

  const dropdown = async (params: any, options: any) => {
    return request<GroupAssetsRequest[]>(resource + '/' + 'dropdown', {
      method: 'GET',
      params: {
        khoi_lai_may: params.khoi_lai_may,
      },
      ...(options || {}),
    })
  }

  const updateAssets = async (params: AssetsRequest) => {
    console.log(params.id);
    return await request<AssetsReponse>(resource + '/' + params.id, {
      method: 'PUT',
      params: params,
    })
  }

//   const dropdownGroupAssets = async (params: any, options: any) => {
//     return request<GroupAssetsRequest[]>('/asset-groups/dropdown', {
//       method: 'GET',
//       params: {},
//       ...(options || {}),
//     })
//   }

  const dropdownGroupAssets = async (params: any, options?: { [key: string]: any }) => {
    const rs = await request<GroupAssetsRequestListResponse>("/api/v1/asset-groups", {
      method: 'GET',
      params: params,
      ...(options || {}),
    })
  
    return {
      data: rs?.data ?? [],
      success: true,
      total: rs.meta.total ?? 0,
    //   total: 2,
    }
  }
  
  export { getList, deleteAssets, createAssets, dropdown, dropdownGroupAssets, updateAssets }  