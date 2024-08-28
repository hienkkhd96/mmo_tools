import {useEffect, useState} from 'react';
import {platformAccountApi} from '../../api/platform-account';
import {CHANEL_TYPE, PLATFORM_TYPE} from '../../platform/type';
import {golikeApi} from '../../api/golike';
import {PlatformFactory} from '../../platform/platform.factory';

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
  useEffect(() => {
    (async () => {
      try {
        const Platform = PlatformFactory.createPlatform(token, platform);
        const res = await Platform.getSubAccounts(chanel);
        const data = res.data;
        if (res.status === 200 && data?.data) {
          setData(data.data);
          console.log(data.data);
        } else {
          throw res?.data;
        }
      } catch (error) {
        console.log(error);
        setData([]);
      }
    })();
  }, [chanel, token, platform]);
  return {
    subAccounts: data,
  };
};
