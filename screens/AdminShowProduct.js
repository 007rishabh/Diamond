import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { Fragment, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { baseurl } from "../Constant";
const AdminShowProduct = () => {
  const navigation = useNavigation();
  const [products, setProducts] = React.useState([]);
  const getDiamonds = async () => {
    const url = `${baseurl}/diamonds`;
    const res = await fetch(url, {
      method: "GET",
    });
    const result = await res.json();
    if (res.status === 200) {
      setProducts(result);
    }
  };
  useEffect(() => {
    getDiamonds();
  }, []);
  const deleteProduct = async (id) => {
    const url = `${baseurl}/diamonds/${id}`;
    const res = await fetch(url, {
      method: "DELETE",
    });
    getDiamonds();
  };

  return (
    <ScrollView style={{ backgroundColor: "#74b9ff", flex: 1 }}>
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
                onPress={deleteProduct}
              >
                <AntDesign name="delete" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: "10%" }}>
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
});
