import {PLATFORM_TYPE} from '../platform/type';
import axiosClient from './axios.config';

type CreatePltAccountDto = {
  token: string;
  accountName: string;
  type: PLATFORM_TYPE;
};

export const platformAccountApi = {
  addAccount: async (data: CreatePltAccountDto) => {
    return axiosClient.post(`/platform-accounts`, {...data});
  },
  getAccounts: async (platform: PLATFORM_TYPE) => {
    return axiosClient.get(`users/platform-accounts?platform=${platform}`);
  },
  removeAccount: async (id: string) => {
    return axiosClient.delete(`platform-accounts/${id}?`);
  },
  countAccount: async () => {
    return axiosClient.get(`/platform-accounts/counts`);
  },
};
