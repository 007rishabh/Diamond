import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const TC = () => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#36A7E6", "#073854"]}
        style={styles.background}
      />
      <View style={{backgroundColor:'#fff',padding:10,borderRadius:10,gap:5}}>
      <Text style={{fontSize:20}}>1) Terms and Conditions for Real-Time Diamond Trading App.</Text>
      <Text style={{fontSize:20}}>2) Acceptance: By using the app, you agree to these terms.</Text>
      <Text style={{fontSize:20}}>3) Eligibility: Users must be 18 or older.</Text>
      <Text style={{fontSize:20}}>4) Registration: Provide accurate information when registering.</Text>
      <Text style={{fontSize:20}}>5) Conduct: Use the app lawfully and respectfully.</Text>
      <Text style={{fontSize:20}}>6) Transactions: Buying and selling diamonds is binding.</Text>
      <Text style={{fontSize:20}}>
        7) Information Accuracy: We try to be accurate, but no guarantees.
      </Text>
      <Text style={{fontSize:20}}> 8) Payment: Pay agreed prices through accepted methods.</Text>
    
      <Text style={{fontSize:20}}> 9) Privacy: Your privacy matters; see our
  
        Privacy Policy. Termination: We can suspend or terminate access.
        </Text>
      <Text style={{fontSize:20}}> 10) Modifications: We may update these terms; check periodically.</Text>
      <Text style={{fontSize:20}}> 11) Governing Law: Governed by [insert jurisdiction].</Text>
      </View>
      </View>
  );
};

export default TC;

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  submitBtn: {
    backgroundColor: "#10A450",
    height: 50,
    marginHorizontal: 25,
    borderRadius: 80,
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
    width: "80%",
  },
});
