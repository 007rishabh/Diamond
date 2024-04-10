import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Home = () => {
  return (
    <>
      <View style={{padding:10,backgroundColor:'#81ecec',flex:1}}>
        <Text style={{fontSize:24,fontWeight:500,marginTop:10}}>Top Gainer</Text>
      </View>
      <View style={{flex:2,flexDirection:'row'}}>
      <View style={{padding:10,backgroundColor:'#a29bfe',flex:1}}>
        <Text style={{fontSize:24,fontWeight:500}}>Top Gainer</Text>
      </View>
      <View style={{padding:10,backgroundColor:'#dfe6e9',flex:1}}>
        <Text style={{fontSize:24,fontWeight:500}}>Top Losser</Text>
        </View>
      </View>
      </>
  )
}

export default Home

const styles = StyleSheet.create({})