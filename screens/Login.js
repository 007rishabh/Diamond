import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import React, { useState } from "react";

import { baseurl } from "../Constant";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const add = async () => {
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
  };

  // <Image source={require('../assets/ddd.png')} />

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/ddd.png")}
        style={{
          width: 150,
          height: 150,
          marginLeft: 120,
          marginBottom: 70,
          borderRadius: 75,
        }}
      />

      <Text style={styles.pageText}>Login User/Admin</Text>
      <View style={{ marginHorizontal: 20 }}>
        <Text style={{ fontSize: 25, fontWeight: 700 }}>Email</Text>
        <TextInput
          value={email}
          style={styles.textInput}
          onChangeText={(email) => setEmail(email)}
        />
        <Text style={{ fontSize: 25, fontWeight: 700 }}>Password</Text>
        <TextInput
          style={styles.textInput}
          value={password}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <TouchableOpacity style={styles.submitBtn} onPress={add}>
        <Text style={{ marginLeft: 150, fontSize: 20 }}>Login</Text>
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
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#36A7E6",
  },
  pageText: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    // marginBottom: 20,
    margin:'auto'
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
});
