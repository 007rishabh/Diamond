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
import axios from "axios";

const Sell = ({ product }) => {
  const [quantity, setQuantity] = useState();

  const sellDiamonds = async ({ diamondId, qty, currentPrice }) => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const reqBody = {
        userId,
        product_id: diamondId,
        quantity: qty,
        type: "sell",
        total_price: currentPrice * qty,
      }
      console.log( reqBody);
      const url = `${baseurl}/order`;
      const result = await axios.post(url, reqBody);
      console.log(result.data);
      ToastAndroid.show(result.data.message, ToastAndroid.SHORT);
    } catch (err) {
      console.error(err.response?.data?.message);
    }
  };

  return (
    <View
      style={{
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
              currentPrice: product.buy_price,
            })
          }
        >
          <Text style={{ textAlign: "center", fontSize: 20 }}>sell</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Sell;

const styles = StyleSheet.create({
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
});
