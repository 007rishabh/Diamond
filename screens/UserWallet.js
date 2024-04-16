import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid
} from "react-native";
import React, { useEffect } from "react";
import { baseurl } from "../Constant";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserWallet = () => {
  const [amount, setAmount] = React.useState(0);
  const [currentamount, setCurrentAmount] = React.useState(0);
  const getPortfolio = async () => {
    const userId = await AsyncStorage.getItem("userId");
    const res = await fetch(`${baseurl}/portfolio/${userId}`);
    const result = await res.json();
    setCurrentAmount(result.walletAmount);
  };
  const addAmount = async () => {
    const userId = await AsyncStorage.getItem("userId");
    console.log(userId, amount);
    const res =await fetch(`${baseurl}/portfolio/addMoney/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        walletAmount: amount,
      }),
    });
    const result = await res.json()
    ToastAndroid.show(result.message ?? 'wallet updated', ToastAndroid.SHORT);
    getPortfolio();
  };

  useEffect(() => {
    getPortfolio();
  }, []);

  return (
    <>
      <View>
        <Text>Your Available Balance:</Text>
        <Text>{currentamount}</Text>
      </View>
      <View
        style={{
          padding: 10,
          justifyContent: "center",
          gap: 5,
          flex: 1,
          backgroundColor: "#74b9ff",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "600" }}>ADD Amount</Text>
        <TextInput
          value={amount+''}
          style={{
            backgroundColor: "#fff",
            height: 40,
            borderRadius: 10,
            padding: 10,
          }}
          onChangeText={(value) => setAmount(value)}
        />
        <TouchableOpacity style={styles.submitBtn} onPress={addAmount}>
          <Text style={{ textAlign: "center", fontSize: 20 }}> Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default UserWallet;

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
    color: "grey",
    padding: 20,
  },
  submitBtn: {
    backgroundColor: "#00b894",
    height: 50,
    marginHorizontal: 25,
    borderRadius: 80,
    marginBottom: 20,
    marginTop: 20,
    justifyContent: "center",
  },
});
