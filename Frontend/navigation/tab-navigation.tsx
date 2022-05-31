import React, { useState } from 'react';
import {
  BottomTabBarOptions,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';

import {
  RootStackParamList,
  MapStackScreen,
  UserStackScreen
} from './app-stacks';
import UserScreen from '../screens/User';

const getTabBarIcon = (
  route: { name: string },
  focused: boolean,
  color: string
) => {
  const icons: {
    [key: string]: 'home';
  } = {
    Map: 'home'
  };
  return <Ionicons name={icons[route.name]} size={25} color={color} />;
};

const tabBarOptions: BottomTabBarOptions = {
  style: {
    backgroundColor: '#C0E8F7'
  },
  activeTintColor: '#2196F3',
  inactiveTintColor: '#191716',
  labelStyle: {
    fontSize: 10
  }
};

const Tab = createBottomTabNavigator<RootStackParamList>();

export function TabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={tabBarOptions}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) =>
            getTabBarIcon(route, focused, color)
        })}
      >
        <Tab.Screen
          options={{ title: 'Map', tabBarVisible: false }}
          name="Map"
          component={MapStackScreen}
        />
        <Tab.Screen
          options={{ title: 'User', tabBarVisible: true }}
          name="User"
          component={UserScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
