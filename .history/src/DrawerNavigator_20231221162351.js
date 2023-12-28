// DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MovieManagementScreen from '../src';
import ShowtimeManagementScreen from '../src';
import UserManagementScreen from './UserManagementScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="MovieManagement">
      <Drawer.Screen name="MovieManagement" component={MovieManagementScreen} />
      <Drawer.Screen name="ShowtimeManagement" component={ShowtimeManagementScreen} />
      <Drawer.Screen name="UserManagement" component={UserManagementScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
