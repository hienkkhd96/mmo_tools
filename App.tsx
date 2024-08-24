import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PaperProvider} from 'react-native-paper';
import Login from './src/ui/login';
import Bottomnavigation from './src/ui/navigation/Bottom';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
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
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="home" component={Bottomnavigation} />
          <Stack.Screen name="account/:id" component={Bottomnavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
