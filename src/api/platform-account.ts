import {PLATFORM_TYPE} from '../platform/type';
import axiosClient from './axios.config';

export const platformAccountApi = {
  addAccount: async (token: string) => {
    return axiosClient.post(`/plt-account`, {token});
  },
  getAccounts: async (platform: PLATFORM_TYPE) => {
    return axiosClient.get(`users/platform-accounts`);
  },
};
