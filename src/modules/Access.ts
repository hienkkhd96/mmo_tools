import {NativeModules} from 'react-native';

const {AccessibilityModule} = NativeModules;

export function clickOnOtherApp(id: string) {
  AccessibilityModule.clickButtonOnOtherApp(id);
}
export function sendDataToAccess(id: string) {
  AccessibilityModule.sendDataToNative(id);
}
