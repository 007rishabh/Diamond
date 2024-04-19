import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { baseurl } from "../Constant";
import { LinearGradient } from "expo-linear-gradient";
import { LoadingIndicator } from "../components/LoadingIndicator.js";

const New = () => {
  const [news, setNews] = React.useState([]);
  const [loading, setLoading] = useState(false);

  const getNews = async () => {
    try {
      console.log('hereee')
      setLoading(true);
      const url = `${baseurl}/news`;
      const res = await fetch(url, {
        method: "GET",
      });
      const result = await res.json();
      if (res.status === 200) {
        setNews(result);
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  };
  useEffect(() => {
    getNews();
  }, []);
  console.log({loading})

  return (
    <>
      <LinearGradient
        // Background Linear Gradient
        colors={["#36A7E6", "#073854"]}
        style={styles.background}
      />
      {loading ? (
        <LoadingIndicator />
      ) : (
        <ScrollView style={{ backgroundColor: "#74b9ff", height: "100%" }}>
          {news.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={{
                height: 150,
                backgroundColor: "#dfe6e9",
                borderRadius: 8,
                gap: 10,
                margin: 5,
                flexDirection: "row",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text>Image</Text>
              </View>
              <View style={{ flex: 2, padding: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: "500" }}>
                  {item.title}
                </Text>
                <Text>{item.content}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </>
  );
};

export default New;

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
});
