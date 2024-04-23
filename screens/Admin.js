import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
export default function Admin() {
  const navigation = useNavigation();
  return (
    <View style={{ gap: 10, height: "100%" }}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#36A7E6", "#073854"]}
        style={styles.background}
      />
      <View style={{ marginTop: 10, padding: 5, gap: 8 }}>
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
            onPress={() => navigation.navigate("Register")}
          >
            ADD User
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
          <Ionicons
            name="diamond"
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
            onPress={() => navigation.navigate("AddDiamond")}
          >
            ADD Product
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
          <Ionicons
            name="newspaper"
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
            onPress={() => navigation.navigate("AddNews")}
          >
            ADD News
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
          onPress={() => navigation.navigate("ShowNews")}
        >
          <FontAwesome
            name="eye"
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
            Show All News
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("AdminShowProduct")}
          style={{
            display: "flex",
            flexDirection: "row",
            height: 40,
            backgroundColor: "#dfe6e9",
            borderRadius: 5,
            marginLeft: 5,
          }}
        >
          <FontAwesome
            name="eye"
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
            Show All Products
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
          onPress={() => navigation.navigate("ShowUsers")}
        >
          <FontAwesome
            name="eye"
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
            Show All Users
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
          onPress={() => navigation.navigate("Pending")}
        >
          <FontAwesome
            name="eye"
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
            Pending Request
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
          onPress={() => navigation.navigate("PendingPayments")}
        >
          <FontAwesome
            name="history"
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
            Pending Payment
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
          onPress={() => navigation.navigate("Upload QR")}
        >
          <FontAwesome
            name="qrcode"
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
            Upload QR
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
          onPress={() => navigation.navigate("CarouselImages")}
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
            Carousel Images
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
            name="newspaper-outline"
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
            Terms & Conditon
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
    </View>
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
