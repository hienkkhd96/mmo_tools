import {Linking, PermissionsAndroid} from 'react-native';

export const openOtherApp = (url: string) => {
  Linking.openURL(url);
};
export const checkAppInstalled = async (urlSchema: string) => {
  try {
    return Linking.canOpenURL(urlSchema);
  } catch (error) {
    console.error('Error checking app installation:', error);
    return false;
  }
};
export const openPlayStore = (packageName: string) => {
  const url = `market://details?id=${packageName}`;

  Linking.canOpenURL(url)
    .then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.error('Cannot open URL');
      }
    })
    .catch(error => {
      console.error('Error opening URL:', error);
    });
};

export async function requestOverlayPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.SYSTEM_ALERT_WINDOW,
      {
        title: 'Overlay Permission',
        message: 'App cần quyền overlay để hiển thị trên các ứng dụng khác.',
        buttonNeutral: 'Hỏi lại sau',
        buttonNegative: 'Từ chối',
        buttonPositive: 'Đồng ý',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Quyền overlay được cấp');
    } else {
      console.log('Quyền overlay bị từ chối');
      // Mở màn hình cài đặt để người dùng cấp quyền
      Linking.openSettings();
    }
  } catch (err) {
    console.warn(err);
  }
}
