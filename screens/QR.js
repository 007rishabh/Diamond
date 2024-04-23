import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import React, { useEffect } from "react";
import { ImagePicker2 } from "../components/ImagePicker2";
import { LinearGradient } from "expo-linear-gradient";
import { baseurl } from "../Constant";
import axios from "axios";

export default function QR() {
  const [image, setImage] = useState(null);
  const [qrImage, setQrImage] = useState(null);

  useEffect(() => {
    const getCurrentQR = async () => {
      try {
        const result = await axios.get(`${baseurl}/media/payment-image`);
        setQrImage(result.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCurrentQR();
  }, []);

  const updateQR = async () => {
    try {
      const formData = new FormData();
      formData.append("image", {
        uri: image.uri,
        name: image.fileName,
        type: image.mimeType,
      });
      const { data } = axios.post(`${baseurl}/media/payment-image`, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      ToastAndroid.show(data?.message, ToastAndroid.SHORT);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <LinearGradient
        colors={["#36A7E6", "#073854"]}
        style={styles.background}
      />
      <View style={{}}>
        {!image && qrImage ? (
          <Image
            source={{ uri: qrImage }}
            style={{ width: 200, aspectRatio: aspect[0] / aspect[1] }}
            alt="image here"
          />
        ) : (
          <Text>QR Image not found</Text>
        )}
        <Image
          source={{ uri: image.uri }}
          style={{ width: 200, aspectRatio: aspect[0] / aspect[1] }}
          alt="image here"
        />
      </View>

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
