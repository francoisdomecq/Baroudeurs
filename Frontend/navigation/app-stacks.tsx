import React, { useEffect } from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
  StackNavigationProp
} from '@react-navigation/stack';

import Map from '../screens/MapScreen/Screen';
import User from '../screens/User';
import Details from '../screens/Details';
import Quete from '../screens/Quetes';

// Define view (screen) names and associated params
// Enables type checking and code completion for views
// undefined = no params passed to view
export type RootStackParamList = {
  Map: undefined;
  User: undefined;
  Quete: undefined;
  Details: { markerId: number };
};

export interface NavigationProps {
  navigation: StackNavigationProp<RootStackParamList, any>;
}

const stackScreenOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: '#46B82F'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold'
  },
  headerTitleAlign: 'center'
};

const stackScreenOptionsBis: StackNavigationOptions = {
  headerShown: false
};

//Stack du fil d'actualité. Depuis le fil d'actualité on peut naviguer vers l'écran Publication
const MapStack = createStackNavigator<RootStackParamList>();
export const MapStackScreen = () => {
  return (
    <MapStack.Navigator screenOptions={{ headerShown: false }}>
      <MapStack.Screen
        name="Map"
        // options={{ title: "Fil d'actualité" }}
        component={Map}
      />
      <MapStack.Screen name="User" component={User} />
      <MapStack.Screen name="Details" component={Details} />
    </MapStack.Navigator>
  );
};

const UserStack = createStackNavigator<RootStackParamList>();
export const UserStackScreen = () => {
  return (
    <MapStack.Navigator screenOptions={stackScreenOptions}>
      <MapStack.Screen
        name="User"
        options={{ title: 'Profil' }}
        component={User}
      />
    </MapStack.Navigator>
  );
};

const QueteStack = createStackNavigator<RootStackParamList>();
export const QueteStackScreen = () => {
  return (
    <MapStack.Navigator screenOptions={stackScreenOptions}>
      <MapStack.Screen
        name="Quete"
        // options={{ title: "Fil d'actualité" }}
        component={Quete}
      />
    </MapStack.Navigator>
  );
};
