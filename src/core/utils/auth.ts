import { LoginResponse } from "core/models/LoginResponse";
import history from "./history";

export const saveSessionData = (loginResponse: LoginResponse) => {
  localStorage.setItem('authData', JSON.stringify(loginResponse));
}

export const getSessionData = () => {
  const sessionData = localStorage.getItem('authData') ?? '{}';
  const parsedSessionData = JSON.parse(sessionData);
  return parsedSessionData as LoginResponse;
}

export const logout = () => {
  localStorage.removeItem('authData');
  history.replace('/');
}
