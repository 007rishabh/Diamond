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

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState(null);
  const isfocused = useIsFocused();
  const [quantity, setQuantity] = useState();
  const getPortfolio = async () => {
    const userId = await AsyncStorage.getItem("userId");
    const res = await fetch(`${baseurl}/portfolio/${userId}`);
    const result = await res.json();
    console.log("portfolio", result);
    setPortfolio(result);
  };

  const sellDiamonds = async ({ diamondId, qty, currentPrice }) => {
    const userId = await AsyncStorage.getItem("userId");
    const reqBody = JSON.stringify({
      userId,
      product_id: diamondId,
      quantity: qty,
      type: "sell",
      total_price: currentPrice * qty,
    });
    console.log({ diamondId, qty, currentPrice }, reqBody);
    const url = `${baseurl}/order`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: reqBody,
    });
    console.log(res);
    const result = await res.json();
    ToastAndroid.show(result.message, ToastAndroid.SHORT);
  };

  useEffect(() => {
    getPortfolio();
  }, [isfocused]);

  if (!portfolio) return null;
  return (
    <>
      <LinearGradient
        // Background Linear Gradient
        colors={["#36A7E6", "#073854"]}
        style={styles.background}
      />
      <ScrollView style={{ flex: 1 }}>
        {portfolio?.products?.map((product, index) => (
          <View
            key={index}
            style={{
              // flexDirection: "row",
              justifyContent: "space-between",
              height: 300,
              backgroundColor: "#eee",
              borderRadius: 10,
              padding: 10,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                gap: 20,
                backgroundColor: "#ddd",
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                {"Diamond name: " + product.name ?? "product name it is"}
              </Text>
              <Text style={{ textAlign: "center", fontSize: 20 }}>
                {"Quantity: " + product.quantity}
              </Text>
              <Text style={{ textAlign: "center", fontSize: 20 }}>
                {"current price: " + product.buyPrice}
              </Text>

              <TextInput
                style={{
                  backgroundColor: "#fff",
                  height: 40,
                  width: 50,
                  marginLeft: 150,
                  padding: 10,
                  borderRadius: 5,
                  fontWeight: "bold",
                }}
                placeholder="Qty"
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="number-pad"
              />
              <TouchableOpacity
                style={[styles.submitBtn, styles.red]}
                onPress={() =>
                  sellDiamonds({
                    diamondId: product.id,
                    qty: product.quantity,
                    currentPrice: product.price,
                  })
                }
              >
                <Text style={{ textAlign: "center", fontSize: 20 }}>sell</Text>
              </TouchableOpacity>
            </View>
          </View>
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
