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
import { BarChart, LineChart } from "react-native-chart-kit";
import { baseurl } from "../Constant";
import axios from "axios";
const Product = ({ route }) => {
  const { product } = route.params;
  const [qty, setQty] = useState();
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    const getHistory = async () => {
      try {
        const result = await axios.get(
          `${baseurl}/diamond/price-history/${product.id}`
        );
        if (result.data?.length === 0) {
          console.log("came here");
          setHistory([
            {
              createdAt: new Date(product.createdAt).toISOString(),
              new_price: product.price,
            },
          ]);
          return;
        }
        if (result.data.length === 1) {
          setHistory([
            {
              createdAt: new Date(product.createdAt).toISOString(),
              new_price: product.old_price,
            },
            ...result.data,
          ]);
          return;
        }
        setHistory(result.data);
      } catch (error) {
        console.error(error);
      }
    };
    getHistory();
  }, []);
  const buyDiamonds = async () => {
    try {
      setLoading(true);
      const userId = await AsyncStorage.getItem("userId");

      const url = `${baseurl}/order`;
      const reqBody = {
        userId,
        product_id: product.id,
        quantity: qty,
        type: "buy",
        total_price: product.price * qty,
      };

      try {
        const result = await axios.post(url, reqBody);

        ToastAndroid.show(
          result.data?.message ?? "product bought",
          ToastAndroid.SHORT
        );
      } catch (err) {
        console.error(err.response?.data);
        ToastAndroid.show(
          err?.response?.data?.message ?? "Insufficient Balance",
          ToastAndroid.SHORT
        );
      }
    } catch {
      ToastAndroid.show("Some error occurred", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  const data = {
    labels: [
      "",
      ...history.map((item) => new Date(item.createdAt).toLocaleDateString()),
    ],
    datasets: [
      {
        data: [0, ...history.map((item) => item.new_price)],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
  };
  const chartConfig = {
    backgroundGradientFrom: "#000",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "blue",
    backgroundGradientToOpacity: 0.6,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  };
  return (
    <>
      <LinearGradient
        colors={["#36A7E6", "#073854"]}
        style={styles.background}
      />
      <ScrollView style={{ flex: 1, padding: 20, marginBottom: 10 }}>
        <View style={{ borderColor: "black", marginBottom: 10 }}>
          <View style={{ padding: 10, alignItems: "center" }}>
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
          <View
            style={{
              borderWidth: 2,
              borderRadius: 15,
            }}
          >
            <LinearGradient
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
                      borderRadius: 5,
                      padding: 10,
                      paddingHorizontal: 30,
                    }}
                    placeholder="Qty"
                    value={qty}
                    onChangeText={setQty}
                    keyboardType="number-pad"
                  />
                  <TouchableOpacity
                    style={{
                      paddingHorizontal: 30,
                      paddingVertical: 10,
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
        <LineChart
          data={data}
          width={screenWidth}
          height={350}
          chartConfig={chartConfig}
          fromZero={true}
          yAxisLabel="Rs "
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
