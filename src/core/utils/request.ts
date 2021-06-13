import axios, { Method } from 'axios';
import { getSessionData } from './auth';

interface RequestParams {
  method?: Method
  url: string
  data?: object | string,
  params?: object,
  headers?: object
}

interface LoginData {
  username: string;
  password: string;
}

// const BASE_URL = 'http://localhost:3333';
const BASE_URL = 'https://soulcult.herokuapp.com';

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
  const sessionData = getSessionData();
  const headers = {
    'Authorization': `Bearer ${sessionData.token}`
  }

  return makeRequest<T>({ method, url, data, params, headers });
}

export const makeLogin = <T = any>(data: LoginData) => {
  return makeRequest<T>({ url: '/session', data, method: 'POST' });
}
