import { Linking } from 'react-native';
export const openOtherApp = (url: string) => {
    Linking.canOpenURL(url)
        .then((supported) => {
            if (supported) {
                return Linking.openURL(url);
            } else {
                console.log(`Don't know how to open URI: ${url}`);
            }
        })
        .catch((err) => console.error('An error occurred', err));
};
