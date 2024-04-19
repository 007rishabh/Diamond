import 'react-native-gesture-handler'
import { StyleSheet, Text, View } from 'react-native';
import StackNavigation from './Navigation/StackNavigation';
import Profile from './screens/Profile';
export default function App() {
  return (
    <StackNavigation/>
    // <Profile/>
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
