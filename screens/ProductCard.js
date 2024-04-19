import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  ToastAndroid
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import React, { Fragment, useEffect, useState } from "react";
import Product from "./Product";
import { baseurl } from "../Constant";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductCard = ({ product }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      key={product.id}
      style={[styles.card, styles.cardElevated]}
      onPress={() => navigation.navigate("Product", { product })}
    >

      <Image
        source={require("../assets/diamond.jpg")}
        style={{ height: 120, width: 180 }}
      />

      <View
        style={{
          borderWidth: 2,
          padding: 0,
          borderRadius: 15,

          width: 250,
          height: 125,
          marginTop: 15,
          gap: 20
        }}
      >
        <LinearGradient
          // Background Linear Gradient
          colors={['#36A7E6', '#073854']}
          style={{ height: '100%' ,width:'100%',borderRadius: 15,}}

        >

          <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
            <Text style={{ fontSize: 20, fontWeight: "500", color: '#fff' }}>{product.name}</Text>
            <Text style={{ fontSize: 20, fontWeight: "500", color: '#fff' }}>Price</Text>
          </View>

          <View style={{ flexDirection: 'row', gap: 30,marginTop:10, padding:5}}>
            <View>
              <View
                style={{
                  height: 50,
                  width: 60,
                  backgroundColor: "#81ecec",
                  justifyContent: "center",
                  borderRadius: 5,
                }}
              >
                <Text style={{ textAlign: "center",fontSize:20 }}>Buy</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row', gap: 50 }}>
                <Text style={{ fontSize: 20, fontWeight: "500", color: '#fff' }}>New</Text>
                <Text style={{ fontSize: 20, fontWeight: "500" }}>
                  {product.price}/-
                </Text>
              </View>
              <View style={{ flexDirection: 'row', gap: 50 }}>
                <Text style={{ fontSize: 20, fontWeight: "500", color: '#fff' }}>Old</Text>
                <Text style={{ fontSize: 20, fontWeight: "500", color: "grey" }}>
                  {product.price}/-
                </Text>
              </View>
            </View>

          </View>

                </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
const styles = StyleSheet.create({
  container: {
    padding: 8,
    height: 300,
  },
  headingText: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 8,
    marginTop: 20,
  },
  card: {
    flex: 1,
    // justifyContent:'center',
    alignItems: "center",
    height: 250,
    width: 280,
    borderRadius: 10,
    margin: 8,
  },

  cardElevated: {
    backgroundColor: "#fff",
    elevation: 4,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },

});

