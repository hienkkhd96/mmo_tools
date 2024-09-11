import React, {useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PaperProvider} from 'react-native-paper';
import Login from './src/ui/login';
import Bottomnavigation from './src/ui/navigation/Bottom';
import Register from './src/ui/register';
import SnackBarGlobal from './src/components/snackbar';
import {View} from 'react-native';
import LoginByKey from './src/ui/login/LoginByKey';
import {useAppStore} from './src/store/app.store';
import GlobalDialog from './src/components/dialog';
import LoginGolikeWebView from './src/ui/home/Platform/LoginGolikeWebView';
function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  const [isLoading, setIsLoading] = useState(false);
  const appStore = useAppStore();
  const isAuthenticated = useAppStore(state => state.isAuthenticated);

  const fetchInitData = async () => {
    setIsLoading(true);
    await appStore.fetchToken();
    setIsLoading(false);
  };
  useEffect(() => {
    fetchInitData();
  }, []);
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            statusBarHidden: false,
            headerShown: false,
            statusBarTranslucent: true,
            statusBarColor: 'transparent',
            statusBarStyle: 'dark',
          }}>
          {isAuthenticated ? (
            <>
              <Stack.Screen name="home" component={Bottomnavigation} />
              <Stack.Screen name="account/:id" component={Bottomnavigation} />
              <Stack.Screen
                name="login-golike"
                component={LoginGolikeWebView}
              />
            </>
          ) : (
            <>
              <Stack.Screen name="login" component={LoginByKey} />
              <Stack.Screen name="register" component={Register} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <GlobalDialog />
      <View style={{position: 'absolute', top: 120, left: 0, right: 0}}>
        <SnackBarGlobal />
      </View>
    </PaperProvider>
  );
}

export default App;
