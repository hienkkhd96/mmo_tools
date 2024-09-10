import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import AccountList from './AccountList';
import PlatformList from './PlatformList';

type Props = {};

const PlatformScreen = (props: Props) => {
  const AccountStack = createNativeStackNavigator();

  return (
    <AccountStack.Navigator
      screenOptions={{
        statusBarHidden: false,
        headerShown: false,
        statusBarTranslucent: true,
        statusBarColor: 'transparent',
        statusBarStyle: 'dark',
      }}>
      <AccountStack.Screen name="platforms" component={PlatformList} />
      <AccountStack.Screen
        name="accounts"
        component={AccountList}
        options={{
          headerShown: true,
          headerTitle: 'Quản lý tài khoản',
          headerTitleAlign: 'center',
        }}
      />
    </AccountStack.Navigator>
  );
};

export default PlatformScreen;
