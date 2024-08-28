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
    return golikeClient.get(`${chanel}-account`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
        'sec-ch-ua-platform': 'Macos',
        origin: 'https://app.golike.net',
        'sec-fetch-site': 'same-site',
        priority: 'u=1, i',
        t: 'VFZSamVVNUVZekpPVkVGNlRuYzlQUT09',
        referer: 'https://app.golike.net/',
        'sec-ch-ua':
          '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
        'sec-ch-ua-mobile': '?0',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'accept-language': 'vi-VN,vi;q=0.9,en-US;q=0.8',
        'sec-fetch-user': '?1',
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
      },
    });
  },
};
