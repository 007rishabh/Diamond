import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native'
const Product = ({ route }) => {
    const navigation= useNavigation()
    const { product } = route.params;
    const { name, price, category, subcategory } = product;
    return (
        <View style={{ marginTop: 20 }}>
        <View style={{flexDirection:'row'}}>
            <Text style={{ padding: 10, fontSize: 24, fontWeight: 500 }}>Product</Text>
            <TouchableOpacity style={{marginLeft:'55%',marginTop:20}} 
            onPress={navigation.navigate('AddDiamond')}
            >
            <FontAwesome name="edit" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop:20,marginLeft:10}}>
            <AntDesign name="delete" size={24} color="black" />
            </TouchableOpacity>
        </View>
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