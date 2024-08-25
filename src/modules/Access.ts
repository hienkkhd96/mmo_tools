import {NativeModules} from 'react-native';

const {AccessibilityModule} = NativeModules;

export function clickOnOtherApp() {
  AccessibilityModule.clickButtonOnOtherApp();
}
export function sendDataToAccess(data: any) {
  AccessibilityModule.sendDataToNative(JSON.stringify(data));
}
export function stopAutoCollect() {
  AccessibilityModule.stopAutoCollect();
}
