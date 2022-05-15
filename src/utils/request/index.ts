import Taro from '@tarojs/taro';

import mergeWith from 'lodash-es/mergeWith';
import { DOMAIN_SYSTEM_ENUM } from '@tiangong/utils';
import { store } from '@/store';
import interceptors from './interceptors';
import RequestQueue from './request-queue';
import { Request, ResponsePromise } from './type';

// export { Request, ResponsePromise, Method };

// 请求默认配置
const defaults: Request = {
  server: DOMAIN_SYSTEM_ENUM.tiangong,
  url: '',
  data: {},
  header: {},
  method: 'GET',
  loading: true,
  loadingText: '加载中',
  isShowErrorToast: true,
  isGetEnv: false,
};

// 请求队列
const requestQueue = new RequestQueue<Function>();

const dispatchRequest = <T>(options, resolve, reject) => {
  const mergeOptions = mergeWith({}, defaults, options);
  // 请求拦截器
  interceptors.request(mergeOptions);

  Taro.request(mergeOptions)
    .then(res => {
      interceptors.response.resolve<T>(res, resolve, reject, mergeOptions);
      setTimeout(() => {
        // 清空队列
        requestQueue.eachDequeue();
      });
    })
    .catch(error => {
      interceptors.response.reject(error, reject, mergeOptions);
    });
};

function request<T>(options: Request): ResponsePromise<T> {
  return new Promise((resolve, reject) => {
    // 如果没有获取到环境配置 拦截请求 如果有清空队列
    // 拦截
    const { isGetEnv } = store.getState().env;
    if (!isGetEnv && !options.isGetEnv) {
      requestQueue.enqueue(() => {
        dispatchRequest(options, resolve, reject);
      });
      return;
    }
    // 清空队列
    requestQueue.eachDequeue();
    dispatchRequest(options, resolve, reject);
  });
}

const http = {
  /**
   * GET 请求
   *
   * @template T
   * @param {Request} options
   * @returns {ResponsePromise<T>}
   */
  get<T = any>(options: Request): ResponsePromise<T> {
    return request<T>(options);
  },

  /**
   * POST 请求
   *
   * @template T
   * @param {Request} options
   * @returns {ResponsePromise<T>}
   */
  post<T = any>(options: Request): ResponsePromise<T> {
    return request(Object.assign({}, { method: 'POST' }, options));
  },

  /**
   * PUT 请求
   *
   * @template T
   * @param {Request} options
   * @returns {ResponsePromise<T>}
   */
  put<T = any>(options: Request): ResponsePromise<T> {
    return request(Object.assign({}, { method: 'PUT' }, options));
  },

  /**
   * DELETE 请求
   *
   * @template T
   * @param {Request} options
   * @returns {ResponsePromise<T>}
   */
  delete<T = any>(options: Request): ResponsePromise<T> {
    return request(Object.assign({}, { method: 'DELETE' }, options));
  },

  /**
   * BASE 基础请求
   *
   * @template T
   * @param {Request} options
   * @returns {ResponsePromise<T>}
   */
  base<T = any>(options: Request): ResponsePromise<T> {
    return request(options);
  },

  /**
   * 上传文件
   *
   * @template T
   * @param {IRequest} options
   * @returns {IPromise<T>}
   * @memberof Http
   */
  uploadFile<T = any>(options: Request | any): ResponsePromise<T> {
    return new Promise((resolve, reject) => {
      Taro.uploadFile(options)
        .then((res: any) => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};

export default http;
