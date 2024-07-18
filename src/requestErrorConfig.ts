/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';

// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}
// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}
const TOKEN_NAME = 'access_token'

const setToken = (token: string | null) => {
  // cookies.set(TOKEN_NAME, token)
  localStorage.setItem(TOKEN_NAME, token as string)
}

const getToken = () => {
  return localStorage.getItem(TOKEN_NAME)
}

const authHeaderInterceptor = () => {
  return { Authorization: `Bearer ${getToken()}` };
};

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // Lỗi ném
    errorThrower: (res) => {
      const { success, data, errorCode, errorMessage, showType } =
        res as unknown as ResponseStructure;
      if (!success) {
        const error: any = new Error(errorMessage);
        error.name = 'BizError';
        error.info = { errorCode, errorMessage, showType, data };
        throw error; // 抛出自制的错误
      }
    },
    // Tiếp nhận xử lý!
    errorHandler: (error: any, opts: any) => {
      if(error.response.data.code == 'INVALID_TOKEN')
        window.location.href = '/user/login'
      throw error.response.data
    },
  },

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      const url = config?.url
      const authHeader = authHeaderInterceptor()

      return { ...config, url, headers: { ...(config.headers || {}), ...authHeader } }
    },
  ],

  // Xử lý response trước khi trả về cho component
  responseInterceptors: [
    (response) => {
      const { data } = response as unknown as ResponseStructure;
      return response;
    },
  ],
};
