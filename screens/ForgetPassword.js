import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { baseurl } from "../Constant";
import axios from "axios";
import { OTPInput } from "../components/OTPInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoadingIndicator } from "../components/LoadingIndicator";
const ForgetPassword = ({ route }) => {
  const { email } = route.params || { email: "" };
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [otp_input, set_otp_input] = useState("");
  const [sent_otp, set_sent_otp] = useState("");
  const [is_otp_sent, set_is_otp_sent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const sendOTP = async () => {
      try {
        if (!email) {
          ToastAndroid.show("Email is required", ToastAndroid.SHORT);
          return;
        }
        set_otp_input("");
        setLoading(true);
        const { data } = await axios.post(`${baseurl}/send-email`, { email });
        ToastAndroid.show(data?.message, ToastAndroid.SHORT);
        set_is_otp_sent(true);
        set_sent_otp(data?.otp);
      } catch (error) {
        console.error("error", error.response?.data);
      } finally {
        setLoading(false);
      }
    };
    sendOTP();
  }, []);

  const updatePassword = async () => {
    try {
      if (password !== confirm_password) {
        ToastAndroid.show("Password does not match", ToastAndroid.SHORT);
        return;
      }
      if (otp_input !== sent_otp) {
        ToastAndroid.show("OTP does not match", ToastAndroid.SHORT);
        return;
      }
      setLoading(true);
      const userId = await AsyncStorage.getItem("userId");
      await axios.put(`${baseurl}/user/update-password/${userId}`, {
        password,
      });
      ToastAndroid.show("Password Updated", ToastAndroid.SHORT);
      navigation.navigate("Login");
    } catch (error) {
      console.error("error", error.response?.data);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View
      style={{ flex: 1, justifyContent: "center", backgroundColor: "#36A7E6" }}
    >
      <Text style={styles.pageText}>Forget Password</Text>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          {is_otp_sent && (
            <OTPInput input={otp_input} setInput={set_otp_input} />
          )}
          <View>
            <Text style={{ fontSize: 20, fontWeight: "500", marginLeft: 8 }}>
              Password
            </Text>
            <TextInput
              style={styles.textInput}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <View>
            <Text style={{ fontSize: 20, fontWeight: "500", marginLeft: 8 }}>
              Confirm Password
            </Text>
            <TextInput
              style={styles.textInput}
              value={confirm_password}
              onChangeText={setConfirmPassword}
            />
          </View>
          <TouchableOpacity
            disabled={loading}
            style={[styles.submitBtn]}
            onPress={updatePassword}
          >
            <Text style={{ textAlign: "center", fontSize: 20 }}>
              Verify Otp
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  pageText: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    marginBottom: 20,
  },
  textInput: {
    height: 40,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
    width: "95%",
    marginLeft: 8,
    borderColor: "red",
    fontSize: 18,
    fontWeight: "700",
  },
  otpView: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 10,
    gap: 10,
  },
  input: {
    height: 50,
    width: 50,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    marginLeft: 10,
    marginTop: 10,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    backgroundColor: "#fff",
  },
  submitBtn: {
    backgroundColor: "#6AD4DD",
    marginHorizontal: 25,
    borderRadius: 80,
    justifyContent: "center",
    marginTop: 20,
    padding: 10,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
  },
  resend: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 30,
  },
});
