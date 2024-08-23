import { NativeModules } from 'react-native';

const { AccessibilityModule } = NativeModules;

export function clickOnOtherApp(id: string) {
  AccessibilityModule.clickButtonOnOtherApp(id);
}
