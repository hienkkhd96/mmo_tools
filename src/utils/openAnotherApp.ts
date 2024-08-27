import {Linking} from 'react-native';
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
