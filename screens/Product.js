import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  ToastAndroid,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseurl } from "../Constant";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
const Product = ({ route }) => {
  const navigation = useNavigation();
  const { product } = route.params;
  const { id, name, price, category, subcategory } = product;
  const [qty, setQty] = useState();
  const buyDiamonds = async () => {
    // const url = "http://192.168.1.46:8080/api/diamonds";
    const userId = await AsyncStorage.getItem("userId");
    // console.log(JSON.stringify({
    //   userId,
    //   productId: product.id,
    //   quantity: qty,
    //   type: "buy",
    //   totalPrice: product.price,
    // }))
    const url = `${baseurl}/order`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        userId,
        productId: product.id,
        quantity: qty,
        type: "buy",
        totalPrice: product.price * qty,
      }),
    });
    console.log(res);
    const result = await res.json();
    ToastAndroid.show(result.message, ToastAndroid.SHORT);
  };
  const data = {
    labels: [10,11,12,13,14,15,16],
    datasets: [
      {
        data: [900,200,350,450,800,700],
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
    useShadowColorFromDataset: false // optional
  };
  return (
    <>
      <ScrollView
        style={{ backgroundColor: "#74b9ff", flex: 1, padding: 20 }}
      >
        <View style={{ borderColor: "black" }}>
          <View style={{ padding: 10 }}>
            <Image
              source={require("../assets/diamond.jpg")}
              style={{ height: 240, width: "100%" }}
            />
          </View>
          <View
            style={{
              borderWidth: 2,
              padding: 5,
              borderRadius: 15,
              backgroundColor: "#1e3799",
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <Text style={{ fontSize: 20, fontWeight: "500" }}>
                Blue Diamond
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "500" }}>Per Price</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                // marginTop: 10,
                padding: 10,
              }}
            >
              <TextInput
                style={{
                  backgroundColor: "#dfe6e9",
                  height: 40,
                  width: 60,
                  borderRadius: 8,
                  padding: 10,
                }}
                placeholder="Qty"
                value={qty}
                onChangeText={(text) => setQty(text)}
              />
              <Text style={{ fontSize: 20, fontWeight: "500" }}>New</Text>
              <Text style={{ fontSize: 20, fontWeight: "500" }}>
                {product.price}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                // marginTop: 10,
                padding: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  height: 40,
                  width: 60,
                  backgroundColor: "#81ecec",
                  justifyContent: "center",
                  borderRadius: 8,
                }}
                onPress={buyDiamonds}
              >
                <Text style={{ textAlign: "center" }}>Buy</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 20, fontWeight: "500" }}>Old</Text>
              <Text style={{ fontSize: 20, fontWeight: "500", color: "grey" }}>
                {product.price}
              </Text>
            </View>
          </View>
        </View>
        <BarChart
          data={data}
          width={Dimensions.get('window').width-50}
          height={250}
          chartConfig={chartConfig}
          style={{alignItems:'center',borderRadius:10,padding:10}}
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
});
