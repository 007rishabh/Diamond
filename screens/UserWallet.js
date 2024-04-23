import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,Image
} from "react-native";
import React, { useEffect,useState} from "react";
import { baseurl } from "../Constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";
const UserWallet = () => {
  const [amount, setAmount] = React.useState(0);
  const [utf, setutf] = React.useState();
  
  const [currentamount, setCurrentAmount] = React.useState(0);
  const [qrImage, setQrImage] = useState(null);

  useEffect(() => {
    const getCurrentQR = async () => {
      try {
        const result = await axios.get(`${baseurl}/media/payment-image`);
        setQrImage(result.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCurrentQR();
  }, []);
  const getPortfolio = async () => {
    const userId = await AsyncStorage.getItem("userId");
    const res = await fetch(`${baseurl}/portfolio/${userId}`);
    const result = await res.json();
    setCurrentAmount(result.walletAmount);
  };
  const addAmount = async () => {
    const userId = await AsyncStorage.getItem("userId");
    console.log(userId, amount,utf);
    const res =await fetch(`${baseurl}/payment/`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        amount,
        userId,
        utf
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
      <View style={{alignItems:'center'}}>
        { qrImage ? (
          <Image
            source={{ uri: qrImage }}
            style={{ width: 200,height:200 }}
            alt="image here"
          />
        ) : (
          <Text>QR Image not found</Text>
        )}
        
      </View>
        <Text style={{ fontSize: 20, fontWeight: "600" }}>Enter Amount</Text>
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
        <Text style={{ fontSize: 20, fontWeight: "600" }}>Enter last 4 digits of UTF</Text>
         <TextInput
          value={utf}
          style={{
            backgroundColor: "#fff",
            height: 40,
            borderRadius: 10,
            padding: 10,
          }}
          onChangeText={(value) => setutf(value)}
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
