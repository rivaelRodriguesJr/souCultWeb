import axios, { AxiosRequestConfig } from 'axios';
import { getSessionData } from './auth';

interface LoginData {
  username: string;
  password: string;
}

// const BASE_URL = 'http://localhost:3333';
const BASE_URL = 'https://soulcult.herokuapp.com';

export const makeRequest = <T = any>(params: AxiosRequestConfig) => {
  return axios.request<T>({
    ...params,
    baseURL: BASE_URL
  });
}

export const makePrivateRequest = <T = any>(params: AxiosRequestConfig) => {
  const sessionData = getSessionData();
  const headers = {
    'Authorization': `Bearer ${sessionData.token}`
  }

  return makeRequest<T>({
    ...params,
    headers
  });
}

export const makeLogin = <T = any>(data: LoginData) => {
  return makeRequest<T>({
    url: '/session',
    method: 'POST',
    data
  });
}
