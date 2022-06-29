import React from 'react';
import {
  BottomTabBarOptions,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import {
  RootStackParamList,
  MapStackScreen,
  UserStackScreen,
  QueteStackScreen
} from './app-stacks';
import UserScreen from '../screens/User';

const getTabBarIcon = (
  route: { name: string },
  focused: boolean,
  color: string
) => {
  const icons: {
    [key: string]: 'map' | 'person' | 'book';
  } = {
    Map: 'map',
    User: 'person',
    Quete: 'book'
  };
  return <Ionicons name={icons[route.name]} size={25} color={color} />;
};

const tabBarOptions: BottomTabBarOptions = {
  style: {
    backgroundColor: '#46B82F'
  },
  activeTintColor: '#fff',
  inactiveTintColor: '#000000',
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
          options={{ title: 'Map' }}
          name="Map"
          component={MapStackScreen}
        />
        <Tab.Screen
          options={{ title: 'Quetes' }}
          name="Quete"
          component={QueteStackScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
