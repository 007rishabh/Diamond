import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Product from "../screens/Product";
import BottomNavigation from "./BottomNavigation";
import Admin from "../screens/Admin";
import User from "../screens/User";
import AddDiamond from "../screens/AddDiamond";
import AddNews from "../screens/AddNews";
import ShowNews from "../screens/ShowNews";
import ShowUsers from "../screens/ShowUser";
import ShowProducts from "../screens/ShowProducts";
import Trade from "../screens/Trade";
import AdminShowProducts from "../screens/AdminShowProduct";
import News from "../screens/News";
import Bank from "../screens/Bank";
import UserWallet from "../screens/UserWallet";
import Pending from "../screens/Pending";
import Portfolio from "../screens/Portfolio";
import PendingPayments from "../screens/PendingPayments";
import ForgetPassword from "../screens/ForgetPassword";
import TC from "../screens/TC";
import Profile from "../screens/Profile";
const StackNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={BottomNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Product"
          component={Product}
          options={{
            title: " Product",
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: "black" },
          }}
        />
        <Stack.Screen
          name="Admin"
          component={Admin}
          options={{
            title: "Admin",
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: "black" },
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="User"
          component={User}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddDiamond"
          component={AddDiamond}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddNews"
          component={AddNews}
          options={{
            title: " News",
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: "black" },
          }}
        />
        <Stack.Screen
          name="ShowNews"
          component={ShowNews}
          options={{
            title: "News",
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: "black" },
          }}
        />
        <Stack.Screen
          name="ShowUsers"
          component={ShowUsers}
          options={{ title: "Users" }}
        />
        <Stack.Screen
          name="ShowProducts"
          component={ShowProducts}
          options={{
            title: "ShowProducts",
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: "black" },
          }}
        />
        <Stack.Screen
          name="AdminShowProduct"
          component={AdminShowProducts}
          options={{
            title: "Products",
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: "black" },
          }}
        />
        <Stack.Screen
          name="News"
          component={News}
          options={{ title: "News" }}
        />
        <Stack.Screen
          name="Bank"
          component={Bank}
          options={{
            title: "Bank",
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: "black" },
          }}
        />
        <Stack.Screen
          name="UserWallet"
          component={UserWallet}
          options={{
            title: "User Wallet",
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: "black" },
          }}
        />
        <Stack.Screen
          name="Pending"
          component={Pending}
          options={{
            title: "Pending Request",
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: "black" },
          }}
        />
        <Stack.Screen
          name="Portfolio"
          component={Portfolio}
          options={{
            title: "My Products",
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: "black" },
          }}
        />
        <Stack.Screen
          name="PendingPayments"
          component={PendingPayments}
          options={{
            title: "Pending Payments",
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: "black" },
          }}
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
          options={{
            title: "Forget Password",
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: "black" },
          }}
        />
        <Stack.Screen
          name="TC"
          component={TC}
          options={{
            title: "Terms & Conditons",
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: "black" },
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: "Profile",
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: "black" },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
