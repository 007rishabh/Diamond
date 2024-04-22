import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { baseurl } from "../Constant";
import { ImagePicker2 } from "../components/ImagePicker2";
import axios from "axios";
const Register = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [username, setName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmPassword] = useState();
  const et1 = useRef();
  const et2 = useRef();
  const et3 = useRef();
  const et4 = useRef();
  const et5 = useRef();
  const et6 = useRef();
  const [f1, setF1] = useState("");
  const [f2, setF2] = useState("");
  const [f3, setF3] = useState("");
  const [f4, setF4] = useState("");
  const [f5, setF5] = useState("");
  const [f6, setF6] = useState("");
  const [count, setCount] = useState(60);
  const [loading, setLoading] = useState(false);
  const addUser = async () => {
    if (password !== confirmpassword) {
      Alert.alert("passwords doesn't match");
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", {
        uri: image.uri,
        name: image.fileName,
        type: image.mimeType,
      });
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);

      const url = `${baseurl}/auth/signup`;
      const result = await axios.post(url, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      ToastAndroid.show(result.data.message, ToastAndroid.SHORT);
      navigation.navigate("Login");
    } catch (error) {
      ToastAndroid.show("Please fill all fields", ToastAndroid.SHORT);
      console.error("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
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

        <View style={styles.otpView}>
          <Text style={{ fontSize: 20, fontWeight: "700" }}>Verify OTP</Text>
          <TextInput
            ref={et1}
            style={[
              styles.input,
              { borderColor: f1.length >= 1 ? "blue" : "black" },
            ]}
            keyboardType="number-pad"
            maxLength={1}
            value={f1}
            onChangeText={(txt) => {
              setF1(txt);
              if (txt.length >= 1) {
                et2.current.focus();
              }
            }}
          />
          <TextInput
            ref={et2}
            style={[
              styles.input,
              { borderColor: f2.length >= 1 ? "blue" : "black" },
            ]}
            keyboardType="number-pad"
            maxLength={1}
            value={f2}
            onChangeText={(txt) => {
              setF2(txt);
              if (txt.length >= 1) {
                et3.current.focus();
              } else if (txt.length < 1) {
                et1.current.focus();
              }
            }}
          />
          <TextInput
            ref={et3}
            style={[
              styles.input,
              { borderColor: f3.length >= 1 ? "blue" : "black" },
            ]}
            keyboardType="number-pad"
            maxLength={1}
            value={f3}
            onChangeText={(txt) => {
              setF3(txt);
              if (txt.length >= 1) {
                et4.current.focus();
              } else if (txt.length < 1) {
                et2.current.focus();
              }
            }}
          />
          <TextInput
            ref={et4}
            style={[
              styles.input,
              { borderColor: f4.length >= 1 ? "blue" : "black" },
            ]}
            keyboardType="number-pad"
            maxLength={1}
            value={f4}
            onChangeText={(txt) => {
              setF4(txt);
              if (txt.length >= 1) {
                et5.current.focus();
              } else if (txt.length < 1) {
                et3.current.focus();
              }
            }}
          />
        </View>
        <View style={styles.resend}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: count == 0 ? "blue" : "grey",
            }}
            onPress={() => {
              setCount(60);
            }}
          >
            Resend Otp?
          </Text>
          {count !== 0 && (
            <Text style={{ marginLeft: 20, fontSize: 20 }}>
              {count + " Seconds"}
            </Text>
          )}
        </View>
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
      <TouchableOpacity style={styles.submitBtn} onPress={addUser}>
        {loading ? (
          <Text style={{ textAlign: "center", fontSize: 20 }}>Loading...</Text>
        ) : (
          <Text style={{ textAlign: "center", fontSize: 20 }}>Register</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.linkText}>
        For Login to Application{" "}
        <Text onPress={() => navigation.navigate("Login")} style={styles.link}>
          Login
        </Text>
      </Text>
    </View>
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
