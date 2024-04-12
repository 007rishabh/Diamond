import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontAwesome5 ,MaterialIcons,Ionicons,FontAwesome,AntDesign} from '@expo/vector-icons';

export default function User() {
  return (
    <View style={{gap:10,marginTop:50}}>
    <Text style={{fontSize:20,padding:10,fontWeight:700}}>User</Text>
    <TouchableOpacity style={{display:'flex',flexDirection:'row',height:40,backgroundColor:'#B3C8CF',borderRadius:5,marginLeft:5}} >
    <FontAwesome5 name="user-alt" size={24} color="black" style={{marginLeft:5,marginTop:5}}/>
      <Text style={{marginLeft:50,marginTop:5,fontSize:15,fontWeight:'bold'}}>Add User</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{display:'flex',flexDirection:'row',height:40,backgroundColor:'#B3C8CF',borderRadius:5,marginLeft:5}} >
    <AntDesign name="delete" size={24} color="black"  style={{marginLeft:5,marginTop:5}}/>
        <Text style={{marginLeft:50,marginTop:5,fontSize:15,fontWeight:'bold'}} >Delete User</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{display:'flex',flexDirection:'row',height:40,backgroundColor:'#B3C8CF',borderRadius:5,marginLeft:5}} >
    <Ionicons name="newspaper" size={24} color="black" style={{marginLeft:5,marginTop:5}}/>
        <Text style={{marginLeft:50,marginTop:5,fontSize:15,fontWeight:'bold'}}>Update User</Text>
    </TouchableOpacity>
    <Text style={{fontSize:20,padding:10,fontWeight:700}}>Admin</Text>
    <TouchableOpacity style={{display:'flex',flexDirection:'row',height:40,backgroundColor:'#B3C8CF',borderRadius:5,marginLeft:5}} >
    <FontAwesome5 name="user-alt" size={24} color="black" style={{marginLeft:5,marginTop:5}}/>
      <Text style={{marginLeft:50,marginTop:5,fontSize:15,fontWeight:'bold'}}>Add Admin</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{display:'flex',flexDirection:'row',height:40,backgroundColor:'#B3C8CF',borderRadius:5,marginLeft:5}} >
    <AntDesign name="delete" size={24} color="black"  style={{marginLeft:5,marginTop:5}}/>
        <Text style={{marginLeft:50,marginTop:5,fontSize:15,fontWeight:'bold'}} >Delete  Admin</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{display:'flex',flexDirection:'row',height:40,backgroundColor:'#B3C8CF',borderRadius:5,marginLeft:5}} >
    <Ionicons name="newspaper" size={24} color="black" style={{marginLeft:5,marginTop:5}}/>
        <Text style={{marginLeft:50,marginTop:5,fontSize:15,fontWeight:'bold'}}>Update Admin</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{display:'flex',flexDirection:'row',height:40,backgroundColor:'#B3C8CF',borderRadius:5,marginLeft:5}} >
    <Ionicons name="diamond" size={24} color="black" style={{marginLeft:5,marginTop:5}}/>
        <Text style={{marginLeft:50,marginTop:5,fontSize:15,fontWeight:'bold'}}>ADD Diamond</Text>
    </TouchableOpacity>
   
    
    </View>
  )
}

const styles = StyleSheet.create({})