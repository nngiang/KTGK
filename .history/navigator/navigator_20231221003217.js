// MainNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {HomeScreen,Register, ForgotPassword, Account} from '../screen';
import firestore from '@react-native-firebase/firestore';
import AdminScreen from '../src'; // Màn hình Admin


const Stack = createNativeStackNavigator();

const MainNavigator = ({ user }) => {
  return (
    <Stack.Navigator>
      {user.isAdmin ? (
        // Người dùng là admin, hiển thị màn hình Admin
        <Stack.Screen name="Admin" component={AdminScreen} />
      ) : (
        // Người dùng không phải admin, hiển thị các màn hình khác
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Account" component={Account} />
          {/* Thêm các màn hình khác nếu cần */}
   
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;
