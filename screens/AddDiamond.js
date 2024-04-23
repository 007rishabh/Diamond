import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { ImagePicker2 } from "../components/ImagePicker2";
import { baseurl } from "../Constant";
const initialValue = {
  product: {
    name: "",
    size: "",
    shape: "",
    color: "",
    carat: "",
    price: 0,
    manufacturing: "",
  },
};
const AddDiamond = ({ route }) => {
  const { product } = route.params || initialValue;
  const [image, setImage] = useState();

  const [name, setName] = useState();
  const [size, setSize] = useState();
  const [shape, setShape] = useState();
  const [carat, setCarat] = useState();
  const [manufacturing, setManufacturing] = useState();
  const [color, setColor] = useState();
  const [price, setPrice] = useState();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setSize(product.size);
      setCarat(product.carat);
      setColor(product.color);
      setManufacturing(product.manufacturing);
      setPrice(String(product.price));
      setShape(product.shape);
    }
  }, []);
  const addDiamond = async () => {
    try {
      const url = `${baseurl}/diamond`;
      const formData = new FormData();
      console.log(image);
      formData.append("image", {
        uri: image.uri,
        name: image.fileName,
        type: image.mimeType,
      });
      formData.append("name", name);
      formData.append("size", size);
      formData.append("shape", shape);
      formData.append("color", color);
      formData.append("carat", carat);
      formData.append("manufacturing", manufacturing);
      formData.append("price", price);

      const result = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      ToastAndroid.show(result.data.message ?? 'added successfullly', ToastAndroid.SHORT);

      Alert.alert("Alert Title", result.data.message, [
        {
          text: "OK",
          onPress: () => {
            if (result.status === 201) {
              // navigation.navigate('Home')
            } else {
              setName("");
              setPrice("");
              setCarat("");
              setColor("");
              setManufacturing("");
              setShape("");
              setSize("");
            }
          },
        },
      ]);
    } catch (error) {
      console.error({ error });
    }
  };

  const editDiamond = async () => {
    const url = `${baseurl}/diamond/${product.id}`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        name,
        size,
        shape,
        color,
        carat,
        manufacturing,
        price,
      }),
    });
    const result = await res.json();
    console.log(res, result);

    Alert.alert("Alert Title", result.message, [
      {
        text: "OK",
        onPress: () => {
          if (res.status === 201) {
            // navigation.navigate('Home')
          } else {
            setName("");
            setPrice("");
            setCarat("");
            setColor("");
            setManufacturing("");
            setShape("");
            setSize("");
          }
        },
      },
    ]);
  };

  const submitHandler = () => {
    if (product.id) editDiamond();
    else addDiamond();
  };
  return (
    <>
    <ScrollView style={styles.container}>
    <LinearGradient
      // Background Linear Gradient
      colors={["#36A7E6", "#073854"]}
      style={styles.background}
    />
        <Text style={styles.pageText}>
          {product.id ? "Edit Diamond" : "Add Diamond"}
        </Text>
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 700 }}>Name</Text>
          <TextInput
            value={name}
            style={styles.textInput}
            onChangeText={(value) => setName(value)}
          />
          <Text style={{ fontSize: 20, fontWeight: 700 }}>Size</Text>
          <TextInput
            value={size}
            style={styles.textInput}
            onChangeText={(value) => setSize(value)}
          />
          <Text style={{ fontSize: 20, fontWeight: 700 }}>Shape</Text>
          <TextInput
            value={shape}
            style={styles.textInput}
            onChangeText={(value) => setShape(value)}
          />
          <Text style={{ fontSize: 20, fontWeight: 700 }}>Carat</Text>
          <TextInput
            value={carat}
            style={styles.textInput}
            onChangeText={(value) => setCarat(value)}
          />
          <Text style={{ fontSize: 20, fontWeight: 700 }}>Color</Text>
          <TextInput
            value={color}
            style={styles.textInput}
            onChangeText={(value) => setColor(value)}
          />
          <Text style={{ fontSize: 20, fontWeight: 700 }}>Manufacturing</Text>
          <TextInput
            value={manufacturing}
            style={styles.textInput}
            onChangeText={(value) => setManufacturing(value)}
          />

          <Text style={{ fontSize: 20, fontWeight: 700 }}>Price</Text>
          <TextInput
            value={price}
            style={styles.textInput}
            keyboardType="numeric"
            onChangeText={(value) => setPrice(value)}
          />
          <Text style={{ fontSize: 20, fontWeight: 700 }}>Image</Text>
          <View style={{ padding: 10 }}>
            {!product.id && <ImagePicker2 image={image} setImage={setImage} />}
          </View>
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={submitHandler}>
          <Text style={{ marginLeft: 160, fontSize: 20 }}>
            {product.id ? "Edit" : "Add"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default AddDiamond;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'#74b9ff'
  },
  pageText: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",

    marginBottom: 20,
  },
  textInput: {
    height: 40,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
    color: "grey",
  },
  submitBtn: {
    backgroundColor: "#00b894",
    height: 50,
    marginHorizontal: 25,
    borderRadius: 80,
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  linkText: {
    textAlign: "center",
  },
  link: {
    color: "red",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
});
