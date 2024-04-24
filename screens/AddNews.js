import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { baseurl } from "../Constant";

import axios from "axios";
const AddNews = ({ route, navigation }) => {
  const [image, setImage] = useState(null);
  const [newsImage, setNewsImage] = useState(null);

  const { id, newstitle, newscontent, news_image } = route.params || {
    id: null,
    newstitle: "",
    newscontent: "",
    news_image: null,
  };
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (id) {
      setContent(newscontent);
      setTitle(newstitle);
      setNewsImage({ uri: news_image.url });
    }
  }, []);

  const add = async () => {
    const url = `${baseurl}/news`;
    try {
      setIsUpdating(true);
      const userId = await AsyncStorage.getItem("userId");
      const formData = new FormData();

      if (image) {
        formData.append("image", {
          uri: image.uri,
          name: image.fileName,
          type: image.mimeType,
        });
      }
      formData.append("title", title);
      formData.append("content", content);
      formData.append("userId", userId);
      const result = await axios.post(url, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      Alert.alert("Alert Title", result?.data?.message, [
        {
          text: "OK",
          onPress: () => {
            if (result.status === 201) {
              navigation.navigate("ShowNews");
            }
          },
        },
      ]);
    } catch (error) {
      console.error({ error });
    } finally {
      setIsUpdating(false);
    }
  };
  const edit = async () => {
    const url = `${baseurl}/news/${id}`;
    try {
      setIsUpdating(true);
      const userId = await AsyncStorage.getItem("userId");
      const formData = new FormData();
      if (image) {
        formData.append("image", {
          uri: image.uri,
          name: image.fileName,
          type: image.mimeType,
        });
      }
      formData.append("title", title);
      formData.append("content", content);
      formData.append("userId", userId);
      const result = await axios.put(url, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      Alert.alert("Alert Title", result?.data?.message, [
        {
          text: "OK",
          onPress: () => {
            if (result.status === 200) {
              navigation.navigate("ShowNews");
            }
          },
        },
      ]);
    } catch (error) {
      console.error({ error });
    } finally {
      setIsUpdating(false);
    }
  };
  const submitHandler = () => {
    if (id) {
      edit();
    } else {
      add();
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [1, 1],
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
      setImage(image);
      setNewsImage({ uri: image.uri });
    }
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#36A7E6", "#073854"]}
        style={styles.background}
      />
      <Text style={styles.pageText}>{id ? "Edit News" : "Add News"}</Text>
      <View style={{ marginHorizontal: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 700 }}>Title</Text>
        <TextInput
          value={title}
          style={styles.textInput}
          onChangeText={(value) => setTitle(value)}
        />
        <Text style={{ fontSize: 20, fontWeight: 700 }}>Content Of News</Text>
        <TextInput
          multiline={true}
          numberOfLines={5}
          value={content}
          style={styles.textInput}
          onChangeText={(value) => setContent(value)}
        />
        <TouchableOpacity onPress={pickImage}>
          {newsImage?.uri ? (
            <Image
              source={{ uri: newsImage.uri }}
              style={{ width: 200, aspectRatio: 1 / 1 }}
              alt="image here"
            />
          ) : (
            <Button
              title="Pick an image from camera roll"
              onPress={pickImage}
            />
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.submitBtn} onPress={submitHandler}>
        {isUpdating ? (
          <Text style={{ textAlign: "center", fontSize: 20 }}>Loading...</Text>
        ) : (
          <Text style={{ textAlign: "center", fontSize: 20 }}>
            {id ? "Edit" : "Add"}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AddNews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // backgroundColor: "#74b9ff",
  },
  pageText: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "#31363F",
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
