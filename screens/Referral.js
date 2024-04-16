import { StyleSheet, Text, TouchableOpacity, View,TextInput } from 'react-native'
import React,{useState} from 'react'
const Referral = () => {
  const [showTextInput1, setShowTextInput1] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const createReferral = async () => {
    const url = `${baseurl}/referral/create`;
    const res = await fetch(url, {
        method: "POST",
    });
    const result = await res.json()
    
    if (res.status === 201) {
      Alert.alert("Alert Title", result, [
        {
            text: "OK", onPress: () => {
                
                
            }
        }
    ]);

    }
}
  return (
    <View style={{flex:1,justifyContent:'center',backgroundColor:'#6c5ce7'}}>
    <TouchableOpacity
    style={styles.submitBtn } 
    onPress={() => setShowTextInput1(true)}
     >
    
    <Text style={{  fontSize: 20 ,marginLeft:100}} >Generate Referral</Text>
  </TouchableOpacity>
  

    </View>
  )
}

export default Referral

const styles = StyleSheet.create({
  submitBtn: {
    backgroundColor:'#00b894',
   height: 50,
   marginHorizontal: 25,
   borderRadius: 80,
   justifyContent: 'center',
   marginBottom: 20,
   marginTop: 50,
   },
   textInput: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    marginLeft:50,
    backgroundColor:'#fff'
  },
})