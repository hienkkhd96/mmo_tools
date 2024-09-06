import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import authApi from '../api/auth';
import dayjs from 'dayjs';
import DeviceInfo from 'react-native-device-info';

type AppState = {
  token: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  expiredAt: Date;
  fetchToken: () => Promise<void>;
  setToken: (data: Partial<AppState>) => Promise<void>;
};
export const useAppStore = create<AppState>(set => ({
  token: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  expiredAt: dayjs().toDate(),
  fetchToken: async () => {
    try {
      const token = await AsyncStorage.getItem('app-token');
      if (!token) {
        return;
      }
      const deviceId = await DeviceInfo.getUniqueId();
      const res = await authApi.loginByKey(token, deviceId);
      const data = res?.data?.token;
      const expiredAt = res?.data?.expiredAt;
      if (res.status === 200 && data?.accessToken && data?.refreshToken) {
        await AsyncStorage.setItem('access_token', data?.accessToken);
        await AsyncStorage.setItem('refresh_token', data?.refreshToken);
        const {accessToken, refreshToken} = data;
        set({
          token: token,
          accessToken: accessToken,
          refreshToken: refreshToken,
          isAuthenticated: true,
          expiredAt,
        });
        return;
      } else {
        throw new Error('Token không hợp lê');
      }
    } catch (error) {
      set({accessToken: null, refreshToken: null, isAuthenticated: false});
    }
  },
  setToken: async ({
    token,
    accessToken,
    refreshToken,
    expiredAt,
  }: Partial<AppState>) => {
    if (!accessToken || !refreshToken || !token) {
      return;
    }
    await AsyncStorage.setItem('app-token', token);
    await AsyncStorage.setItem('access_token', accessToken);
    await AsyncStorage.setItem('refresh_token', refreshToken);
    set({token, accessToken, refreshToken, isAuthenticated: true, expiredAt});
  },
}));
