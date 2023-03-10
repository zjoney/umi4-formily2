import { request } from 'umi';

interface ConfigsType {
  url: string;
  data?: any;
  method: string;
  params?: any;
  options?: any;
}

export const Request: any = (configs: ConfigsType) => {
  const { url, data = {}, method, params = {}, options = {} } = configs;
  // 创建请求id
  // const requestId = Request.createRequestId();
  // get请求防止缓存
  // params.rid = requestId;
  // 设置请求请求头中requestId
  options.headers = Object.assign(options.headers || {}, {
    // requestId, // 请求id
    // token: sessionStorage.token || '',
  });

  return request(url, {
    method,
    params,
    data,
    ...options,
    // [`${['POST', 'post'].includes(method) ? 'data' : 'params'}`]: ['POST', 'post'].includes(method) ? { ...data } : { ...params }
  });
};
// 各种方法
['delete', 'get', 'head', 'options'].forEach((method) => {
  Request[method] = function (
    url: string,
    params: any = {},
    options: any = {},
  ) {
    // 过滤参数
    // params = request.filter(params);
    // 发送器请求
    return Request({
      url,
      params,
      method,
      options,
    });
  };
});
['post', 'put', 'patch'].forEach((method) => {
  Request[method] = function (url: string, data: any = {}, options: any = {}) {
    // 过滤参数
    // eslint-disable-next-line no-param-reassign
    data = Request.filter(data);
    // 发送请求
    return Request({
      url,
      data,
      method,
      options,
    });
  };
});

Request.blob = (url: string, data: any = {}, options: any = {}) => {
  const { method = 'get', ...rest } = options;
  // 过滤参数
  // eslint-disable-next-line no-param-reassign
  data = Request.filter(data);
  // 设置响应头
  rest.responseType = 'blob';
  // 发送请求
  return Request[method](url, data, rest);
};

/**
 * 创建requestId请求头
 */
Request.createRequestId = () => {
  // 生成时间戳
  const stamp = String(new Date().getTime());
  // 生成随机数
  const r = String(Math.floor(90000 * Math.random() + 10000));

  return stamp + r;
};
/**
 * 过滤参数
 */
Request.filter = (data = {}) => {
  if (Array.isArray(data)) return data;
  // 过滤掉 ''，undeinfed,null等值
  const result = {} as any;

  for (const [k, v] of Object.entries(data)) {
    if (['', undefined, null].indexOf(v as any) === -1) {
      result[k] = typeof v === 'string' ? v.trim() : v;
    }
  }

  return result;
};
// 取消请求
Request.AbortController = new AbortController();
export default Request;
