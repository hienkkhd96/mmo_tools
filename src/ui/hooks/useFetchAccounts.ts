import {useEffect, useState} from 'react';
import {platformAccountApi} from '../../api/platform-account';
import {PLATFORM_TYPE} from '../../platform/type';
import {useIsFocused} from '@react-navigation/native';

export type GetAccountInfoParams = {
  platform: PLATFORM_TYPE;
};
export type Account = {
  account_name: string;
  token: string;
  type: PLATFORM_TYPE;
  id: string;
};
export const useFetchAccount = (params: GetAccountInfoParams) => {
  const {platform} = params;
  const [data, setData] = useState<Account[]>([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (!isFocused) return;
    (async () => {
      try {
        const res = await platformAccountApi.getAccounts(platform);
        if (res.status === 200 && res?.data) {
          setData(res.data);
        } else {
          throw res?.data;
        }
      } catch (error) {
        setData([]);
      }
    })();
  }, [platform, isFocused]);
  return {
    accounts: data,
  };
};
