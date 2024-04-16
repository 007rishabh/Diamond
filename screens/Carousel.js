import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {
    const images = [
        require('../assets/2.png'),
        require('../assets/3.png'),
        require('../assets/4.png'),
        require('../assets/1.png'),
        require('../assets/5.png'),
        require('../assets/6.png'),
        require('../assets/7.png'),
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