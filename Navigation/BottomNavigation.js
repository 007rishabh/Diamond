import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import History from "../screens/History";
import Home from "../screens/Home";
import News from "../screens/News";
import Setting from "../screens/Setting";
import Trade from "../screens/Trade";
const BottomNavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;
          if (rn === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === "Setting") {
            iconName = focused ? "settings" : "settings-outline";
          } else if (rn === "News") {
            iconName = focused ? "newspaper" : "newspaper-outline";
          } else if (rn === "Trade") {
            iconName = focused ? "arrow-up-circle" : "arrow-up-circle-outline";
          } else if (rn === "History") {
            iconName = focused ? "calendar-clear" : "calendar-clear-outline";
          }
          return <Ionicons name={iconName} size={30} color={"black"} />;
        },
        tabBarStyle: { backgroundColor: "#dfe6e9", position: "absolute" },
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontSize: 12, color: "black" },
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen
        name={"Home"}
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={"Trade"}
        component={Trade}
        options={{
          title: "Products",
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "black" },
        }}
      />
      <Tab.Screen
        name={"News"}
        component={News}
        options={{
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "black" },
        }}
      />
      <Tab.Screen
        name={"History"}
        component={History}
        options={{
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "black" },
        }}
      />
      <Tab.Screen
        name={"Setting"}
        component={Setting}
        options={{
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "black" },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
