import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

const TC = () => {
  return (
    <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
    <LinearGradient
          // Background Linear Gradient
          colors={['#36A7E6', '#073854']}
          style={styles.background}
        />
            <TextInput style={{backgroundColor:'#fff',width:'80%',height:100,borderRadius:10}}/>
            <TouchableOpacity style={styles.submitBtn}>
                <Text style={{textAlign:'center',fontSize:20,fontWeight:'500'}}>Submit</Text>
            </TouchableOpacity>
        </View>
  )
}

export default TC

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height:'100%'
      },
      submitBtn: {
        backgroundColor: "#10A450",
        height: 50,
        marginHorizontal: 25,
        borderRadius: 80,
        justifyContent: "center",
        marginBottom: 20,
        marginTop: 20,
        width:'80%'
      },
})