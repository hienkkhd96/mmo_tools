import {useIsFocused} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {PlatformFactory} from '../../platform/platform.factory';
import {CHANEL_TYPE, PLATFORM_TYPE} from '../../platform/type';
export type GetSubAccountsParams = {
  chanel: CHANEL_TYPE;
  token: string;
  platform: PLATFORM_TYPE;
};
export type SubAccount = {
  nickname: string;
  user_id: string;
  avatar_thumb: string;
  unique_id: string;
  id: string;
};
export const useFetchSubAccount = (params: GetSubAccountsParams) => {
  const {chanel, token, platform} = params;
  const [data, setData] = useState<SubAccount[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) return;
    (async () => {
      try {
        const Platform = PlatformFactory.createPlatform(token, platform);
        if (!chanel) {
          setData([]);
          return;
        }
        const res = await Platform.getSubAccounts(chanel);
        const data = res.data;
        if (res.status === 200 && data?.data) {
          setData(data.data);
        } else {
          throw res?.data;
        }
      } catch (error) {
        setData([]);
      }
    })();
  }, [chanel, token, platform, isFocused]);
  return {
    subAccounts: data,
  };
};
