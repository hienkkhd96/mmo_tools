import { Linking } from 'react-native';
export const openOtherApp = (url: string) => {
    Linking.openURL(url);
};
