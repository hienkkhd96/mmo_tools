import {useEffect, useState} from 'react';
import {platformAccountApi} from '../../api/platform-account';
import {CHANEL_TYPE, PLATFORM_TYPE} from '../../platform/type';
import {golikeApi} from '../../api/golike';

export type GetSubAccountsParams = {
  chanel: CHANEL_TYPE;
  token: string;
};
export type SubAccount = {
  nickname: string;
  user_id: number;
  avatar_thumb: string;
};
export const useFetchSubAccount = (params: GetSubAccountsParams) => {
  const {chanel, token} = params;
  const [data, setData] = useState<SubAccount[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await golikeApi.getSubAccounts({
          chanel,
          token,
        });

        if (res.status === 200 && res?.data) {
          setData(res.data);
        } else {
          throw res?.data;
        }
      } catch (error) {
        console.log(error);
        setData([]);
      }
    })();
  }, [chanel, token]);
  return {
    subAccounts: data,
  };
};
