import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseurl } from "../Constant";
import axios from "axios";

const Bank = () => {
  const [account_holder_name, setName] = useState();
  const [account_number, setAccountNumber] = useState();
  const [reaccountNumber, setReAccountNumber] = useState();
  const [ifsc_code, setIfsc] = useState();
  const [branch_name, setBank] = useState();

  useEffect(() => {
    const getBankDetails = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const url = `${baseurl}/bank/${userId}`;
        const result = await axios.get(url);
        console.log(result.data);
        const data = result.data;
        setName(data.account_holder_name);
        setAccountNumber(data.account_number);
        setReAccountNumber(data.account_number);
        setIfsc(data.ifsc_code);
        setBank(data.branch_name);
      } catch (error) {
        console.error(error);
      }
    };
    getBankDetails();
  }, []);

  const addBankDetails = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const url = `${baseurl}/bank/${userId}`;
      const reqBody = {
        account_number,
        branch_name,
        ifsc_code,
        account_holder_name,
      };
      console.log(reqBody);

      const result = await axios.post(url, reqBody);

      ToastAndroid.show(
        result.data.message ?? "added successfullly",
        ToastAndroid.SHORT
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ padding: 10, gap: 5, flex: 1, backgroundColor: "#74b9ff" }}>
      <Text style={{ fontSize: 30, fontWeight: "bold", alignItems: "center" }}>
        Bank Details
      </Text>
      <Text style={{ fontSize: 20, fontWeight: "600", padding: 10 }}>
        Branch Name
      </Text>
      <TextInput
        style={{
          backgroundColor: "#fff",
          borderRadius: 10,
          height: 40,
          padding: 10,
        }}
        placeholder="Enter Account Holder's  Name"
        value={branch_name}
        onChangeText={setBank}
      />
      <Text style={{ fontSize: 20, fontWeight: "600", padding: 10 }}>
        Account Holder's Name
      </Text>
      <TextInput
        style={{
          backgroundColor: "#fff",
          borderRadius: 10,
          height: 40,
          padding: 10,
        }}
        placeholder="Enter Account Holder's  Name"
        value={account_holder_name}
        onChangeText={setName}
      />
      <Text style={{ fontSize: 20, fontWeight: "600" }}>Account Number</Text>
      <TextInput
        style={{
          backgroundColor: "#fff",
          borderRadius: 10,
          height: 40,
          padding: 10,
        }}
        placeholder="Enter Account Number"
        value={account_number}
        onChangeText={setAccountNumber}
      />
      <Text style={{ fontSize: 20, fontWeight: "600" }}>
        Re-Enter Account Number
      </Text>
      <TextInput
        style={{
          backgroundColor: "#fff",
          borderRadius: 10,
          height: 40,
          padding: 10,
        }}
        placeholder="Enter Account Number"
        value={reaccountNumber}
        onChangeText={setReAccountNumber}
      />
      <Text style={{ fontSize: 20, fontWeight: "600" }}>IFSC code</Text>
      <TextInput
        style={{
          backgroundColor: "#fff",
          borderRadius: 10,
          height: 40,
          padding: 10,
        }}
        placeholder="Enter IFSC COde"
        value={ifsc_code}
        onChangeText={setIfsc}
      />
      <TouchableOpacity style={styles.submitBtn} onPress={addBankDetails}>
        <Text style={{ textAlign: "center" }}> Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Bank;

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
    color: "grey",
  },
  submitBtn: {
    backgroundColor: "#00b894",
    height: 50,
    marginHorizontal: 25,
    borderRadius: 80,
    justifyContent: "center",
    marginVertical: 20,
  },
});
