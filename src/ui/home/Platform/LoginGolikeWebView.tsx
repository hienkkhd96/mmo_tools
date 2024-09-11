import {useNavigation} from '@react-navigation/native';
import React, {useRef} from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';

const LoginGolikeWebView = () => {
  const webviewRef = useRef<any>(null);
  const navigation = useNavigation<any>();
  // Hàm để tự động đăng nhập và lấy local storage
  const handleLoginAndGetData = () => {
    if (webviewRef.current) {
      webviewRef.current.injectJavaScript(`
            (function () {
      const hanldeGetLocal = function () {
        // Lấy dữ liệu từ local storage sau khi đăng nhập
        let data = {};
        for (let i = 0; i < localStorage.length; i++) {
          let key = localStorage.key(i);
          data[key] = localStorage.getItem(key);
        }
        const token = JSON.parse(data.vuex).token;
        if (token) {
            localStorage.clear();
            setTimeout(() => {
              window.ReactNativeWebView.postMessage(JSON.stringify(token));
            }, 2000);
            clearInterval(timer);
        }
      };
      timer = setInterval(hanldeGetLocal, 1000);
      
    })();
      `);
    }
  };

  const onMessage = (event: any) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data) {
      navigation.navigate('accounts', {
        token: data,
        platformKey: 'golike',
        platformName: 'Golike',
      });
    }
  };

  return (
    <View style={{flex: 1}}>
      <WebView
        ref={webviewRef}
        source={{uri: 'https://app.golike.net/login'}} // Thay đổi URL phù hợp với trang đăng nhập của bạn
        onMessage={onMessage}
        onLoad={handleLoginAndGetData}
        style={{flex: 1}}
        on
      />
    </View>
  );
};

export default LoginGolikeWebView;
