import {
  View,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";

import { baseurl } from "../Constant";
const { width } = Dimensions.get("window");
const Carousel = () => {
  const isfocused = useIsFocused();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);
  useEffect(() => {
    const getCarouselImages = async () => {
      const result = await axios.get(`${baseurl}/media/carousel-image`);
      setImages(result.data);
    };
    getCarouselImages();
  }, [isfocused]);
  return (
    <SafeAreaView >
      <View
        style={{
          width: width,
        }}
      >
        <FlatList
          data={images}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={(e) => {
            const x = e.nativeEvent.contentOffset.x;
            setCurrentIndex((x / width).toFixed(0));
          }}
          horizontal
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                key={item}
                disabled={true}
                style={{
                  width: width,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: item }}
                  style={{
                    width: "100%",
                    aspectRatio: 2 / 1,
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius:10
                  }}
                  alt="image here"
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          width: width,
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
          padding: 10,
        }}
      >
        {images?.map((_, index) => {
          return (
            <View
              style={{
                width: currentIndex == index ? 50 : 8,
                height: currentIndex == index ? 10 : 8,
                borderRadius: currentIndex == index ? 5 : 4,
                backgroundColor: currentIndex == index ? "white" : "gray",
                marginLeft: 5,
              }}
            ></View>
          );
        })}
      </View>
    </SafeAreaView>
  );

};

export default Carousel;
