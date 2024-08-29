import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CommonActions} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {BottomNavigation} from 'react-native-paper';
import FeaIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLOR} from '../../constant';
import ReportScreen from '../home/Report';
import SettingScreen from '../home/Setting';
import AccountScreen from '../home/Account';

const Tab = createBottomTabNavigator();

export default function Bottomnavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          elevation: 1,
          shadowColor: 'red',
          shadowOpacity: 1,
          borderTopWidth: 1,
          borderTopColor: 'rgb(256,0,0)',
        },
      }}
      tabBar={({navigation, state, descriptors, insets}) => (
        <BottomNavigation.Bar
          key={1}
          navigationState={state}
          style={{
            backgroundColor: COLOR.light,
            elevation: 100,
          }}
          onTabPress={({route, preventDefault}) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({route, focused, color}) => {
            const {options} = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({focused, color, size: 24});
            }

            return null;
          }}
          renderTouchable={({key, ...props}: any) => (
            <TouchableOpacity key={key} {...props} />
          )}
          getLabelText={({route}) => {
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            return label as string;
          }}
        />
      )}>
      <Tab.Screen
        name="Cấu hình"
        key="config"
        component={SettingScreen}
        options={{
          tabBarIcon: ({color, size}) => {
            return (
              <FeaIcon key="layout" name="layout" size={size} color={color} />
            );
          },
        }}
      />
      {/* <Tab.Screen
        name="Báo cáo"
        key="settings"
        component={ReportScreen}
        options={{
          tabBarIcon: ({color, size}) => {
            return (
              <Icon
                key="clock"
                name="clock-time-eight-outline"
                size={size}
                color={color}
              />
            );
          },
        }}
      /> */}
      <Tab.Screen
        name="Nền tảng"
        component={AccountScreen}
        options={{
          tabBarIcon: ({color, size}) => {
            return (
              <Icon
                key="platform"
                name="database-cog-outline"
                size={size}
                color={color}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
