import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { baseurl } from "../Constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
const History = () => {
  const [history, setHistory] = useState([]);
  
  const getHistory = async () => {
    const userId = await AsyncStorage.getItem("userId");
    const res = await fetch(`${baseurl}/order/user/${userId}`);
    const result = await res.json();
    setHistory(result);
  };
  useEffect(() => {
    getHistory();
  }, []);

  return (
    
    <ScrollView>
    <LinearGradient
          // Background Linear Gradient
          colors={['#36A7E6', '#073854']}
          style={styles.background}
        />

      <View style={{  height: "100%", gap: 10,padding:10 }}>
        {history.map((order, index) => {
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
              <Text style={{ textAlign: "center", fontSize: 20,fontWeight:'bold' }}>
                {"Diamond name: " + order.productName}
              </Text>
              <Text style={{ textAlign: "center", fontSize: 20 }}>
                {"Quantity: " + order.quantity}
              </Text>
              <Text style={{ textAlign: "center", fontSize: 20 }}>
                {"Price: " + order.totalPrice}
              </Text>
              <Text style={{ textAlign: "center", fontSize: 20 ,color: order.type=='buy' ?  'green' :'red' }}>
                {"Order type: " + order.type}
              </Text>
              <Text style={{ textAlign: "center", fontSize: 20 ,color: order.status=='approved' ?  'green' :'red' }}>
                {"Order status: " + order.status}
              </Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default History;

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height:'100%'
  },
});
