import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
export default function Setting() {
  return (
    <View style={{gap:10,marginTop:20}}>
    <Pressable style={{display:'flex',flexDirection:'row',height:40,backgroundColor:'#B3C8CF',borderRadius:5,marginLeft:5}} >
    <FontAwesome5 name="user-alt" size={24} color="black" style={{marginLeft:5,marginTop:5}}/>
      <Text style={{marginLeft:50,marginTop:5,fontSize:15,fontWeight:'bold'}}>Edit Profile</Text>
    </Pressable>
    <Pressable style={{display:'flex',flexDirection:'row',height:40,backgroundColor:'#B3C8CF',borderRadius:5,marginLeft:5}} >
    <Ionicons name="help-circle-outline" size={24} color="black" style={{marginLeft:5,marginTop:5}} />      
    <Text style={{marginLeft:50,marginTop:5,fontSize:15,fontWeight:'bold'}}>Terms & Conditions</Text>
    </Pressable>
    <Pressable style={{display:'flex',flexDirection:'row',height:40,backgroundColor:'#B3C8CF',borderRadius:5,marginLeft:5}} >
    <FontAwesome name="bank" size={24} color="black"  style={{marginLeft:5,marginTop:5}}/>
        <Text style={{marginLeft:50,marginTop:5,fontSize:15,fontWeight:'bold'}}>Bank Details</Text>
    </Pressable>
    <Pressable style={{display:'flex',flexDirection:'row',height:40,backgroundColor:'#B3C8CF',borderRadius:5,marginLeft:5}} >
    <FontAwesome name="star" size={24} color="black" style={{marginLeft:5,marginTop:5}}/>      
    <Text style={{marginLeft:50,marginTop:5,fontSize:15,fontWeight:'bold'}}>Reffral</Text>
    </Pressable>
    <Pressable style={{display:'flex',flexDirection:'row',height:40,backgroundColor:'#B3C8CF',borderRadius:5,marginLeft:5}} >
    <Ionicons name="log-out" size={24} color="black" style={{marginLeft:5,marginTop:5}}/>      
    <Text style={{marginLeft:50,marginTop:5,fontSize:15,fontWeight:'bold'}}>Logout</Text>
    </Pressable>
    
    </View>
  )
}

const styles = StyleSheet.create({})