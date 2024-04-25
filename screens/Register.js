import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { baseurl } from "../Constant";
import { ImagePicker2 } from "../components/ImagePicker2";
import axios from "axios";
import { OTPInput } from "../components/OTPInput";
const Register = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [otp_input, setOtpInput] = useState("");
  const [sent_otp, setSent_Otp] = useState();
  const [loading, setLoading] = useState(false);
  const [otpSent, setOTPSent] = useState(false);
  const addUser = async () => {
    if (otp_input !== sent_otp) {
      ToastAndroid.show("OTP doesn't match", ToastAndroid.SHORT);
      return;
    }
    if (password !== confirmpassword || !password || !confirmpassword) {
      ToastAndroid.show(
        "passwords doesn't match or are empty",
        ToastAndroid.SHORT
      );
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      if (image) {
        formData.append("image", {
          uri: image.uri,
          name: image.fileName,
          type: image.mimeType,
        });
      }
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone", phone);

      const url = `${baseurl}/auth/signup`;
      const result = await axios.post(url, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      ToastAndroid.show(result?.data?.message, ToastAndroid.SHORT);
      navigation.navigate("Login");
    } catch (error) {
      ToastAndroid.show(
        error.response?.data?.message ?? "Please fill all fields",
        ToastAndroid.SHORT
      );
      console.error("error", error, error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const sendEmailVerificationOTP = async () => {
    try {
      if (password !== confirmpassword || !password || !confirmpassword) {
        ToastAndroid.show(
          "passwords doesn't match or are empty",
          ToastAndroid.SHORT
        );
        return;
      }
      if (!email) {
        ToastAndroid.show("Email is required", ToastAndroid.SHORT);
        return;
      }
      setLoading(true);
      const result = await axios.post(`${baseurl}/send-email`, { email });
      ToastAndroid.show(result?.data?.message, ToastAndroid.SHORT);
      setOTPSent(true);
      setSent_Otp(result?.data?.otp);
    } catch (error) {
      console.error("error", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#36A7E6", "#073854"]}
        style={styles.background}
      />

      <Text style={styles.pageText}>Register</Text>
      <View style={{ marginHorizontal: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 700 }}>Name</Text>
        <TextInput
          value={username}
          style={styles.textInput}
          onChangeText={(name) => setName(name)}
        />
        <Text style={{ fontSize: 20, fontWeight: 700 }}>Email</Text>
        <TextInput
          value={email}
          style={styles.textInput}
          onChangeText={(email) => setEmail(email)}
        />
        <Text style={{ fontSize: 20, fontWeight: 700 }}>Phone Number</Text>
        <TextInput
          value={phone}
          style={styles.textInput}
          onChangeText={(phone) => setPhone(phone)}
          keyboardType="number-pad"
        />

        <Text style={{ fontSize: 20, fontWeight: 700 }}>Password</Text>
        <TextInput
          value={password}
          style={styles.textInput}
          onChangeText={(password) => setPassword(password)}
        />
        <Text style={{ fontSize: 20, fontWeight: 700 }}>Confirm Password</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(confirmpassword) =>
            setConfirmPassword(confirmpassword)
          }
        />
        <ImagePicker2 image={image} setImage={setImage} />
      </View>
      <OTPInput input={otp_input} setInput={setOtpInput} />
      <TouchableOpacity
        style={styles.submitBtn}
        disabled={loading}
        onPress={() => {
          otpSent ? addUser() : sendEmailVerificationOTP();
        }}
      >
        {loading ? (
          <Text style={{ textAlign: "center", fontSize: 20 }}>Loading...</Text>
        ) : (
          <Text style={{ textAlign: "center", fontSize: 20 }}>
            {otpSent ? "Register" : "Send OTP"}
          </Text>
        )}
      </TouchableOpacity>
      <Text style={styles.linkText}>
        For Login to Application{" "}
        <Text onPress={() => navigation.navigate("Login")} style={styles.link}>
          Login
        </Text>
      </Text>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // backgroundColor: "#36A7E6",
  },
  pageText: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#fff",
  },
  textInput: {
    height: 40,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
    color: "grey",
  },
  submitBtn: {
    backgroundColor: "#00b894",
    height: 50,
    marginHorizontal: 25,
    borderRadius: 80,
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  linkText: {
    textAlign: "center",
    fontSize: 15,
  },
  link: {
    color: "red",
  },
  resend: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  otpView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
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
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
});
