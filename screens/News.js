import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { LoadingIndicator } from "../components/LoadingIndicator.js";
import { baseurl } from "../Constant";

const New = () => {
  const [news, setNews] = React.useState([]);
  const [loading, setLoading] = useState(false);

  const getNews = async () => {
    try {
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
      setLoading(false);
    }
  };
  useEffect(() => {
    getNews();
  }, []);

  return (
    <>
      <LinearGradient
        colors={["#36A7E6", "#073854"]}
        style={styles.background}
      />
      {loading ? (
        <LoadingIndicator />
      ) : (
        <ScrollView
          style={{
            height: "100%",
            padding: 10,
          }}
          contentContainerStyle={{
            rowGap: 16,
          }}
        >
          {news.map((item) => (
            <View
              key={item.id}
              style={{
                minHeight: 100,
                backgroundColor: "#dfe6e9",
                borderRadius: 8,
                gap: 10,
                flexDirection: "row",
              }}
            >
            <View style={{ padding:20}}>
            {item.image?.url ? (
              <Image
                source={{
                  uri: item.image?.url,
                }}
                style={{
                  borderRadius: 10,
                  width: 80,
                  height: 80,
                }}
                alt="image"
              />
            ) : (
              <Text>No Image</Text>
            )}
          </View>
              <View style={{ flex: 2, padding: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: "500" }}>
                  {item.title}
                </Text>
                <Text>{item.content}</Text>
              </View>
            </View>
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
