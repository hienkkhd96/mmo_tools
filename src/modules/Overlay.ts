import { NativeEventEmitter, NativeModules } from 'react-native';
import { clickOnOtherApp } from './Access';

const { OverlayModule } = NativeModules;
const overlayEmitter = new NativeEventEmitter(OverlayModule);

function setupListeners() {
  overlayEmitter.addListener('onStartEvent', () => {
    clickOnOtherApp('com.ss.android.ugc.trill:id/cu9');
    console.log('Start button clicked!');
  });

  overlayEmitter.addListener('onStopEvent', () => {
    console.log('Stop button clicked!');
    // Handle the event here
  });
}

// Don't forget to remove listeners when they are no longer needed

// Call setupListeners when you need to start listening
setupListeners();

export default OverlayModule;
