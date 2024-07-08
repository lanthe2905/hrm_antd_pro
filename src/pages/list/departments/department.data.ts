import {
  DepartmentListRequest,
  DepartmentListResponse,
  DepartmentCreateRequest,
  DepartmentsResponse,
  DepartmentUpdateRequest,
  Departments,
} from '~/type/Department.type'

import { ApiHelper } from '~/util/ApiHelper'

const resource = 'departments'

const getList = async (params: DepartmentListRequest): Promise<DepartmentListResponse> => {
  return await ApiHelper.execute<DepartmentListResponse>({ param: params, hasUser: true, url: resource, method: 'GET' })
}

const createDepartment = async (params: DepartmentCreateRequest) => {
  return await ApiHelper.execute<DepartmentsResponse>({
    param: params,
    hasUser: true,
    url: resource,
    method: 'POST',
  })
}

const updateDepartment = async (params: DepartmentUpdateRequest) => {
  return await ApiHelper.execute<DepartmentsResponse>({
    param: params,
    hasUser: true,
    url: resource + '/' + params.id,
    method: 'PUT',
  })
}

const deleteDepartment = async (params: Departments) => {
  return await ApiHelper.execute<DepartmentsResponse>({
    hasUser: true,
    url: resource + '/' + params.id,
    method: 'DELETE',
  })
}

type dropdown = {
  khoiLaiMay: boolean
}
const dropdown = async ({khoiLaiMay}: dropdown) => {
  return await ApiHelper.execute<DepartmentListResponse>({
    hasUser: true,
    url: resource + '/dropdown',
    method: 'GET',
    param: {
      khoi_lai_may: khoiLaiMay,
    }
  })
}

export { getList, createDepartment, updateDepartment, deleteDepartment, dropdown }
