import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { baseurl } from "../Constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoadingIndicator } from "../components/LoadingIndicator.js";
const Login = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const loginHandler = async () => {
    try {
      setLoading(true);
      const url = `${baseurl}/auth/signin`;
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const result = await res.json();
      console.log(res, result);

      await AsyncStorage.setItem("userId", String(result.data.id));

      if (res.status === 200) {
        if (result.data.role === "admin") {
          navigation.navigate("Admin");
        } else {
          navigation.navigate("HomeScreen");
        }
      } else {
        setPassword("");
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#36A7E6", "#073854"]}
        style={styles.background}
      />
      <Image
        source={require("../assets/DI.png")}
        style={{
          width: 200,
          height: 200,
          marginLeft: 100,
          borderRadius: 75,
        }}
      />
      <Text style={styles.pageText}> User Login</Text>
      <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 700 }}>Email</Text>
        <TextInput
          value={email}
          style={styles.textInput}
          onChangeText={(email) => setEmail(email)}
        />
        <Text style={{ fontSize: 20, fontWeight: 700 }}>Password</Text>
        <TextInput
          style={styles.textInput}
          value={password}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <TouchableOpacity style={styles.submitBtn} onPress={loginHandler}>
        <Text style={{ textAlign: "center", fontSize: 20 }}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.linkText}>
        Not A User Please?{" "}
        <Text
          onPress={() => navigation.navigate("Register")}
          style={styles.link}
        >
          REGISTER
        </Text>
      </Text>
      <TouchableOpacity
        disabled={loading}
        onPress={() => navigation.navigate("ForgetPassword")}
      >
        <Text style={{ fontSize: 15, color: "red", textAlign: "center" }}>
          Forget Password
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // backgroundColor: "#36A7E6",
  },
  pageText: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    margin: "auto",
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
    backgroundColor: "#10A450",
    height: 50,
    marginHorizontal: 25,
    borderRadius: 80,
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  linkText: {
    textAlign: "center",
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
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
});
