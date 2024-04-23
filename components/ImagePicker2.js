import * as ImagePicker from "expo-image-picker";
import { Button, Image, StyleSheet, View } from "react-native";

export const ImagePicker2 = ({ image, setImage, aspect = [1, 1] }) => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect,
      quality: 1,
    });

    if (!result.canceled) {
      const image = result.assets[0];

      if (image.fileSize > 40000) {
        ToastAndroid.show(
          "Image size must be less than 4MB",
          ToastAndroid.SHORT
        );
        return;
      }
      setImage(result.assets[0]);
    }
  };

  return (
    <View style={{ alignItems: "center" }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: 200, aspectRatio: aspect[0] / aspect[1] }}
          alt="image here"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
