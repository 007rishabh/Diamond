import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { Fragment, useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation ,useIsFocused} from "@react-navigation/native";
import { baseurl } from "../Constant";
import { LinearGradient } from "expo-linear-gradient";
const AdminShowProduct = () => {
  const navigation = useNavigation();
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const isfocused = useIsFocused();

  const getDiamonds = async () => {
    try {
      setLoading(true);
      const url = `${baseurl}/diamonds`;
      const res = await fetch(url, {
        method: "GET",
      });
      const result = await res.json();
      if (res.status === 200) {
        setProducts(result);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getDiamonds();
  }, [isfocused]);
  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      console.log("deleting");
      const url = `${baseurl}/diamond/${id}`;
      const res = await fetch(url, {
        method: "DELETE",
      });
      getDiamonds();
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#36A7E6", "#073854"]}
        style={styles.background}
      />
      {products.map((item) => {
        return (
          <View
            key={item.id}
            style={{
              height: "auto",
              backgroundColor: "#dfe6e9",
              marginTop: 20,
              borderRadius: 8,
              padding: 20,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 20 }}>{item.name}</Text>
              <TouchableOpacity
                style={{ marginLeft: "auto" }}
                onPress={() => deleteProduct(item.id)}
              >
                <AntDesign name="delete" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginLeft: "10%" }}
                onPress={() =>
                  navigation.navigate("AddDiamond", { product: item })
                }
              >
                <AntDesign name="edit" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", gap: 20 }}>
              <Text>{item.category}</Text>
              <Text>{item.subcategory}</Text>
            </View>
            <Text>{"\u20B9" + item.price}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default AdminShowProduct;

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  headingText: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 8,
    marginTop: 20,
  },
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: 100,
    borderRadius: 4,
    margin: 8,
  },
  cardElevated: {
    backgroundColor: "#42f5ef",
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
