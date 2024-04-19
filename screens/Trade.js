import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import React, { Fragment, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Product from "./Product";
import { baseurl } from "../Constant";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProductCard from "./ProductCard";
import { LoadingIndicator } from "../components/LoadingIndicator.js";

const Trade = () => {
  const navigation = useNavigation();
  const isfocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = React.useState([]);
  useEffect(() => {
    const getDiamonds = async () => {
      try {
        setLoading(true);
        console.log("start");
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
      } catch {
      } finally {
        setLoading(false);
      }
    };
    getDiamonds();
  }, [isfocused]);

  return (
    <>
      <LinearGradient
        // Background Linear Gradient
        colors={["#36A7E6", "#073854"]}
        style={styles.background}
      />
      {loading ? (
        <LoadingIndicator />
      ) : (
        <ScrollView style={{ height: "100%" }}>
          {Object.entries(products).map(([key, value]) => (
            <Fragment key={key}>
              <Text style={styles.headingText}>{`${key} carat`}</Text>
              <ScrollView horizontal={true} style={styles.container}>
                {value.map((product, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => navigation.navigate("Product")}
                  >
                    <ProductCard product={product} key={product._id} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </Fragment>
          ))}
        </ScrollView>
      )}
    </>
  );
};

export default Trade;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    height: 310,
  },
  headingText: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 8,
    marginTop: 20,
    color: "#fff",
  },
  card: {
    flex: 1,
    // justifyContent:'center',
    alignItems: "center",
    height: 300,
    width: 300,
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
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
});
