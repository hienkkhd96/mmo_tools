import axiosClient from './axios.config';

export const tokenApi = {
  getInfoToken: async (token: string) => {
    return axiosClient.get(`/tokens/${token}`);
  },
  checkTokenExpired: async (token: string) => {
    return axiosClient.get(`/tokens/check-expired`, {
      params: {
        tokenKey: token,
      },
    });
  },
};
