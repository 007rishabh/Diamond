import { StyleSheet, Text, View,TextInput ,TouchableOpacity, Alert} from 'react-native'
import React, { useState } from 'react'
// import { useNavigation } from '@react-navigation/native';
// import Home from './Home';
import {baseurl} from '../Constant'
const Register = ({navigation}) => {
    // const navigation = useNavigation()
    const  [username, setName] = useState()
    const  [password, setPassword] = useState()
    const  [email, setEmail] = useState()
    const  [confirmpassword, setConfirmPassword] = useState()
    const add = async () => {
      if(password !== confirmpassword){
        Alert.alert("passwords doesn't match")
      return;
      }

        // const url = "http://192.168.1.46:8080/api/auth/signup";
        const url = `${baseurl}/auth/signup`;
      const res = await fetch(url, {
          headers: {
              "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ username,email, password ,walletAmount:0}),
      });
      const result = await res.json()
      console.log(res, result)

      Alert.alert("Alert Title", result.message, [
          {
              text: "OK", onPress: () => {
                  if (res.status === 201) {
                      navigation.navigate('Login')
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
      <Text style={styles.pageText}>Register</Text>
      <View style={{marginHorizontal:20}}>
        <Text style={{fontSize:20,fontWeight:700}}>Name</Text>
        <TextInput 
        value={username}
        style={styles.textInput}
        onChangeText={(name)=>setName(name)}
        />
        <Text style={{fontSize:20,fontWeight:700}}>Email</Text>
        <TextInput 
        value={email}
        style={styles.textInput}
        onChangeText={(email)=>setEmail(email)}
        />
        <Text style={{fontSize:20,fontWeight:700}}>Password</Text>
        <TextInput value={password} 
        style={styles.textInput}
        onChangeText={(password)=>setPassword(password)}
        />
        <Text style={{fontSize:20,fontWeight:700}}>Confirm Password</Text>
        <TextInput style={styles.textInput}
        onChangeText={(confirmpassword)=>setConfirmPassword(confirmpassword)}
        />
        
      </View>
      <TouchableOpacity
        style={styles.submitBtn } onPress={add}>
        <Text style={{ marginLeft: 130, fontSize: 20 }} >Register</Text>
      </TouchableOpacity>
      <Text style={styles.linkText}>For Login to Application <Text onPress={() => navigation.navigate('Login')} style={styles.link}>Login</Text></Text>

    </View>
  )
}

export default Register

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'#36A7E6'
    },
    pageText:{
        fontSize:40,
        fontWeight:'bold',
        textAlign:"center",
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
        backgroundColor:'#00b894',
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