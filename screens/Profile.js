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
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
      }}
    >
      <LinearGradient
        colors={["#36A7E6", "#073854"]}
        style={styles.background}
      />
      <Text style={{ fontSize: 30, fontWeight: "bold", color: "#fff" }}>
        Profile
      </Text>
      <View>
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
      <TextInput
        placeholder="Name"
        style={{
          backgroundColor: "#fff",
          height: 40,
          width: "80%",
          borderRadius: 10,
          padding: 10,
        }}
      />
      <TextInput
        placeholder="Email"
        style={{
          backgroundColor: "#fff",
          height: 40,
          width: "80%",
          borderRadius: 10,
          padding: 10,
        }}
      />
      <Text style={{ fontSize: 30, fontWeight: "bold", color: "#fff" }}>
        Balance & Products
      </Text>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Text>{portfolio?.wallet_amount ?? 0}</Text>
        <Text>{countOfProducts ?? 0}</Text>

        <TextInput
          placeholder="Produce"
          style={{
            backgroundColor: "#fff",
            height: 80,
            width: "40%",
            borderRadius: 10,
            textAlign: "center",
          }}
        />
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
