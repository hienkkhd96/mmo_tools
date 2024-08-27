import {CHANEL_TYPE} from '../platform/type';
import golikeClient from './golikeClient';

export const golikeApi = {
  getProfile: (token: string) => {
    return golikeClient.get('users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json, text/plain, */*',
      },
    });
  },
  getSubAccounts: ({token, chanel}: {token: string; chanel: CHANEL_TYPE}) => {
    console.log(token, 'token');

    return golikeClient.get(`${chanel}-account`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json, text/plain, */*',
      },
    });
  },
};
