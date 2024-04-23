import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SliderBox } from "react-native-image-slider-box";
import axios from "axios";
import { baseurl } from "../Constant";

const Carousel = () => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    const getCarouselImages = async () => {
      const result = await axios.get(`${baseurl}/media/carousel-image`);
      console.log(result.data);
      setImages("carousel images", result.data);
    };
    getCarouselImages();
  }, []);
  const dummyImages = [
    require("../assets/11.jpg"),
    require("../assets/12.jpg"),
    require("../assets/13.jpg"),
  ];
  return (
    <View>
      <SliderBox
        images={dummyImages}
        autoPlay
        circleLoop
        dotColor={"#13274F"}
        inactiveDotColor="rgba(144, 164, 174, 1)"
        ImageComponentStyle={{
          borderRadius: 10,
          width: "100%",
          height: 300,
        }}
      />
    </View>
  );
};

export default Carousel;
