import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { baseurl } from "../Constant";
import ImagePickerExample from "./Image";
const AddNews = ({ route, navigation }) => {
  const [image, setImage] = useState(null);

  const { id, newstitle, newscontent } = route.params || {
    id: null,
    newstitle: "",
    newscontent: "",
  };
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  useEffect(() => {
    if (id) {
      setContent(newscontent);
      setTitle(newstitle);
    }
  }, []);

  const add = async () => {
    const url = `${baseurl}/news`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ title, content }),
    });
    const result = await res.json();
    console.log(res, result);

    Alert.alert("Alert Title", result.message, [
      {
        text: "OK",
        onPress: () => {
          if (res.status === 201) {
            navigation.navigate("ShowNews");
          }
        },
      },
    ]);
  };
  const edit = async () => {
    const url = `${baseurl}/news/${id}`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({ title, content }),
    });
    const result = await res.json();
    console.log(res, result);

    Alert.alert("Alert Title", result.message, [
      {
        text: "OK",
        onPress: () => {
          if (res.status === 200) {
            navigation.navigate("ShowNews");
          }
        },
      },
    ]);
  };
  const submitHandler = () => {
    if (id) {
      edit();
    } else {
      add();
    }
  };
  return (
    <View style={styles.container}>
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
        <Text style={{ fontSize: 20, fontWeight: 700 }}>Image</Text>
        <View style={{ padding: 10 }}>
          <ImagePickerExample image={image} setImage={setImage} />
        </View>
      </View>
      <TouchableOpacity style={styles.submitBtn} onPress={submitHandler}>
        <Text style={{ marginLeft: 160, fontSize: 20 }}>
          {id ? "Edit" : "Add"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddNews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#74b9ff",
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
});