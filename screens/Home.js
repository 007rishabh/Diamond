import { Marquee } from "@animatereactnative/marquee";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { baseurl } from "../Constant";
import Carousel from "./Carousel";
const Home = () => {
  const isfocused = useIsFocused();
  const [value, setValue] = useState();
  const getTrends = async () => {
    const res = await fetch(`${baseurl}/diamond/trends`);
    const result = await res.json();
    setValue(result);
  };
  const [portfolio, setPortfolio] = React.useState();
  const getPortfolio = async () => {
    const userId = await AsyncStorage.getItem("userId");
    const res = await fetch(`${baseurl}/portfolio/${userId}`);
    const result = await res.json();
    setPortfolio(result);
  };
  useEffect(() => {
    getPortfolio();
    getTrends();
  }, [isfocused]);
  const Press = () => {
    Alert.alert(
      "Your Wallet Amount",
      `Rs ${portfolio?.wallet_amount} and total diamonds bought are ${0}`,
      [{ text: "OK" }]
    );
  };

  const greenStripText = useMemo(() => {
    return value?.upTrendDiamonds.reduce(
      (acc, item) => acc + "   " + item.name,
      ""
    );
  }, [value]);
  const redStripText = useMemo(() => {
    return value?.downTrendDiamonds.reduce(
      (acc, item) => acc + "   " + item.name,
      ""
    );
  }, [value]);

  return (
    <SafeAreaView  style={{flex:1}}>
      <LinearGradient
        colors={["#36A7E6", "#073854"]}
        style={styles.background}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <Image
          source={require("../assets/DI.png")}
          style={{ height: 50, width: 50 }}
        />
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            textAlign: "center",
            color: "#fff",
          }}
        >
          Diamond Mall
        </Text>

        <TouchableOpacity onPress={Press}>
          <Ionicons name="wallet-sharp" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <Carousel />
      <View
        style={{
          gap: 4,
          marginVertical: 4,
        }}
      >
        <View style={{ backgroundColor: "black" }}>
          <Marquee spacing={5} speed={1}>
            <Text style={{ color: "#2ecc71", fontSize: 20 }}>
              {greenStripText}
            </Text>
          </Marquee>
        </View>
        <View style={{ backgroundColor: "black" }}>
          <Marquee spacing={5} speed={1}>
            <Text style={{ color: "#e74c3c", fontSize: 20 }}>
              {redStripText}
            </Text>
          </Marquee>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 10,
          gap: 10,
        }}
      >
        <ScrollView style={{ flex: 1 }}>
          <Text style={{ fontSize: 24, fontWeight: 500 }}>Top Gainers</Text>
          {value?.upTrendDiamonds.map((item, index) => (
            <View
              key={index}
              style={{
                backgroundColor: "#fff",
                padding: 8,
                borderRadius: 15,
                margin: 5,
              }}
            >
              <Text style={{ fontSize: 20 }}>{item.name}</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    textDecorationLine: "line-through",
                  }}
                >
                  Rs {item.old_price}
                </Text>
                <Text>Rs {item.price}</Text>
              </View>
              <Text style={{ color: "green", fontSize: 20 }}>
                {`+${item.price - item.old_price}`}
              </Text>
            </View>
          ))}
        </ScrollView>
        <ScrollView style={{ flex: 1 }}>
          <Text style={{ fontSize: 24, fontWeight: 500 }}>Top Losers</Text>
          {value?.downTrendDiamonds.map((item, index) => (
            <View
              key={index}
              style={{
                backgroundColor: "#fff",
                padding: 8,
                borderRadius: 15,
                margin: 5,
              }}
            >
              <Text style={{ fontSize: 20 }}>{item.name}</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    textDecorationLine: "line-through",
                  }}
                >
                  Rs {item.old_price}
                </Text>
                <Text>Rs {item.price}</Text>
              </View>
              <Text style={{ color: "red", fontSize: 20 }}>
                {item.price - item.old_price}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
});
