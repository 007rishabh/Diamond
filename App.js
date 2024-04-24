import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import StackNavigation from "./Navigation/StackNavigation";
import Screen1 from "./screens/Screen1";

export default function App() {
  return (
    <StackNavigation />
    // <Screen1/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
