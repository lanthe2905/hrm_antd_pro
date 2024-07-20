/* eslint-disable */
import { request } from '@umijs/max';
import {User, UserListResponse, UserResponse} from '@/models/user.model'
const resource = '/api/users'
/**  GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>(resource, {
    method: 'GET',
    ...(options || {}),
  });
}

 export const getList = async (params= {}, options= {}) => {
  const rs =  await request<UserListResponse>(resource, {
    method: 'GET',
    params: params,
    ...(options || {}),
  });
  return {
    data: rs?.data ?? [],
    success: true,
    total: rs.meta.total ?? 0,
  }
}

export const deleteUser = async (payload: User) => {
  return request<UserResponse>(resource +"/"+ payload.id, {
    method: "DELETE",
  })
}

export const createUser = async (payload: User) => {
  return request<UserResponse>(resource , {
    params: payload,
    method: "POST",
  })
}

export const dropdownUser = async (payload: any) => {
  return request<UserListResponse>(resource + "/dropdown", {
    method: "GET",
    params: payload,
  })
}