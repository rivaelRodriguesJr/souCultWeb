import axios, { Method } from 'axios';

type RequestParams = {
  method?: Method
  url: string
  data?: object | string,
  params?: object,
  headers?: object
}


const BASE_URL = 'http://localhost:3333';

export const makeRequest = <T = any>({ method = 'GET', url, data, params, headers }: RequestParams) => {
  return axios.request<T>({
    method,
    url: `${BASE_URL}${url}`,
    data,
    params,
    headers
  });
}

export const makePrivateRequest = <T = any>({ method = 'GET', url, data, params }: RequestParams) => {
  // const sessionData = getSessionData();
  // const headers = {
  //   'Authorization': `Bearer ${sessionData.access_token}`
  // }
  // return makeRequest<T>({ method, url, data, params, headers });
  return makeRequest<T>({ method, url, data, params });
}