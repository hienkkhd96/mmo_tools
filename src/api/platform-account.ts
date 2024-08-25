import axiosClient from './axios.config';

export const platformAccountApi = {
  addAccount: async (token: string) => {
    const res = await axiosClient.post(`/plt-account`, {token});
    return res;
  },
};
