import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
const Product = () => {
    return (
        <View style={{ marginTop: 20 }}>
            <Text style={{ padding: 10, fontSize: 24, fontWeight: 500, marginLeft: '35%' }}>Product</Text>
            <View style={{ alignItems: 'center', marginTop: 50 }}>
                <FontAwesome name="diamond" size={40} color="black" />
                <Text style={{ fontSize: 20, fontWeight: 400, marginTop: 20 }}>Ruby Diamond</Text>
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

export default Product

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
    }
})