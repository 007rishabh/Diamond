import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { EvilIcons } from '@expo/vector-icons';
const Profile = () => {
  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center',gap:20}}>
    <LinearGradient
    // Background Linear Gradient
    colors={['#36A7E6', '#073854']}
    style={styles.background}
  />
  <Text style={{fontSize:30,fontWeight:'bold',color:'#fff'}}>Profile</Text>
  <EvilIcons name="user" size={200} color="white" />
  <TextInput placeholder='Name' style={{backgroundColor:'#fff',height:40,width:'80%',borderRadius:10,padding:10}}/>
  <TextInput placeholder='Email' style={{backgroundColor:'#fff',height:40,width:'80%',borderRadius:10,padding:10}}/>
  <Text style={{fontSize:30,fontWeight:'bold',color:'#fff'}}>Balance & Produce</Text>
  <View style={{flexDirection:'row',gap:10}}>
  <TextInput placeholder='Balance' style={{backgroundColor:'#fff',height:80,width:'40%',borderRadius:10,textAlign:'center'}}/>
  <TextInput placeholder='Produce' style={{backgroundColor:'#fff',height:80,width:'40%',borderRadius:10,textAlign:'center'}}/>

  </View>
  </View>
  )
}

export default Profile

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height:'100%'
      }
})