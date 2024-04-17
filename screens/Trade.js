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
import Product from "./Product";
import { baseurl } from "../Constant";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { height } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
const Trade = () => {
  const navigation = useNavigation();
  const isfocused = useIsFocused();
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
      <ScrollView style={{ backgroundColor: "#74b9ff", height: "100%" }}>
        {Object.entries(products).map(([key, value]) => (
          <Fragment key={key}>
            <Text style={styles.headingText}>{`${key} carat`}</Text>
            <ScrollView horizontal={true} style={styles.container}>
              {value.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  style={[styles.card, styles.cardElevated]}
                  onPress={() => navigation.navigate("Product", { product })}
                >
                    <Image
                      source={require("../assets/diamond.jpg")}
                      style={{ height: 120, width: 180, }}
                    />
                    <View
            style={{
              borderWidth: 2,
              padding: 5,
              borderRadius: 15,
              backgroundColor: "#74b9ff",
              width:250,
              height:150
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
                padding: 10
              }}
            >
              <TextInput
                style={{
                  backgroundColor: "#dfe6e9",
                  height: 40,
                  width: 40,
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
                  width: 40,
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
    height:300,
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

});

