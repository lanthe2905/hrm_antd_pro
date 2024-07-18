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
  return request<UserListResponse>(resource, {
    method: 'GET',
    params: params,
    ...(options || {}),
  });
}

export const deleteUser = async (payload: User) => {
  return request<UserResponse>(resource +"/"+ payload.id, {
    method: "DELETE",
  })
}

export const createUser = async (payload: User) => {
  return request<UserResponse>(resource +"/"+ payload.id, {
    params: payload,
    method: "POST",
  })
}