import {PLATFORM_TYPE} from '../platform/type';
import axiosClient from './axios.config';

type CreatePltAccountDto = {
  token: string;
  accountName: string;
  type: PLATFORM_TYPE;
};

export const platformAccountApi = {
  addAccount: async (data: CreatePltAccountDto) => {
    return axiosClient.post(`/plt-account`, {...data});
  },
  getAccounts: async (platform: PLATFORM_TYPE) => {
    return axiosClient.get(`users/platform-accounts?platform=${platform}`);
  },
};
