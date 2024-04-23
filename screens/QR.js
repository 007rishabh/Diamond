import { StyleSheet, Text, ToastAndroid, View,Image,TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { ImagePicker2 } from "../components/ImagePicker2";
import { LinearGradient } from "expo-linear-gradient";
import { baseurl } from "../Constant";
import axios from "axios";

export default function QR() {
  const [image, setImage] = useState(null);
  const [qrImage, setQrImage] = useState(null);
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   const getCurrentQR = async () => {
  //     try {
  //       const result = await axios.get(`${baseurl}/media/payment-image`);
  //       setQrImage(result.data);
  //     } catch (error) {
  //       console.error(error,error.response.data);
  //     }
      
  //   };
  //   getCurrentQR();
  // }, []);

  const updateQR = async () => {
    try {
      setLoading(true)
      const formData = new FormData();
      formData.append("image", {
        uri: image.uri,
        name: "paymentimage.jpeg",
        type: "image/jpeg",
      });
      console.log(image)
      const result = axios.post(`${baseurl}/media/payment-image`, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(result)
      // ToastAndroid.show(data?.message ?? "Updated QR", ToastAndroid.SHORT);
    } catch (error) {
      console.error(error);
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <LinearGradient
        colors={["#36A7E6", "#073854"]}
        style={styles.background}
      />
    

      <ImagePicker2 image={image} setImage={setImage} />

      <TouchableOpacity style={styles.submitBtn} onPress={updateQR}>
        <Text style={{ fontSize: 20, textAlign: "center" }}>
          {loading ? "Adding..." : "Add Image"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  submitBtn: {
    backgroundColor: "#00b894",
    height: 50,
    paddingHorizontal: 25,
    borderRadius: 80,
    justifyContent: "center",
    marginTop: 20,
  },
});
