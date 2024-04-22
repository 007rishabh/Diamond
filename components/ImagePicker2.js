import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Button, Image, StyleSheet, View } from "react-native";
import { baseurl } from "../Constant";
import axios from "axios";

export const ImagePicker2 = ({ image, setImage }) => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,

      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const image = result.assets[0];

      if (image.fileSize > 40000) {
        ToastAndroid.show(
          "Image size must be less than 4MB",
          ToastAndroid.SHORT
        );
        return;
      }
      setImage(result.assets[0]);
    }
  };

  const handleUploadPhoto = async () => {
    try {
      const formData = new FormData();

      formData.append("image", {
        uri: image.uri,
        name: image.fileName,
        type: "image/jpg",
      });

      const uploadUrl = `${baseurl}/upload`;
      const res = await axios.post(uploadUrl, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <View>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <>
          <Image
            source={{ uri: image.uri }}
            style={styles.image}
            alt="image here"
          />
          {/* <Button title="Upload Photo" onPress={handleUploadPhoto} /> */}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});
