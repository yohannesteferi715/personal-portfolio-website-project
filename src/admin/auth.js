import { api, getToken, clearToken } from "./api";

export const isAuthenticated = () => !!getToken();

export const login = async (username, password) => {
  await api.login(username, password);
  return true;
};

export const logout = () => {
  clearToken();
};
