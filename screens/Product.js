import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import { baseurl } from "../Constant";
import axios from 'axios'
const Product = ({ route }) => {
  const { product } = route.params;
  const [qty, setQty] = useState();
  const [loading, setLoading] = useState(false);

  console.info(product)

  const buyDiamonds = async () => {
    try{
      setLoading(true)
    const userId = await AsyncStorage.getItem("userId");

    const url = `${baseurl}/order`;
    const reqBody = {
      userId,
      product_id: product.id,
      quantity: qty,
      type: "buy",
      total_price: product.price * qty,
    }
  
    console.info({reqBody})
    try{

      const result = await axios.post(url, reqBody);
      console.log({result});
      
      ToastAndroid.show(result.data?.message ?? 'product bought', ToastAndroid.SHORT);
    }catch(err){
      console.error(err.response?.data)
    }
    }catch{
    }
    finally{
      setLoading(false)
    }
  };


  const data = {
    labels: [10, 11, 12, 13, 14, 15, 16],
    datasets: [
      {
        data: [900, 200, 350, 450, 800, 700],
      },
    ],
  };
  const chartConfig = {
    backgroundGradientFrom: "black",
    backgroundGradientFromOpacity: 0.6,
    backgroundGradientTo: "blue",
    backgroundGradientToOpacity: 0.6,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  return (
    <>
      <LinearGradient
        // Background Linear Gradient
        colors={["#36A7E6", "#073854"]}
        style={styles.background}
      />
      <ScrollView style={{ flex: 1, padding: 20 }}>
        <View style={{ borderColor: "black" }}>
          <View style={{ padding: 10 ,marginLeft:35}}>
          <View style={{ width: 110 }}>
          {product.image?.url ? (
            <Image
              source={{
                uri: product.image?.url,
              }}
              style={{
                borderRadius: 10,
                width: 300,
                height: 300,
              }}
              alt="image"
            />
          ) : (
            <Text>No Image</Text>
          )}
        </View>
          </View>
          <View
            style={{
              borderWidth: 2,
              borderRadius: 15,
              // backgroundColor: "#36A7E6",
            }}
          >
            <LinearGradient
              // Background Linear Gradient
              colors={["#36A7E6", "#073854"]}
              style={{ width: "100%", borderRadius: 15 }}
            >
              <View style={{ flexDirection: "column", padding: 10, gap: 5 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <Text style={{ fontSize: 15, color: "#fff" }}>Name:</Text>
                  <Text style={{ fontSize: 15, color: "#fff" }}>
                    {product.name}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <Text style={{ fontSize: 15, color: "#fff" }}>Size:</Text>
                  <Text style={{ fontSize: 15, color: "#fff" }}>
                    {product.size}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <Text style={{ fontSize: 15, color: "#fff" }}>Shape:</Text>
                  <Text style={{ fontSize: 15, color: "#fff" }}>
                    {product.shape}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <Text style={{ fontSize: 15, color: "#fff" }}>Colour:</Text>
                  <Text style={{ fontSize: 15, color: "#fff" }}>
                    {product.color}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <Text style={{ fontSize: 15, color: "#fff" }}>Carat:</Text>
                  <Text style={{ fontSize: 15, color: "#fff" }}>
                    {product.carat}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <Text style={{ fontSize: 15, color: "#fff" }}>
                    Manufacturing:
                  </Text>
                  <Text style={{ fontSize: 15, color: "#fff" }}>
                    {product.manufacturing}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <Text style={{ fontSize: 15, color: "#fff" }}>
                    Old Price:
                  </Text>
                  <Text style={{ fontSize: 15, color: "#fff" }}>
                    {product.old_price}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <Text style={{ fontSize: 15, color: "#fff" }}>
                    New Price:
                  </Text>
                  <Text style={{ fontSize: 15, color: "#fff" }}>
                    {product.price}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <TextInput
                    style={{
                      backgroundColor: "#fff",
                      height: 40,
                      width: 40,
                      borderRadius: 5,
                      padding: 10,
                    }}
                    placeholder="Qty"
                    value={qty}
                    onChangeText={setQty}
                  />
                  <TouchableOpacity
                    style={{
                      height: 40,
                      width: 100,
                      backgroundColor: "#78e08f",
                      borderRadius: 5,
                    }}
                    onPress={buyDiamonds}
                    keyboardType="number-pad"
                    disabled={loading}
                  >
                    <Text style={{ textAlign: "center", fontSize: 20 }}>
                      Buy
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>

        <BarChart
          data={data}
          width={Dimensions.get("window").width - 50}
          height={250}
          chartConfig={chartConfig}
          style={{ alignItems: "center", borderRadius: 10, padding: 10 }}
        />
      </ScrollView>
    </>
  );
};

export default Product;

const styles = StyleSheet.create({
  submitBtn: {
    backgroundColor: "#6AD4DD",
    height: 50,
    marginHorizontal: 25,
    borderRadius: 80,
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  green: {
    backgroundColor: "#55efc4",
  },
  red: {
    backgroundColor: "#ff7675",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
});
