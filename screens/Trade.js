import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions
} from "react-native";
import React, { Fragment, useEffect,useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import Product from "./Product";
import { baseurl } from "../Constant";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProductCard from "./ProductCard";
const Trade = () => {
  const navigation = useNavigation();
  const isfocused = useIsFocused();
 
  const [products, setProducts] = React.useState([]);
  useEffect(() => {
    const getDiamonds = async () => {
      console.log("start");
      // const url = "http://192.168.1.46:8080/api/diamonds";
      const url = `${baseurl}/diamonds`;
      const res = await fetch(url, {
        method: "GET",
      });
      const result = await res.json();
      console.log({ result });
      if (res.status === 200) {
        const data = result.reduce((acc, item) => {
          if (!acc[item.category]) {
            acc[item.category] = [];
          }
          acc[item.category] = [...acc[item.category], item];
          return acc;
        }, {});
        console.log(data);
        setProducts(data);
      }
    };
    getDiamonds();
  }, [isfocused]);

  // <ImageBackground source={require('../assets/trade.png')} style={{}}></ImageBackground>
  return (
    <>
      <ScrollView style={{  height: "100%" }}>
      <LinearGradient
          // Background Linear Gradient
          colors={['#36A7E6', '#073854']}
          style={styles.background}
        />
        {Object.entries(products).map(([key, value]) => (
          <Fragment key={key}>
            <Text style={styles.headingText}>{`${key} carat`}</Text>
            <ScrollView horizontal={true} style={styles.container}>
              {value.map((product) => (
                <TouchableOpacity onPress={()=>navigation.navigate('Product')}>
                <ProductCard product={product} key={product._id}/>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Fragment>
        ))}
      </ScrollView>
    </>
  );
};

export default Trade;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    height:310,
  },
  headingText: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 8,
    marginTop: 20,
    color:'#fff'
  },
  card: {
    flex: 1,
    // justifyContent:'center',
    alignItems: "center",
    height: 300,
    width:300,
    borderRadius: 4,
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
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height:'100%'
  },

});

