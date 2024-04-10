import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Home from '../screens/Home'
import History from '../screens/History'
import News from '../screens/New'
import Setting from '../screens/Setting'
import Trade from '../screens/Trade'
import {NavigationContainer} from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
const BottomNavigation = () => {
    const Tab = createBottomTabNavigator()
  return (
    
    <Tab.Navigator 
    screenOptions={({route})=>({
      tabBarIcon:({focused,color,size})=>{
          let iconName;
          let rn = route.name;
          if(rn==='Home'){
            iconName = focused ? 'home' : 'home-outline'
          }else if (rn ==='Setting'){
            iconName = focused ? 'settings' : 'settings-outline'
          }else if (rn ==='News'){
            iconName = focused ? 'newspaper' : 'newspaper-outline'
          }
          else if (rn ==='Trade'){
            iconName = focused ? 'arrow-up-circle' : 'arrow-up-circle-outline'
          }
          else if (rn ==='History'){
            iconName = focused ? 'calendar-clear' : 'calendar-clear-outline'
          }
          return <Ionicons name={iconName} size={30} color={'black'}/>
      },
      tabBarStyle:{backgroundColor:'#0984e3',position:'absolute'},
      tabBarShowLabel: false ,
      tabBarHideOnKeyboard:true,
    })}>
        <Tab.Screen name={"Home"} component={Home}/> 
        <Tab.Screen name={"Trade"} component={Trade}/> 
        <Tab.Screen name={"News"} component={News}/> 
        <Tab.Screen name={"History"} component={History}/> 
        <Tab.Screen name={"Setting"} component={Setting}/> 
    </Tab.Navigator>
   
  )
}

export default BottomNavigation