import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState,useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { baseurl } from '../Constant'
import axios from "axios";

const Bank = () => {
  const [name, setName] = useState()
  const [accountNumber, setAccountNumber] = useState()
  const [reaccountNumber, setReAccountNumber] = useState()
  const [ifsc, setIfsc] = useState()
  const [bank,setBank] = useState()

  const addBankDetails = async () => {
    try{
    const userId = await  AsyncStorage.getItem('userId')
    const url = `${baseurl}/bank/${userId}`;
    const formData = new FormData();
    formData.append("name",name)
    formData.append("account_number", accountNumber)
    formData.append( "ifsc", ifsc)
    formData.append("reaccountNumber",reaccountNumber)
    const result = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    ToastAndroid.show(result.data.message ?? 'added successfullly', ToastAndroid.SHORT);
    Alert.alert("Alert Title", result.data.message, [
      {
        text: "OK",
        onPress: () => {
          if (result.status === 201) {
            // navigation.navigate('Home')
          } else {
            setAccountNumber(""),
            setBank(""),
            setIfsc(""),
            setName("")
          }
        },
      },
    ]);
  }catch(error){
    console.error(error.response.data)
  }
  } 

  return (
    <View  style={{padding:10,gap:5,flex:1,backgroundColor:'#74b9ff'}}>
    <Text style={{fontSize:30,fontWeight:'bold',alignItems:'center'}}>Bank Details</Text>
    <Text style={{fontSize:20,fontWeight:'600',padding:10}}>Account Holder's  Name</Text>
    <TextInput style={{backgroundColor:'#fff',borderRadius:10,height:40,padding:10}} placeholder="Enter Account Holder's  Name" value={name} onChangeText={setName}/>
      <Text style={{fontSize:20,fontWeight:'600'}}>Account Number</Text>
      <TextInput style={{backgroundColor:'#fff',borderRadius:10,height:40,padding:10}} placeholder="Enter Account Number" value={accountNumber} onChangeText={setAccountNumber}/>
      <Text style={{fontSize:20,fontWeight:'600'}}>Re-Enter Account Number</Text>
      <TextInput style={{backgroundColor:'#fff',borderRadius:10,height:40,padding:10}} placeholder="Enter Account Number" value={reaccountNumber} onChangeText={setReAccountNumber}/>
      <Text style={{fontSize:20,fontWeight:'600'}}>IFSC code</Text>
      <TextInput style={{backgroundColor:'#fff',borderRadius:10,height:40,padding:10}} placeholder="Enter IFSC COde" value={ifsc} onChangeText={setIfsc}/>
      <TouchableOpacity style={styles.submitBtn} onPress={addBankDetails}>
        <Text style={{textAlign:'center'}}> Submit</Text>
      </TouchableOpacity>
    </View>
  )
};

export default Bank

const styles = StyleSheet.create({
    textInput:{
      
        height:40,
        marginBottom:20,
        backgroundColor:'#fff',
        borderRadius:10,
        marginTop:10,
        paddingLeft:10,
        color:'grey'
    },
    submitBtn: {
        backgroundColor:'#00b894',
       height: 50,
       marginHorizontal: 25,
       borderRadius: 80,
       justifyContent: 'center',
       marginVertical:20
       
     },
})