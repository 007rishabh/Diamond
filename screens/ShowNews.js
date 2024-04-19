import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { baseurl } from "../Constant";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {LoadingIndicator} from '../components/LoadingIndicator.js'
const ShowNews = () => {
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const isfocused = useIsFocused();
  const [news, setNews] = React.useState([]);
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
    } catch {
    } finally {
      setLoading(false)
    }
  };
  useEffect(() => {
    getNews();
  }, [isfocused]);
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
      {loading ? (
       <LoadingIndicator/>
      ) : (
        <ScrollView style={{ flex: 1 }}>
          {news.map((item) => (
            <ScrollView>
              <View
                key={item.id}
                style={{
                  height: 200,
                  backgroundColor: "#b2bec3",
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
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={{ borderRadius: 8 }}
                    onPress={() =>
                      navigation.navigate("AddNews", {
                        id: item.id,
                        newstitle: item.title,
                        newscontent: item.content,
                      })
                    }
                  >
                    <Text
                      style={{
                        padding: 10,
                        backgroundColor: "#55efc4",
                        fontWeight: "900",
                        marginTop: 100,
                        marginRight: 10,
                        borderRadius: 8,
                      }}
                    >
                      Edit
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ borderRadius: 8 }}
                    onPress={() => deleteNews(item.id)}
                  >
                    <Text
                      style={{
                        padding: 10,
                        backgroundColor: "#fab1a0",
                        fontWeight: "900",
                        marginTop: 100,
                        marginRight: 10,
                        borderRadius: 8,
                      }}
                    >
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          ))}
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
