import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { EvilIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseurl } from "../Constant";
const Profile = () => {
  const isFocused = useIsFocused();
  const [userInfo, setUserInfo] = useState({});
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    const getPortfolio = async () => {
      const userId = await AsyncStorage.getItem("userId");
      const result = await axios.get(`${baseurl}/portfolio/${userId}`);
      console.log("portfolio", result);
      setPortfolio(result.data);
    };
    const getUserInfo = async () => {
      console.log("getting user info");
      const userId = await AsyncStorage.getItem("userId");
      console.log({ userId });
      if (!userId) {
        ToastAndroid.show("User not logged in", ToastAndroid.SHORT);
        return;
      }
      const url = `${baseurl}/users/info/${userId}`;
      const result = await axios.get(url);
      console.info(result.data);
      setUserInfo(result.data);
    };
    getUserInfo();
    getPortfolio();
  }, [isFocused]);

  const countOfProducts = portfolio?.products?.reduce(
    (acc, curr) => acc + curr.quantity,
    0
  );
  return (
    <View
      style={{
        flex: 1,
        
      }}
    >
      <LinearGradient
        colors={["#36A7E6", "#073854"]}
        style={styles.background}
      />
      
      <View style={{height:550,width:350,backgroundColor:'#dfe6e9',borderRadius:10,alignItems:'center',justifyContent:'center',marginTop:100,marginLeft:30}}>
     
      <Text style={{ fontSize: 30, fontWeight: "bold" }}>
        Profile
      </Text>
      <View style={{padding:10}}>
        {userInfo.profile_image?.url ? (
          <Image
            source={{
              uri: userInfo.profile_image.url,
            }}
            style={{
              borderRadius: 10,
              width: 100,
              height: 100,
            }}
            alt="image"
          />
        ) : (
          <EvilIcons name="user" size={200} color="white" />
        )}
      </View>
      <View style={{gap:10,width:'80%'}}>
      <View style={{flexDirection:'row',gap:10,backgroundColor:'#fff',width:'100%',padding:20,borderRadius:10}}>
      <Text style={{fontSize:20,fontWeight:'bold'}}>Name:</Text>
      <Text style={{fontSize:20,fontWeight:'bold'}}>{userInfo.username }</Text>
      </View>
      <View style={{flexDirection:'row',padding:20,gap:10,backgroundColor:'#fff',borderRadius:10}}>
      <Text style={{fontSize:20,fontWeight:'bold'}}>Email:</Text>
      <Text style={{fontSize:20,fontWeight:'bold'}}>{userInfo.email}</Text>
      </View>
      </View>
      <Text style={{fontSize:20,fontWeight:'bold'}}>Balance & Products</Text>
      <View style={{flexDirection:'row',gap:10,padding:10}}>
      <View style={{height:100,width:140,backgroundColor:'#fff',borderRadius:10,alignItems:'center',justifyContent:'center'}}>
      <Text style={{fontSize:20,fontWeight:'bold'}}>{portfolio?.wallet_amount ?? 0}</Text>
      </View>
      <View style={{height:100,width:140,backgroundColor:'#fff',borderRadius:10,alignItems:'center',justifyContent:'center'}}>
      <Text style={{fontSize:20,fontWeight:'bold'}}>{countOfProducts ?? 0}</Text>
      </View>
      </View>
      </View>
      </View>
      
    );
    
};

export default Profile;

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
});
