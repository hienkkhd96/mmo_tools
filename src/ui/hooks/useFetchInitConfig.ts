import {useEffect, useState} from 'react';
import {CHANEL_TYPE, PLATFORM_TYPE} from '../../platform/type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {useFetchAccount} from './useFetchAccounts';
export const CONFIG_KEY = 'config_key_V1';
export type CONFIG_TYPE = {
  platform: PLATFORM_TYPE;
  platformAccount: string;
  chanel: CHANEL_TYPE;
  workAccount: string;
  stopAfterSuccess: number;
  stopAfterError: number;
  timeDelay: number;
};
const initData: CONFIG_TYPE = {
  platform: PLATFORM_TYPE.GOLIKE,
  platformAccount: '',
  chanel: CHANEL_TYPE.TIKTOK,
  workAccount: '',
  stopAfterSuccess: 9999,
  stopAfterError: 9999,
  timeDelay: 5,
};
export const useFetchInitConfig = () => {
  const [data, setData] = useState<CONFIG_TYPE>(initData);
  const isFocused = useIsFocused();
  const {accounts} = useFetchAccount({
    platform: data.platform,
  });
  const saveConfig = async (config: CONFIG_TYPE) => {
    await AsyncStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  };
  const alterConfig = async ({
    key,
    value,
  }: {
    key: keyof CONFIG_TYPE;
    value: CONFIG_TYPE[keyof CONFIG_TYPE];
  }) => {
    setData(prev => ({...prev, [key]: value}));
    await saveConfig({...data, [key]: value});
  };
  const getInitData = async () => {
    if (!isFocused) return;
    try {
      const config = await AsyncStorage.getItem(CONFIG_KEY);
      if (config) {
        const configData = JSON.parse(config);
        if (!accounts || accounts.length === 0) {
          setData({...configData, platformAccount: ''});
          return;
        }
        if (
          accounts.some(account => account.token === configData.platformAccount)
        ) {
          setData(configData);
        } else {
          setData({...configData, platformAccount: accounts[0].token});
        }
      } else {
        setData(initData);
      }
    } catch (error) {
      setData(initData);
    }
  };
  useEffect(() => {
    getInitData();
  }, [isFocused]);
  return {
    initConfig: data,
    saveConfig,
    alterConfig,
    accounts,
  };
};
