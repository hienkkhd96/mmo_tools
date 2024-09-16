import {CHANNEL_TYPE} from '../platform/type';
import tdsubClient from './tdsub.client';

export const tdsubApi = {
  getProfile: (token: string) => {
    return tdsubClient.get('/', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json, text/plain, */*',
      },
      params: {
        fields: 'profile',
        access_token: token,
      },
    });
  },
  getSubAccounts: (token: string, channel: CHANNEL_TYPE) => {
    return tdsubClient.get('/', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json, text/plain, */*',
      },
    });
  },
};
