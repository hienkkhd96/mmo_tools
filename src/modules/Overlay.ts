import {NativeEventEmitter, NativeModules} from 'react-native';
import {clickOnOtherApp} from './Access';

const {OverlayModule} = NativeModules;
const overlayEmitter = new NativeEventEmitter(OverlayModule);

function setupListeners() {
  overlayEmitter.addListener('onStartEvent', async () => {
    clickOnOtherApp('com.ss.android.ugc.trill:id/cu9');
  });

  overlayEmitter.addListener('onStopEvent', () => {
    console.log('Stop button clicked!');
    overlayEmitter.removeAllListeners('onStartEvent');
  });
}

// Don't forget to remove listeners when they are no longer needed

// Call setupListeners when you need to start listening
setupListeners();

export default OverlayModule;
