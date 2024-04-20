import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ProductCard = ({ product }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
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
          borderRadius: 15,
          width: 280,
          height: 125,
          gap: 20,
        }}
      >
        <LinearGradient
          colors={["#36A7E6", "#073854"]}
          style={{ height: "100%", width: "100%", borderRadius: 15 }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Text style={{ fontSize: 20, fontWeight: "500", color: "#fff" }}>
              {product.name}
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "500", color: "#fff" }}>
              Price
            </Text>
          </View>

          <View
            style={{ flexDirection: "row", gap: 30, marginTop: 10, padding: 5 }}
          >
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
                <Text style={{ textAlign: "center", fontSize: 20 }}>Buy</Text>
              </View>
            </View>
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row", gap: 50 }}>
                <Text
                  style={{ fontSize: 20, fontWeight: "500", color: "#fff" }}
                >
                  New
                </Text>
                <Text style={{ fontSize: 20, fontWeight: "500" }}>
                  {product.price}/-
                </Text>
              </View>
              <View style={{ flexDirection: "row", gap: 50 }}>
                <Text
                  style={{ fontSize: 20, fontWeight: "500", color: "#fff" }}
                >
                  Old
                </Text>
                <Text
                  style={{ fontSize: 20, fontWeight: "500", color: "grey" }}
                >
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
    alignItems: "center",
    rowGap: 10,
    height: 280,
    width: 300,
    borderRadius: 10,
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
