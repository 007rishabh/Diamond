import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { FontAwesome, Octicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Login from "./Login";
export default function Setting() {
  const navigation = useNavigation();
  return (
    <>
      <LinearGradient
        // Background Linear Gradient
        colors={["#36A7E6", "#073854"]}
        style={styles.background}
      />

      <View
        style={{
          gap: 10,
          paddingTop: 20,
          paddingHorizontal: 10,
          height: "100%",
        }}
      >
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            height: 40,
            backgroundColor: "#dfe6e9",
            borderRadius: 5,
            marginLeft: 5,
          }}
          onPress={() => navigation.navigate("Profile")}
        >
          <FontAwesome5
            name="user-alt"
            size={24}
            color="black"
            style={{ marginLeft: 5, marginTop: 5 }}
          />
          <Text
            style={{
              marginLeft: 50,
              marginTop: 5,
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            {" "}
            Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            height: 40,
            backgroundColor: "#dfe6e9",
            borderRadius: 5,
            marginLeft: 5,
          }}
          onPress={() => navigation.navigate("Bank")}
        >
          <FontAwesome
            name="bank"
            size={24}
            color="black"
            style={{ marginLeft: 5, marginTop: 5 }}
          />
          <Text
            style={{
              marginLeft: 50,
              marginTop: 5,
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Bank Details
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            height: 40,
            backgroundColor: "#dfe6e9",
            borderRadius: 5,
            marginLeft: 5,
          }}
          onPress={() => navigation.navigate("Portfolio")}
        >
          <FontAwesome
            name="star"
            size={24}
            color="black"
            style={{ marginLeft: 5, marginTop: 5 }}
          />
          <Text
            style={{
              marginLeft: 50,
              marginTop: 5,
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            {" "}
            My Porducts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            height: 40,
            backgroundColor: "#dfe6e9",
            borderRadius: 5,
            marginLeft: 5,
          }}
          onPress={() => navigation.navigate("UserWallet")}
        >
          <Entypo
            name="wallet"
            size={24}
            color="black"
            style={{ marginLeft: 5, marginTop: 5 }}
          />
          <Text
            style={{
              marginLeft: 50,
              marginTop: 5,
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Wallet
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            height: 40,
            backgroundColor: "#dfe6e9",
            borderRadius: 5,
            marginLeft: 5,
          }}
        >
          <Octicons
            name="cross-reference"
            size={24}
            color="black"
            style={{ marginLeft: 5, marginTop: 5 }}
          />
          <Text
            style={{
              marginLeft: 50,
              marginTop: 5,
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Reffral
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            height: 40,
            backgroundColor: "#dfe6e9",
            borderRadius: 5,
            marginLeft: 5,
          }}
          onPress={() => navigation.navigate("TC")}
        >
          <Ionicons
            name="help-circle-outline"
            size={24}
            color="black"
            style={{ marginLeft: 5, marginTop: 5 }}
          />
          <Text
            style={{
              marginLeft: 50,
              marginTop: 5,
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Terms & Conditions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            height: 40,
            backgroundColor: "#dfe6e9",
            borderRadius: 5,
            marginLeft: 5,
          }}
          onPress={() => navigation.navigate("Login")}
        >
          <Ionicons
            name="log-out"
            size={24}
            color="black"
            style={{ marginLeft: 5, marginTop: 5 }}
          />
          <Text
            style={{
              marginLeft: 50,
              marginTop: 5,
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
});
