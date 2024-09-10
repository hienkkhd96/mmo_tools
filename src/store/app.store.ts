import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import {create} from 'zustand';
import {jwtDecode} from 'jwt-decode';
import {tokenApi} from '../api/token';

type AppState = {
  token: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  expiredAt: Date;
  fetchToken: () => Promise<void>;
  setToken: (data: Partial<AppState>) => Promise<void>;
  logout: () => Promise<void>;
};
export const useAppStore = create<AppState>(set => ({
  token: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  expiredAt: dayjs().toDate(),
  fetchToken: async () => {
    try {
      const accessToken = await AsyncStorage.getItem('access_token');
      if (accessToken) {
        const decoded: any = jwtDecode(accessToken);
        if (!decoded.tokenKey) {
          throw new Error('Token không hợp lê');
        }
        if (dayjs().isAfter(dayjs.unix(decoded.exp))) {
          throw new Error('Token đã hết hạn');
        }
        const tokenInfo = await tokenApi.getInfoToken(decoded.tokenKey);
        const dataToken = tokenInfo.data;
        set({
          accessToken: accessToken,
          isAuthenticated: true,
          token: decoded.tokenKey,
          expiredAt: dayjs(dataToken.expiredAt).toDate(),
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
  logout: async () => {
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('refresh_token');
    await AsyncStorage.removeItem('app-token');
    set({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      token: null,
    });
  },
}));
