import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Login from '../screens/Login';
import Register from '../screens/Register';
import Product from '../screens/Product'
import BottomNavigation from './BottomNavigation';
import Admin from '../screens/Admin';
import User from '../screens/User';
import AddDiamond from '../screens/AddDiamond';
import AddNews from '../screens/AddNews';
import ShowNews from '../screens/ShowNews';
import ShowUsers from '../screens/ShowUser';
import ShowProducts from '../screens/ShowProducts';
import Trade from '../screens/Trade';
import AdminShowProducts from '../screens/AdminShowProduct';
const StackNavigation = () => {
    const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name='Register' component={Register} options={{headerShown:false}}/>
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
      <Stack.Screen name="HomeScreen" component={BottomNavigation} options={{headerShown:false}}/>
      <Stack.Screen name ="Product" component={Product} options={{headerShown:false}}/>
      <Stack.Screen name ="Admin" component={Admin} options={{headerShown:false}}/>
      <Stack.Screen name ="User" component={User} options={{headerShown:false}}/>
      <Stack.Screen name ="AddDiamond" component={AddDiamond} options={{headerShown:false}}/>
      <Stack.Screen name ="AddNews" component={AddNews} options={{title:' News'}}/>
      <Stack.Screen name ="ShowNews" component={ShowNews} options={{title:'News'}}/>      
      <Stack.Screen name ="ShowUsers" component={ShowUsers} options={{title:'Users'}}/>      
      <Stack.Screen name ="ShowProducts" component={ShowProducts} options={{title:'ShowProducts'}}/>      
      <Stack.Screen name ="AdminShowProduct" component={AdminShowProducts} options={{title:'Products'}}/>      
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default StackNavigation