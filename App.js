import 'react-native-gesture-handler'
import { StyleSheet, Text, View } from 'react-native';
import StackNavigation from './Navigation/StackNavigation';
import AddDiamond from './screens/AddDiamond';
import Admin from './screens/Admin';
export default function App() {
  return (
    <StackNavigation/>
    // <AddDiamond/>
    // <Admin/>
    
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
