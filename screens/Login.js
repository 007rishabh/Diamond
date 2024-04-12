import { StyleSheet, Text, View,TextInput ,TouchableOpacity,Alert} from 'react-native'
import React, { useState } from 'react'

import {baseurl} from '../../Front/Constant'
// import Home from './Home'
// import { useState } from 'react'

const Login = ({navigation}) => {


  const  [password, setPassword] = useState('admin')
  const  [email, setEmail] = useState('admin@gmail.com')

  const add = async () => {

      const url = `${baseurl}/auth/signin`;
    const res = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({email, password }),
    });
    const result = await res.json()
    console.log(res, result)

    Alert.alert("Alert Title", result.message, [
        {
            text: "OK", onPress: () => {

                if (res.status === 200) {
                  if(true){
                  // if(result.data.role === "admin"){
                    navigation.navigate('Admin')

                  }
                  else{
                    navigation.navigate('HomeScreen')
                  }
                }
                else {
                    setPassword('')
                }
            }
        }
    ]);


};

    
  return (
    <View style={styles.container}>
      <Text style={styles.pageText}>Login User/Admin</Text>
      <View style={{marginHorizontal:20}}>
        <Text style={{fontSize:20,fontWeight:700}}>Email</Text>
        <TextInput 
        value={email} 
        style={styles.textInput}
        onChangeText={(email)=>setEmail(email)}
        />
        <Text style={{fontSize:20,fontWeight:700}}>Password</Text>
        <TextInput style={styles.textInput}
        value={password} 
        onChangeText={(password)=>setPassword(password)}
        />
      </View>
      <TouchableOpacity
        style={styles.submitBtn } onPress={add} >
        <Text style={{ marginLeft: 160, fontSize: 20 }} >Login</Text>
      </TouchableOpacity>
      <Text style={styles.linkText}>Not A User Please? <Text onPress={() => navigation.navigate('Register')} style={styles.link}>REGISTER</Text></Text>
      

    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        // backgroundColor:'#FFF2E1'
    },
    pageText:{
        fontSize:40,
        fontWeight:'bold',
        textAlign:"center",
        color:'#31363F',
        marginBottom:20
    },
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
        backgroundColor:'#6AD4DD',
       height: 50,
       marginHorizontal: 25,
       borderRadius: 80,
       justifyContent: 'center',
       marginBottom: 20,
       marginTop: 20
     },
     linkText: {
        textAlign: 'center'
      },
      link: {
        color: 'red'
      }
})