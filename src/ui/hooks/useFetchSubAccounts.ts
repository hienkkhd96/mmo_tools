import {useIsFocused} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {PlatformFactory} from '../../platform/platform.factory';
import {CHANNEL_TYPE, PLATFORM_TYPE} from '../../platform/type';
export type GetSubAccountsParams = {
  channel: CHANNEL_TYPE;
  token: string;
  platform: PLATFORM_TYPE;
};
export type SubAccount = {
  nickname?: string;
  shopee_username?: string;
  user_id: string;
  avatar_thumb: string;
  unique_id: string;
  id: string;
};
export const useFetchSubAccount = (params: GetSubAccountsParams) => {
  const {channel, token, platform} = params;
  const [data, setData] = useState<SubAccount[]>([]);
  const isFocused = useIsFocused();
  const keyNicknameByApp: Record<CHANNEL_TYPE, keyof SubAccount> = {
    tiktok: 'nickname',
    shopee: 'shopee_username',
  };

  useEffect(() => {
    if (!isFocused) return;
    (async () => {
      try {
        const Platform = PlatformFactory.createPlatform(token, platform);
        if (!channel) {
          setData([]);
          return;
        }
        const res = await Platform.getSubAccounts(channel);
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
  }, [channel, token, platform, isFocused]);
  return {
    subAccounts: data.map(item => ({
      ...item,
      nickname: item?.[keyNicknameByApp?.[channel]],
    })),
  };
};
