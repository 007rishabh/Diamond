import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
const ShowProducts = ({ route }) => {
    const { product } = route.params;
    const { name, price, category, subcategory } = product;
    return (
        <View style={{ marginTop: 20 }}>
        <LinearGradient
          // Background Linear Gradient
          colors={['#36A7E6', '#073854']}
          style={styles.background}
        />
            <Text style={{ padding: 10, fontSize: 24, fontWeight: 500, marginLeft: '35%' }}>Product</Text>
            <View style={{ alignItems: 'center', marginTop: 50 ,flexDirection:'row'}}>
                <View style={{width:'50%'}}>
                    <FontAwesome name="diamond" size={40} color="black" style={{marginLeft:'30%'}} />
                </View>
                <View style={{width:'50%'}}>
                <Text style={{ fontSize: 20, fontWeight: 400, marginTop: 20, marginLeft:'30%' }}>{name}</Text>
                <Text style={{ fontSize: 20, fontWeight: 400, marginTop: 20 ,marginLeft:'30%'}}>{price}</Text>
                <Text style={{ fontSize: 20, fontWeight: 400, marginTop: 20 ,marginLeft:'30%' }}>{category}</Text>
                <Text style={{ fontSize: 20, fontWeight: 400, marginTop: 20 ,marginLeft:'30%' }}>{subcategory}</Text>
                </View>
                </View>
            <TouchableOpacity
                style={[styles.submitBtn, styles.green]} >
                <Text style={{ marginLeft: 160, fontSize: 20 }} >Buy</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.submitBtn, styles.red]} >
                <Text style={{ marginLeft: 160, fontSize: 20 }} >Sell</Text>
            </TouchableOpacity>
            <View style={{ marginLeft: 70 }}>
                <FontAwesome name="bar-chart-o" size={200} color="black" />
            </View>
            <View style={{ marginLeft: 70 }}>
                <FontAwesome name="bar-chart-o" size={200} color="black" />
            </View>
        </View>
    )
}

export default ShowProducts

const styles = StyleSheet.create({
    submitBtn: {
        backgroundColor: '#6AD4DD',
        height: 50,
        marginHorizontal: 25,
        borderRadius: 80,
        justifyContent: 'center',
        marginBottom: 20,
        marginTop: 20
    },
    green: {
        backgroundColor: '#55efc4'
    },
    red: {
        backgroundColor: '#ff7675'
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height:'100%'
      },
})