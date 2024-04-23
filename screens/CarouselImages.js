import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import Carousel from "./Carousel";
import { ImagePicker2 } from "../components/ImagePicker2";
import { baseurl } from "../Constant";
import axios from "axios";

const CarouselImages = () => {
  const [image, setImage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const submitHandler = async () => {
    try {
      setLoading(true);
      if (!image) {
        ToastAndroid.show("Please select an image", ToastAndroid.SHORT);
        return;
      }
      const formData = new FormData();

      console.log(image.uri, image.fileName, image.mimeType);
      formData.append("image", {
        uri: image.uri,
        name: image.fileName ?? `image-${Date.now()}.jpeg`,
        type: image.mimeType,
      });
      console.log(formData);
      const result = await axios.post(
        `${baseurl}/media/carousel-image`,
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.info(result);
      ToastAndroid.show(
        result.data?.message ?? "Image Added",
        ToastAndroid.SHORT
      );
    } catch (error) {
      console.error(error, error?.response?.data);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <LinearGradient
        colors={["#36A7E6", "#073854"]}
        style={styles.background}
      />
      <Carousel />
      <View>
        <ImagePicker2 image={image} setImage={setImage} aspect={[4, 2]} />
        <TouchableOpacity style={styles.submitBtn} onPress={submitHandler}>
          <Text style={{ fontSize: 20, textAlign: "center" }}>
            {loading ? "Adding..." : "Add Image"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CarouselImages;

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
