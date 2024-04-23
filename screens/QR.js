import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ImagePicker2 } from "../components/ImagePicker2";
import { LinearGradient } from "expo-linear-gradient";

export default function QR() {
  return (
    <View style={{ flex: 1,alignItems:'center',justifyContent:'center' }}>
      <LinearGradient
        colors={["#36A7E6", "#073854"]}
        style={styles.background}
      />
      <ImagePicker2 />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
});
