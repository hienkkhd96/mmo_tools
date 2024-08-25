import axiosClient from './axios.config';

const authApi = {
  login: async (username: string, password: string) => {
    return axiosClient.post(`/auth/login`, {username, password});
  },
  loginByKey: async (token: string) => {
    return axiosClient.post(`/auth/token-login`, {token});
  },
};
export default authApi;
