import { useIsFocused, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { LoadingIndicator } from "../components/LoadingIndicator.js";
import { baseurl } from "../Constant";
import ProductCard from "./ProductCard";

const Trade = () => {
  const isfocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = React.useState([]);
  useEffect(() => {
    const getDiamonds = async () => {
      try {
        setLoading(true);
        const url = `${baseurl}/diamonds`;
        const res = await fetch(url, {
          method: "GET",
        });
        const result = await res.json();
        if (res.status === 200) {
          const data = result.reduce((acc, item) => {
            if (!acc[item.carat]) {
              acc[item.carat] = [];
            }
            acc[item.carat] = [...acc[item.carat], item];
            return acc;
          }, {});
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
        colors={["#36A7E6", "#073854"]}
        style={styles.background}
      />
      {loading ? (
        <LoadingIndicator />
      ) : (
        <ScrollView style={{ height: "100%", paddingLeft: 10 }}>
          {Object.entries(products).map(([key, value]) => (
            <View key={key} style={{ marginBottom: 20, gap: 10 }}>
              <Text style={styles.headingText}>{`carat : ${key}`}</Text>
              <ScrollView
                horizontal={true}
                contentContainerStyle={{
                  columnGap: 16,
                }}
              >
                {value.map((product, index) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </ScrollView>
            </View>
          ))}
        </ScrollView>
      )}
    </>
  );
};

export default Trade;

const styles = StyleSheet.create({
  headingText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  card: {
    flex: 1,
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
