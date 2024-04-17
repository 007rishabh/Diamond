import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ToastAndroid,
  ScrollView
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseurl } from "../Constant";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState(null);
  const isfocused = useIsFocused();

  const getPortfolio = async () => {
    const userId = await AsyncStorage.getItem("userId");
    const res = await fetch(`${baseurl}/portfolio/${userId}`);
    const result = await res.json();
    console.log("portfolio", result);
    result.products = await JSON.parse(result.products);
    result.products = result.products.map((product) => {
      const diamond = result.diamonds.find(
        (item) => item.id == product.productId
      );
      console.log({ diamond });
      if (!diamond) {
        return product;
      }
      return { ...product, ...diamond };
    });

    setPortfolio(result);
  };

  const sellDiamonds = async ({ diamondId, qty, currentPrice }) => {
    const userId = await AsyncStorage.getItem("userId");
    const reqBody = JSON.stringify({
      userId,
      productId: diamondId,
      quantity: qty,
      type: "sell",
      totalPrice: currentPrice * qty,
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
    <ScrollView >
      {portfolio.products.map((product, index) => (
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
            <Text style={{ textAlign: "center", fontSize: 20,fontWeight:'bold' }}>
              {"Diamond name: " + product.name ?? "product name it is"}
            </Text>
            <Text style={{ textAlign: "center", fontSize: 20 }}>
              {"Quantity: " + product.quantity}
            </Text>
            <Text style={{ textAlign: "center", fontSize: 20 }}>
              {"current price: " + product.buyPrice}
            </Text>
          
        
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
    marginLeft:110
  },
});
