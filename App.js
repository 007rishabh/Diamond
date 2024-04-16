import 'react-native-gesture-handler'
import { StyleSheet, Text, View } from 'react-native';
import StackNavigation from './Navigation/StackNavigation';
import { Provider } from 'react-redux';
import store from './Store'
import Image from './screens/Image';
export default function App() {
  return (
    <StackNavigation/>
    // <Image/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
