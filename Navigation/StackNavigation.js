import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Login from '../screens/Login';
import Register from '../screens/Register';
import Product from '../screens/Product'
import BottomNavigation from './BottomNavigation';
const StackNavigation = () => {
    const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name='Register' component={Register} options={{headerShown:false}}/>
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
      <Stack.Screen name="HomeScreen" component={BottomNavigation} options={{headerShown:false}}/>
      <Stack.Screen name ="Product" component={Product} options={{headerShown:false}}/>
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default StackNavigation