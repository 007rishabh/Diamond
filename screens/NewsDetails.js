import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const NewsDetails = ({ navigation, route }) => {
  const { news } = route.params;

  const deleteNews = async (id) => {
    const url = `${baseurl}/news/${id}`;
    const res = await fetch(url, {
      method: "DELETE",
    });
    getNews();
  };

  return (
    <>
      <LinearGradient
        // Background Linear Gradient
        colors={["#36A7E6", "#073854"]}
        style={styles.background}
      />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>News Details</Text>

        <View>
          {news.image?.url ? (
            <Image
              source={{
                uri: news.image?.url,
              }}
              style={{
                borderRadius: 10,
                width: 300,
                height: 300,
              }}
              alt="image"
            />
          ) : (
            <Text>No Image</Text>
          )}
        </View>
        <View>
          <Text style={{ fontSize: 30, fontWeight: "500" }}>{news.title}</Text>
          <Text>{news.content}</Text>
        </View>
        <View style={{ gap: 10, flexDirection: "row", marginVertical: 10 }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("AddNews", {
                id: news.id,
                newstitle: news.title,
                newscontent: news.content,
              })
            }
          >
            <Text
              style={{
                backgroundColor: "#55efc4",
                fontWeight: "900",
                borderRadius: 8,
                padding: 10,
              }}
            >
              Edit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteNews(item.id)}>
            <Text
              style={{
                backgroundColor: "#fab1a0",
                fontWeight: "900",
                borderRadius: 8,
                padding: 10,
              }}
            >
              Delete
            </Text>
          </TouchableOpacity>
        </View>
        {/* Add your content here */}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
});

export default NewsDetails;
