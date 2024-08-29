import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosClient = axios.create({
  // baseURL:
  //   ' https://c18b-2405-4802-5edf-81d0-bcc7-f02e-3d5c-7b63.ngrok-free.app/v1/',
  baseURL: 'http://10.0.2.2:8000/v1/',

  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  async function (config) {
    const accessToken = await AsyncStorage.getItem('access_token');

    // Do something before request is sent
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);
export default axiosClient;
