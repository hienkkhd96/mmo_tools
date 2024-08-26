import {NativeEventEmitter, NativeModules} from 'react-native';
import {clickOnOtherApp, stopAutoCollect} from './Access';

const {OverlayModule} = NativeModules;
const overlayEmitter = new NativeEventEmitter(OverlayModule);

function setupListeners() {
  overlayEmitter?.addListener('onStartEvent', async () => {
    clickOnOtherApp();
  });

  overlayEmitter?.addListener('onStopEvent', () => {
    stopAutoCollect();
  });
}

// Don't forget to remove listeners when they are no longer needed
// Call setupListeners when you need to start listening
setupListeners();

export default OverlayModule;
