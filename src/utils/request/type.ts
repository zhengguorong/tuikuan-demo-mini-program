import { DOMAIN_SYSTEM_ENUM } from 'cx-utils';
// 请求方法
export declare type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface Request {
  /** 接口地址对应的后台服务 */
  server?: DOMAIN_SYSTEM_ENUM;
  /** 接口地址 */
  url: string;
  /** 请求方法 */
  method?: Method;
  /** 请求的参数 */
  data?: { [key: string]: any } | string;
  /** 请求头 */
  header?: { [key: string]: string };
  /** 是否显示 loading */
  loading?: boolean;
  /** loading 提示语 */
  loadingText?: string;
  /** 是否显示错误 toast 提示信息 */
  isShowErrorToast?: boolean;
  /** 是否需要获取域名配置 */
  isGetEnv?: boolean;
  /** 是否显示错误 model 提示信息 */
  isShowErrorModel?: boolean;
}

export interface Response<T = any> {
  /** 业务处理是否成功 */
  successful: boolean;
  /** 业务处理结果描述 */
  message: string;
  /** 业务返回的数据 */
  data: T;

  token?: string;

  code: string;
}

export interface ResponsePromise<T = any> extends Promise<Response<T>> {}

export interface ErrorData {
  /** 错误信息 */
  errMsg: string;
}

export interface ProxyResponse {
  /** 响应的 HTTP 状态码 */
  statusCode: number;
  /** 响应的描述 */
  errMsg?: string;
  /** 响应的实际数据 */
  data?: Response;
}
