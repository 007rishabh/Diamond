import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";

import { LinearGradient } from "expo-linear-gradient";
import { EvilIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseurl } from "../Constant";
import { LoadingIndicator } from "../components/LoadingIndicator";
const Profile = () => {
  const isFocused = useIsFocused();
  const [userInfo, setUserInfo] = useState({});
  const [portfolio, setPortfolio] = useState(null);
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingUserInfo, setFetchingUserInfo] = useState(false);

  const getPortfolio = async () => {
    const userId = await AsyncStorage.getItem("userId");
    const result = await axios.get(`${baseurl}/portfolio/${userId}`);
    console.log("portfolio", result.data);
    setPortfolio(result.data);
  };
  const getUserInfo = async () => {
    try {
      setFetchingUserInfo(true);
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
      setUserName(result.data.username);
    } catch (error) {
      console.error(error);
    } finally {
      setFetchingUserInfo(false);
    }
  };
  useEffect(() => {
    getUserInfo();
    getPortfolio();
  }, [isFocused]);

  const editProfileHandler = async () => {
    try {
      setLoading(true);
      const userId = await AsyncStorage.getItem("userId");
      const url = `${baseurl}/users/info/${userId}`;
      const formData = new FormData();
      if (image) {
        formData.append("image", {
          uri: image.uri,
          name: image.fileName,
          type: image.mimeType,
        });
      }
      formData.append("username", userName);
      console.log("formData", formData);
      const result = await axios.put(url, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(result.data);
      getUserInfo();
    } catch (error) {
      console.error(error?.response);
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0];

      if (selectedImage.fileSize > 40000) {
        ToastAndroid.show(
          "Image size must be less than 4MB",
          ToastAndroid.SHORT
        );
        return;
      }
      setImage(selectedImage);
      setUserInfo((prev) => ({
        ...prev,
        profile_image: { url: selectedImage.uri },
      }));
    }
  };

  const countOfProducts = portfolio?.products?.reduce(
    (acc, curr) => acc + curr.quantity,
    0
  );
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
      }}
    >
      <LinearGradient
        colors={["#36A7E6", "#073854"]}
        style={styles.background}
      />

      {fetchingUserInfo ? (
        <LoadingIndicator />
      ) : (
        <View
          style={{
            backgroundColor: "#dfe6e9",
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 50,
            paddingVertical: 20,
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>Profile</Text>
          <TouchableOpacity style={{ padding: 10 }} onPress={pickImage}>
            {userInfo.profile_image?.url ? (
              <Image
                source={{
                  uri: userInfo.profile_image.url,
                }}
                style={{
                  borderRadius: 50,
                  width: 100,
                  height: 100,
                }}
                alt="image"
              />
            ) : (
              <EvilIcons name="user" size={150} color="white" />
            )}
          </TouchableOpacity>
          <View style={{ gap: 10, width: "80%" }}>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                backgroundColor: "#fff",
                width: "100%",
                padding: 20,
                borderRadius: 10,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Name:</Text>
              <TextInput
                multiline={true}
                numberOfLines={5}
                value={userName}
                style={{
                  backgroundColor: "#fff",
                  color: "grey",
                  fontSize:20,
                  marginRight:20
                }}
                onChangeText={(value) => setUserName(value)}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                padding: 20,
                gap: 10,
                backgroundColor: "#fff",
                borderRadius: 10,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Email:</Text>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {userInfo.email}
              </Text>
            </View>
          </View>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Balance & Products
          </Text>
          <View style={{ flexDirection: "row", gap: 10, padding: 10 }}>
            <View
              style={{
                height: 100,
                width: 140,
                backgroundColor: "#fff",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Rs{portfolio?.wallet_amount ?? 0}
              </Text>
            </View>
            <View
              style={{
                height: 100,
                width: 140,
                backgroundColor: "#fff",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {countOfProducts ?? 0}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#00b894",
              borderRadius: 80,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
            onPress={editProfileHandler}
          >
            <Text style={{ fontSize: 20, textAlign: "center" }}>
              {loading ? "Updating..." : "Edit Profile"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
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
