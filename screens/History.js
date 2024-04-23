import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView, View, Text } from "react-native";
import { baseurl } from "../Constant";
import axios from 'axios'
const History = () => {
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const isfocused = useIsFocused();

  const getUserOrders = async () => {
    try {
      
      const userId = await AsyncStorage.getItem("userId");
      const result = await axios.get(`${baseurl}/order/user/${userId}`);
      console.log("hello",result.data)
      setOrders(result.data);
    } catch (error) {
      console.error(error)
    }
  };
  const getUserPayments = async () => {
    
    const userId = await AsyncStorage.getItem("userId");
    const res = await fetch(`${baseurl}/payment/${userId}`);
    const result = await res.json();
    console.log("result", result);
    setPayments(result);
  };
  useEffect(() => {
    getUserOrders();
    getUserPayments();
  }, [isfocused]);

  return (
    <>
      <LinearGradient
        colors={["#36A7E6", "#073854"]}
        style={styles.background}
      />
      <ScrollView
        style={{ padding: 10 }}
        contentContainerStyle={{
          rowGap: 10,
        }}
      >
        { orders?.map((order, index) => {
          return (
            <View
              key={order.id}
              style={{
                flex: 1,
                flexDirection: "column",
                gap: 10,
                backgroundColor: "#ddd",
                borderRadius: 10,
                padding: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                {"Diamond name: " + order.productName}
              </Text>
              <Text style={{ textAlign: "center", fontSize: 20 }}>
                {"Quantity: " + order.quantity}
              </Text>
              <Text style={{ textAlign: "center", fontSize: 20 }}>
                {"date : " + order.createdAt.split("T")[0]}
              </Text>
              <Text style={{ textAlign: "center", fontSize: 20 }}>
                {"Price: " + order.total_price}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  color: order.type == "buy" ? "green" : "red",
                }}
              >
                {"Order type: " + order.type}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  color: order.status == "approved" ? "green" : "red",
                }}
              >
                {"Order status: " + order.status}
              </Text>
            </View>
          );
        })}
        {payments?.map((payment, index) => {
          return (
            <View
              key={payment.id}
              style={{
                flex: 1,
                flexDirection: "column",
                gap: 10,
                backgroundColor: "#ddd",
                borderRadius: 10,
                padding: 10,
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 20 }}>
                {"Status: " + payment.status}
              </Text>
              <Text style={{ textAlign: "center", fontSize: 20 }}>
                {"date : " + payment.createdAt.split("T")[0]}
              </Text>
              <Text style={{ textAlign: "center", fontSize: 20 }}>
                {"Amount: Rs " + payment.amount}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                }}
              >
                {"utf: " + payment.utf}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </>
  );
};

export default History;

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    flex: 1,
  },
});
