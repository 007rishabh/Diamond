import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseurl } from "../Constant";
import { LinearGradient } from "expo-linear-gradient";
import Sell from "./Sell";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState(null);
  const isfocused = useIsFocused();
  const getPortfolio = async () => {
    const userId = await AsyncStorage.getItem("userId");
    const res = await fetch(`${baseurl}/portfolio/${userId}`);
    const result = await res.json();
    console.log("portfolio", result);
    setPortfolio(result);
  };

  

  useEffect(() => {
    getPortfolio();
  }, [isfocused]);

  if (!portfolio) return null;
  return (
    <>
      <LinearGradient
        colors={["#36A7E6", "#073854"]}
        style={styles.background}
      />
      <ScrollView style={{ flex: 1 }}>
        {portfolio?.products?.map((product, index) => (
          <Sell product={product} key={index}/>
        ))}
      </ScrollView>
    </>
  );
};

export default Portfolio;

const styles = StyleSheet.create({
  green: {
    backgroundColor: "#55efc4",
  },
  red: {
    backgroundColor: "#ff7675",
  },
  submitBtn: {
    backgroundColor: "#6AD4DD",
    height: 50,
    marginHorizontal: 25,
    borderRadius: 80,
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    marginLeft: 110,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
});
