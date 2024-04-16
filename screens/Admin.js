import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
export default function Admin() {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={{gap:10,backgroundColor:'#36A7E6', height:'100%'}}>
    <Text style={{fontSize:20,padding:10,fontWeight:700}}>Admin</Text>
    <TouchableOpacity style={{display:'flex',flexDirection:'row',height:40,backgroundColor:'#dfe6e9',borderRadius:5,marginLeft:5}} >
    <FontAwesome5 name="user-alt" size={24} color="black" style={{marginLeft:5,marginTop:5}}/>
      <Text style={{marginLeft:50,marginTop:5,fontSize:15,fontWeight:'bold'}}
      onPress={()=> navigation.navigate("Register")}
      >ADD User</Text>
    </TouchableOpacity>

    
    <TouchableOpacity style={{display:'flex',flexDirection:'row',height:40,backgroundColor:'#dfe6e9',borderRadius:5,marginLeft:5}} >
    <Ionicons name="diamond" size={24} color="black" style={{marginLeft:5,marginTop:5}}/>
        <Text style={{marginLeft:50,marginTop:5,fontSize:15,fontWeight:'bold'}}
        onPress={()=> navigation.navigate("AddDiamond")}
        >ADD Product</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{display:'flex',flexDirection:'row',height:40,backgroundColor:'#dfe6e9',borderRadius:5,marginLeft:5}} >
    <Ionicons name="newspaper" size={24} color="black" style={{marginLeft:5,marginTop:5}}/>
        <Text style={{marginLeft:50,marginTop:5,fontSize:15,fontWeight:'bold'}}
        onPress={()=> navigation.navigate("AddNews")}
        >ADD News</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{display:'flex',flexDirection:'row',height:40,backgroundColor:'#dfe6e9',borderRadius:5,marginLeft:5}} >
    <FontAwesome name="history" size={24} color="black" style={{marginLeft:5,marginTop:5}}/>      
    <Text style={{marginLeft:50,marginTop:5,fontSize:15,fontWeight:'bold'}}>History</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{display:'flex',flexDirection:'row',height:40,backgroundColor:'#dfe6e9',borderRadius:5,marginLeft:5}} >
    <Ionicons name="wallet" size={24} color="black" style={{marginLeft:5,marginTop:5}}/>      
    <Text style={{marginLeft:50,marginTop:5,fontSize:15,fontWeight:'bold'}}>ADD Wallet</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{display:'flex',flexDirection:'row',height:40,backgroundColor:'#dfe6e9',borderRadius:5,marginLeft:5}}
    onPress={()=> navigation.navigate('ShowNews')}
    >
    <FontAwesome name="eye" size={24} color="black" style={{marginLeft:5,marginTop:5}}/>
    <Text style={{marginLeft:50,marginTop:5,fontSize:15,fontWeight:'bold'}}>Show All News</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>navigation.navigate('AdminShowProduct')} style={{display:'flex',flexDirection:'row',height:40,backgroundColor:'#dfe6e9',borderRadius:5,marginLeft:5}} >
    <FontAwesome name="eye" size={24} color="black" style={{marginLeft:5,marginTop:5}}/>
    <Text style={{marginLeft:50,marginTop:5,fontSize:15,fontWeight:'bold'}}>Show All Products</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{display:'flex',flexDirection:'row',height:40,backgroundColor:'#dfe6e9',borderRadius:5,marginLeft:5}}
      onPress={()=>navigation.navigate('ShowUsers')}
    >
    <FontAwesome name="eye" size={24} color="black" style={{marginLeft:5,marginTop:5}}/>
    <Text style={{marginLeft:50,marginTop:5,fontSize:15,fontWeight:'bold'}}>Show All Users</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{display:'flex',flexDirection:'row',height:40,backgroundColor:'#dfe6e9',borderRadius:5,marginLeft:5}} >
    <FontAwesome name="eye" size={24} color="black" style={{marginLeft:5,marginTop:5}}/>
    <Text style={{marginLeft:50,marginTop:5,fontSize:15,fontWeight:'bold'}}>Show All Admins</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{display:'flex',flexDirection:'row',height:40,backgroundColor:'#dfe6e9',borderRadius:5,marginLeft:5}} 
    onPress={()=>navigation.navigate('Pending')}>
    <FontAwesome name="eye" size={24} color="black" style={{marginLeft:5,marginTop:5}}/>
    <Text style={{marginLeft:50,marginTop:5,fontSize:15,fontWeight:'bold'}}>Pending Request</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{display:'flex',flexDirection:'row',height:40,backgroundColor:'#dfe6e9',borderRadius:5,marginLeft:5}} 
      onPress={()=>navigation.navigate('PendingPayments')}
    >
    <FontAwesome name="history" size={24} color="black" style={{marginLeft:5,marginTop:5}}/>      
    <Text style={{marginLeft:50,marginTop:5,fontSize:15,fontWeight:'bold'}}>Pending  Payment</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{display:'flex',flexDirection:'row',height:40,backgroundColor:'#dfe6e9',borderRadius:5,marginLeft:5}} onPress={()=>navigation.navigate('Login')} >
    <Ionicons name="log-out" size={24} color="black" style={{marginLeft:5,marginTop:5}}/>      
    <Text style={{marginLeft:50,marginTop:5,fontSize:15,fontWeight:'bold'}} >Logout</Text>
    </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})