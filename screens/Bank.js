import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
const Bank = () => {
  const addBankDetails = async () => {
    const userId = await  AsyncStorage.getItem('userId')
    const url = `${baseurl}/bank/${userId}`;
    const res = await fetch(url, {
      method: "POST",
      
    });
    const result = await res.json()
    console.log(result)
    
    if (res.status === 200) {
    }
  }
  const [bank,setBank] = useState()
  return (
    <View  style={{padding:10,gap:5,flex:1,backgroundColor:'#74b9ff'}}>
    <Text style={{fontSize:30,fontWeight:'bold',alignItems:'center'}}>Bank Details</Text>
    <Text style={{fontSize:20,fontWeight:'600',padding:10}}>Account Holder's  Name</Text>
    <TextInput style={{backgroundColor:'#fff',borderRadius:10,height:40}} placeholder="Enter Account Holder's  Name" />
      <Text style={{fontSize:20,fontWeight:'600'}}>Account Number</Text>
      <TextInput style={{backgroundColor:'#fff',borderRadius:10,height:40}} placeholder="Enter Account Number" />
      <Text style={{fontSize:20,fontWeight:'600'}}>Re-Enter Account Number</Text>
      <TextInput style={{backgroundColor:'#fff',borderRadius:10,height:40}} placeholder="Enter Account Number" />
      <Text style={{fontSize:20,fontWeight:'600'}}>IFSC code</Text>
      <TextInput style={{backgroundColor:'#fff',borderRadius:10,height:40}} placeholder="Enter IFSC COde" />
      <TouchableOpacity style={styles.submitBtn}>
        <Text style={{}}> Submit</Text>
      </TouchableOpacity>
    </View>
  )
}

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