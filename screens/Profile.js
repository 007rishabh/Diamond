import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
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
import { OTPInput } from "../components/OTPInput";
const Profile = () => {
  const isFocused = useIsFocused();
  const [userInfo, setUserInfo] = useState({});
  const [portfolio, setPortfolio] = useState(null);
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingUserInfo, setFetchingUserInfo] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sent_otp, set_sent_otp] = useState("");
  const [otp_input, setOtpInput] = useState("");
  const [otpSent, setOTPSent] = useState(false);

  const getPortfolio = async () => {
    const userId = await AsyncStorage.getItem("userId");
    const result = await axios.get(`${baseurl}/portfolio/${userId}`);
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
      const { data } = await axios.get(url);
      setUserInfo(data);
      setUserName(data.username);
      setEmail(data.email);
      setPhone(data.phone);
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

  const sendOTP = async () => {
    try {
      if (!email) {
        ToastAndroid.show("Email is required", ToastAndroid.SHORT);
        return;
      }
      setOtpInput("");
      setLoading(true);
      const { data } = await axios.post(`${baseurl}/send-email`, { email });
      ToastAndroid.show(data?.message, ToastAndroid.SHORT);
      setOTPSent(true);
      set_sent_otp(data?.otp);
    } catch (error) {
      console.error("error", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const editProfileHandler = async () => {
    try {
      if (sent_otp !== otp_input) {
        ToastAndroid.show("OTP doesn't match", ToastAndroid.SHORT);
        return;
      }
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
      formData.append("email", email);
      formData.append("phone", phone);
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

  const isEditingEmail = email !== userInfo.email;
  return (
    <ScrollView
      style={{
        flex: 1,
        // paddingHorizontal: 20,
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
            marginVertical: 50,
            marginHorizontal: 20,
            padding: 20,
            gap: 20,
          }}
        >
          <Text
            style={{ fontSize: 30, fontWeight: "bold", textAlign: "center" }}
          >
            Profile
          </Text>
          <TouchableOpacity
            style={{ padding: 10, alignItems: "center" }}
            onPress={pickImage}
          >
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
          <View style={{ gap: 10, width: "100%" }}>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                backgroundColor: "#fff",
                padding: 20,
                borderRadius: 10,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Name:</Text>
              <TextInput
                value={userName}
                style={{
                  flex: 1,
                  backgroundColor: "#fff",
                  color: "grey",
                  fontSize: 20,
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
              <TextInput
                value={email}
                style={{
                  flex: 1,
                  backgroundColor: "#fff",
                  color: "grey",
                  fontSize: 20,
                }}
                onChangeText={(value) => {
                  setEmail(value);
                  setOTPSent(false);
                }}
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
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Phone:</Text>
              <TextInput
                value={phone}
                style={{
                  flex: 1,
                  backgroundColor: "#fff",
                  color: "grey",
                  fontSize: 20,
                }}
                onChangeText={(value) => setPhone(value)}
              />
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {userInfo.phone}
              </Text>
            </View>
          </View>
          <Text
            style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
          >
            Balance & Products
          </Text>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              padding: 10,
              justifyContent: "space-around",
            }}
          >
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
          {otpSent && <OTPInput input={otp_input} setInput={setOtpInput} />}
          <TouchableOpacity
            style={{
              backgroundColor: "#00b894",
              borderRadius: 80,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
            onPress={() => {
              if (isEditingEmail && !otpSent) {
                sendOTP();
                return;
              }
              editProfileHandler();
            }}
          >
            <Text style={{ fontSize: 20, textAlign: "center" }}>
              {loading
                ? "Loading..."
                : isEditingEmail && !otpSent
                ? "Send OTP"
                : "Edit Profile"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
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
