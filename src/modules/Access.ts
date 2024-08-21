import {NativeModules} from 'react-native';

const {YourAccessibilityService} = NativeModules;

export function clickOnOtherApp(id: string) {
  YourAccessibilityService.performClick('id');
}
