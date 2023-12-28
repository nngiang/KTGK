import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login, Register, ForgotPassword, Account, HomeScreen, MovieDetailScreen} from '../screen';
import {BookingScreen} from '../screen'
import {PaymentScreen} from '../screen'
import {AdminScreen} from '../src'
import {NowShowingScreen} from '../screen'




const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="NowShowingScreen" component={NowShowingScreen} />
     
        
      
        <Stack.Screen name="AdminScreen" component={AdminScreen} />
        <Stack.Screen name="Account" component={Account} />
        
          
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthNavigation;
