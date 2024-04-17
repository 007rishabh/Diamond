import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {
    const images = [
        require('../assets/11.jpg'),
        require('../assets/12.jpg'),
        require('../assets/13.jpg'),
       
      ];
    return (
        <View>
            <SliderBox images={images} autoPlay circleLoop dotColor={'#13274F'} 
            inactiveDotColor='rgba(144, 164, 174, 1)' 
            ImageComponentStyle={{
                borderRadius: 10,
                width: '100%',
                height:300,
                marginRight:10
            }}/>
        </View>
    )
}

export default Carousel

const styles = StyleSheet.create({})