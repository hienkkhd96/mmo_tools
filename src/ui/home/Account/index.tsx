import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PlatformList from './PlatformList';
import AccountList from './AccountList';

type Props = {};

const AccountScreen = (props: Props) => {
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

export default AccountScreen;

const styles = StyleSheet.create({});
