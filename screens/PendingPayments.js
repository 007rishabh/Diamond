import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const PendingPayments = () => {
  return (
    <View>
      <Text style={{fontSize:20,fontWeight:'bold'}}>Enter UTF Number</Text>
      <TextInput placeholder='Enter UTF Number' style={{backgroundColor:'#fff',height:40,borderRadius:10}}/>
    </View>
  )
}

export default PendingPayments

const styles = StyleSheet.create({})