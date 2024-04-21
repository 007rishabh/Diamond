import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import StackNavigation from "./Navigation/StackNavigation";
export default function App() {
  return <StackNavigation />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
