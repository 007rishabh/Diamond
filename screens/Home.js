import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import { SafeAreaView } from "react-native-safe-area-context";
import { baseurl } from "../Constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Marquee } from "@animatereactnative/marquee";
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
    console.log({result})
    setPortfolio(result);
  };
  useEffect(() => {
    getPortfolio();
    getTrends();
  }, [isfocused]);
  const Press = () => {
    console.log(portfolio)
    // const totalBoughtProducts = portfolio?.products.reduce((acc,curr)=>acc+curr.quantity,0)
    Alert.alert("Your Wallet Amount", `Rs ${portfolio?.wallet_amount} and total diamonds bought are ${0}`, [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  };
  return (
    <>
      <ScrollView>
        <LinearGradient
          // Background Linear Gradient
          colors={["#36A7E6", "#073854"]}
          style={styles.background}
        />
        <View
          style={{
            flexDirection: "row",
            // gap: 5,
            // backgroundColor: "black",
            // justifyContent:'space-evenly',
            borderRadius: 10,
          }}
        >
          <View>
            <Image
              source={require("../assets/DI.png")}
              style={{ height: 50, width: 50 }}
            />
          </View>
          <View style={{ width: "58%" }}>
            <Text
              style={{
                fontSize: 33,
                fontWeight: "bold",
                textAlign: "center",
                color: "#fff",
              }}
            >
              Diamond Mall
            </Text>
          </View>
          <TouchableOpacity
            style={{ marginTop: 8, marginLeft: 80 }}
            onPress={Press}
          >
            <Ionicons name="wallet-sharp" size={40} color="black" />
          </TouchableOpacity>
        </View>

        <Carousel />
        <SafeAreaView
          style={{
            padding: 2,
            flex: 1,
            borderRadius: 20,
            gap: 5,
          }}
        >
          
          <View
            style={{
              flexDirection: "row",
              flex: 2,
              padding: 10,
              borderRadius: 10,
            }}
          >
            <View style={{ padding: 10, flex: 1 }}>
              <Text style={{ fontSize: 24, fontWeight: 500 }}>Top Gainer</Text>
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
                  <Text style={{
                    textDecorationLine:'line-through'
                  }}>Rs {item.oldPrice}</Text>
                  <Text>Rs {item.price}</Text>
                </View>
                <Text style={{ color: "green", fontSize: 20 }}>
                  {`+${item.price - item.oldPrice}`}
                </Text>
              </View>
              ))}
            </View>
            <View style={{ padding: 10, flex: 1 }}>
              <Text style={{ fontSize: 24, fontWeight: 500 }}>Top Losser</Text>
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
                    <Text style={{
                      textDecorationLine:'line-through'
                    }}>Rs {item.oldPrice}</Text>
                    <Text>Rs {item.price}</Text>
                  </View>
                  <Text style={{ color: "red", fontSize: 20 }}>
                    {item.price - item.oldPrice}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
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
