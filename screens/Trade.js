import { StyleSheet, Text, View ,ScrollView, TouchableOpacity} from 'react-native'
import React from 'react'
// import { useNavigation } from '@react-navigation/native';
const Trade = () => {
    // const navigation=useNavigation()
  return (
    <>
    <View>
    <Text style={styles.headingText}>12 Carat</Text>
    <ScrollView horizontal={true} style={styles.container}>
        <TouchableOpacity style={[styles.card , styles.cardElevated]} >
            <Text>Diamond 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card , styles.cardElevated]}>
            <Text>Diamond 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card , styles.cardElevated]}>
            <Text>Diamond 3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card , styles.cardElevated]}>
            <Text>Diamond 4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card , styles.cardElevated]}>
            <Text>Diamond 5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card , styles.cardElevated]}>
            <Text>Diamond 6</Text>
        </TouchableOpacity>
    </ScrollView>
  </View>
    <View>
    <Text style={styles.headingText}>14 Carat</Text>
    <ScrollView horizontal={true} style={styles.container}>
        <TouchableOpacity style={[styles.card , styles.cardElevated]}>
            <Text>Diamond 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card , styles.cardElevated]}>
            <Text>Diamond 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card , styles.cardElevated]}>
            <Text>Diamond 3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card , styles.cardElevated]}>
            <Text>Diamond 4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card , styles.cardElevated]}>
            <Text>Diamond 5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card , styles.cardElevated]}>
            <Text>Diamond 6</Text>
        </TouchableOpacity>
    </ScrollView>
  </View>
    <View>
    <Text style={styles.headingText}>16 Carat</Text>
    <ScrollView horizontal={true} style={styles.container}>
        <TouchableOpacity style={[styles.card , styles.cardElevated]}>
            <Text>Diamond 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card , styles.cardElevated]}>
            <Text>Diamond 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card , styles.cardElevated]}>
            <Text>Diamond 3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card , styles.cardElevated]}>
            <Text>Diamond 4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card , styles.cardElevated]}>
            <Text>Diamond 5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card , styles.cardElevated]}>
            <Text>Diamond 6</Text>
        </TouchableOpacity>
    </ScrollView>
  </View>
  </>
  )
}

export default Trade

const styles = StyleSheet.create({
    container:{
        padding:8
    },
    headingText:{
        fontSize:24,
        fontWeight:'bold',
        paddingHorizontal:8,
        marginTop:20
    },
    card:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        height:100,
        width:100,
        borderRadius:4,
        margin:8
    },
    cardElevated:{
        backgroundColor:"#42f5ef",
        elevation:4,
        shadowOffset:{
            height:1,
            width:1
        },
        shadowColor:"black",
        shadowOpacity:0.4,
        shadowRadius:2
    }
})