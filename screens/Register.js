import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { LinearGradient } from 'expo-linear-gradient';
// import { useNavigation } from '@react-navigation/native';
// import Home from './Home';
import { baseurl } from "../Constant";
const Register = ({ navigation }) => {
  // const navigation = useNavigation()
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
  const add = async () => {
    if (password !== confirmpassword) {
      Alert.alert("passwords doesn't match");
      return;
    }

    // const url = "http://192.168.1.46:8080/api/auth/signup";
    const url = `${baseurl}/auth/signup`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ username, email, password, walletAmount: 0 }),
    });
    const result = await res.json();
    console.log(res, result);

    Alert.alert("Alert Title", result.message, [
      {
        text: "OK",
        onPress: () => {
          if (res.status === 201) {
            navigation.navigate("Login");
          } else {
            setPassword("");
          }
        },
      },
    ]);

    useEffect(() => {
      const Interval = setInterval(() => {
        if (count == 0) {
          clearInterval(Interval);
        } else {
          setCount(count - 1);
        }
      }, 1000);
      return () => {
        clearInterval(Interval);
      };
    }, [count]);
  };
  return (
    <View style={styles.container}>
    <LinearGradient
          // Background Linear Gradient
          colors={['#36A7E6', '#073854']}
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
          <Text style={{ fontSize: 20, fontWeight: "700" }}>OTP Verify</Text>
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
      </View>
      <TouchableOpacity style={styles.submitBtn} onPress={add}>
        <Text style={{ marginLeft: 130, fontSize: 20 }}>Register</Text>
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
    fontSize:15
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
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height:'100%'
  },
});
