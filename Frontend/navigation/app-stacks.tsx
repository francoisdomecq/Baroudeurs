import React, { useEffect } from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
  StackNavigationProp
} from '@react-navigation/stack';

import Map from '../screens/Map';
import User from '../screens/User';

// Define view (screen) names and associated params
// Enables type checking and code completion for views
// undefined = no params passed to view
export type RootStackParamList = {
  Map: undefined;
  User: undefined;
};

export interface NavigationProps {
  navigation: StackNavigationProp<RootStackParamList, any>;
}

const stackScreenOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: '#C0E8F7'
  },
  headerTintColor: '#2196F3',
  headerTitleStyle: {
    fontWeight: 'bold'
  },
  headerTitleAlign: 'center'
};

//Stack du fil d'actualité. Depuis le fil d'actualité on peut naviguer vers l'écran Publication
const MapStack = createStackNavigator<RootStackParamList>();
export const MapStackScreen = () => {
  return (
    <MapStack.Navigator screenOptions={stackScreenOptions}>
      <MapStack.Screen
        name="Map"
        // options={{ title: "Fil d'actualité" }}
        component={Map}
      />
      <MapStack.Screen name="User" component={User} />
    </MapStack.Navigator>
  );
};

const UserStack = createStackNavigator<RootStackParamList>();
export const UserStackScreen = () => {
  return (
    <MapStack.Navigator screenOptions={stackScreenOptions}>
      <MapStack.Screen
        name="User"
        // options={{ title: "Fil d'actualité" }}
        component={User}
      />
    </MapStack.Navigator>
  );
};
