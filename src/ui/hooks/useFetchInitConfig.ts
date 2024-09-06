import {useEffect, useState} from 'react';
import {CHANEL_TYPE, PLATFORM_TYPE} from '../../platform/type';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  workAccount: '803733',
  stopAfterSuccess: 9999,
  stopAfterError: 9999,
  timeDelay: 5,
};
export const useFetchInitConfig = () => {
  const [data, setData] = useState(initData);
  const saveConfig = async (config: CONFIG_TYPE) => {
    await AsyncStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  };
  const alterConfig = async ({
    key,
    value,
  }: {
    key: keyof CONFIG_TYPE;
    value: any;
  }) => {
    setData(prev => ({...prev, [key]: value}));
    await saveConfig(data);
  };
  const getInitData = async () => {
    try {
      const config = await AsyncStorage.getItem(CONFIG_KEY);
      if (config) {
        setData(JSON.parse(config));
        return;
      }
      setData(initData);
    } catch (error) {
      setData(initData);
    }
  };
  useEffect(() => {
    getInitData();
  }, []);
  return {
    initConfig: data,
    saveConfig,
    alterConfig,
  };
};
