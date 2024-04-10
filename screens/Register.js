import { StyleSheet, Text, View,TextInput ,TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Register = () => {
    const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Text style={styles.pageText}>Register</Text>
      <View style={{marginHorizontal:20}}>
        <Text style={{fontSize:20,fontWeight:700}}>Email</Text>
        <TextInput style={styles.textInput}/>
        <Text style={{fontSize:20,fontWeight:700}}>Password</Text>
        <TextInput style={styles.textInput}/>
        <Text style={{fontSize:20,fontWeight:700}}>Confirm Password</Text>
        <TextInput style={styles.textInput}/>
      </View>
      <TouchableOpacity
        style={styles.submitBtn } >
        <Text style={{ marginLeft: 130, fontSize: 20 }} >Login</Text>
      </TouchableOpacity>
      <Text style={styles.linkText}>Already a User? please <Text onPress={() => navigation.navigate('Login')} style={styles.link}>Login</Text></Text>

    </View>
  )
}

export default Register

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