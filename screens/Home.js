import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, ScrollView } from "react-native";
import React, { useEffect } from "react";
import Carousel from "./Carousel";
import { SafeAreaView } from "react-native-safe-area-context";
import { baseurl } from "../Constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
const Home = () => {
  const isfocused = useIsFocused();

  const [currentamount, setCurrentAmount] = React.useState(0);
  const getPortfolio = async () => {
    const userId = await AsyncStorage.getItem("userId");
    const res = await fetch(`${baseurl}/portfolio/${userId}`);
    const result = await res.json();
    console.log(result)
    setCurrentAmount(result.walletAmount);
  };
 useEffect(() => {
    getPortfolio();
  }, [isfocused]);
  const Press =()=>{
    Alert.alert('Your Wallet Amount', `Rs ${currentamount}`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  }
  return (
    <>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            backgroundColor: "black",
            justifyContent:'space-evenly'
          }}
        >
          <View style={{ width: "20%" }}>
            <Image
              source={require("../assets/new.png")}
              style={{ height: 50, width: 50, borderRadius: 50}}
            />
          </View>
          <View style={{ width: "65%" }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                textAlign: "center",
                color: "#fff",
              }}
            >
              Diamond Mall
            </Text>
          </View>
          <TouchableOpacity style={{marginTop:10}} onPress={Press}>
          <AntDesign name="wallet" size={24} color="white" />
          </TouchableOpacity>
          
        </View>

        <Carousel />
        <SafeAreaView
        style={{
          padding: 2,
          backgroundColor: "#fff",
          flex: 1,
          backgroundColor: "#74b9ff",
          borderRadius:20
        }}
      >
        <View style={{ flexDirection: "row", flex: 2, padding: 10 ,borderRadius:10}}>
          <View style={{ padding: 10, flex: 1 }}>
            <Text style={{ fontSize: 24, fontWeight: 500 }}>Top Gainer</Text>

            <View style={{backgroundColor:'#fff', padding:8,borderRadius:15,margin:5}}>
            <Text style={{fontSize:20}}>Rishabh</Text>
            <Text>RUBY</Text>
            <Text style={{color:'green',fontSize:20}}>+1000</Text>
            
            </View>

            <View style={{backgroundColor:'#fff', padding:8,borderRadius:15,margin:5}}>
            <Text style={{fontSize:20}}>Lucky</Text>
            <Text>RUBY</Text>
            <Text style={{color:'green',fontSize:20}}>+789</Text>
            
            </View>

            <View style={{backgroundColor:'#fff', padding:8,borderRadius:15,margin:5}}>
            <Text style={{fontSize:20}}>Harsh</Text>
            <Text>RUBY</Text>
            <Text style={{color:'green',fontSize:20}}>+180</Text>
            
            </View>

            <View style={{backgroundColor:'#fff', padding:8,borderRadius:15,margin:5}}>
            <Text style={{fontSize:20}}>Deepanshu</Text>
            <Text>RUBY</Text>
            <Text style={{color:'green',fontSize:20}}>+10</Text>
            
            </View>
            
          </View>
          <View style={{ padding: 10, flex: 1 }}>
            <Text style={{ fontSize: 24, fontWeight: 500 }}>Top Losser</Text>
            <View style={{backgroundColor:'#fff', padding:8,borderRadius:15,margin:5}}>
            <Text style={{fontSize:20}}>Sparsh</Text>
            <Text>Koniroor</Text>
            <Text style={{color:'red',fontSize:20}}>-1000</Text>
            
            </View>

            <View style={{backgroundColor:'#fff', padding:8,borderRadius:15,margin:5}}>
            <Text style={{fontSize:20}}>Amit</Text>
            <Text>Koniroor</Text>
            <Text style={{color:'red',fontSize:20}}>-800</Text>
            
            </View>

            <View style={{backgroundColor:'#fff', padding:8,borderRadius:15,margin:5}}>
            <Text style={{fontSize:20}}>Neraj</Text>
            <Text>Koniroor</Text>
            <Text style={{color:'red',fontSize:20}}>-450</Text>
            </View>

            <View style={{backgroundColor:'#fff', padding:8,borderRadius:15,margin:5}}>
            <Text style={{fontSize:20}}>Sajal</Text>
            <Text>Koniroor</Text>
            <Text style={{color:'red',fontSize:20}}>-100</Text>
            
            </View>
          </View>
        </View>
       
      </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({});
