import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { baseurl } from "../Constant";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { LoadingIndicator } from "../components/LoadingIndicator.js";
import axios from "axios";
const ShowNews = () => {
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const isfocused = useIsFocused();
  const [news, setNews] = React.useState([]);
  const getNews = async () => {
    try {
      setLoading(true);
      const url = `${baseurl}/news`;
      const result = await axios.get(url);
      setNews(result.data);
      console.log(result.data[0])
    } catch {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getNews();
  }, [isfocused]);
  
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
        <ScrollView style={{ flex: 1 }}>
          {news?.map((item) => {
            return (
              <TouchableOpacity
                key={item.id}
                style={{
                  backgroundColor: "#b2bec3",
                  borderRadius: 8,
                  margin: 5,
                  gap: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 10,
                }}
                onPress={() =>
                  navigation.navigate("NewsDetails", { news: item })
                }
              >
                <View>
                

                  {item.image?.url ? (
                    <Image
                      source={{
                        uri: item.image.url,
                      }}
                      style={{
                        borderRadius: 10,
                        width: 100,
                        height: 100,
                      }}
                      alt="image"
                    />
                  ) : (
                    <Text>No Image</Text>
                  )}
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 20, fontWeight: "500" }}>
                    {item.title}
                  </Text>
                  <Text>{item.content}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </>
  );
};

export default ShowNews;

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
});
