import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { Fragment, useEffect } from "react";
import Product from "./Product";
import { baseurl } from "../Constant";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { height } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
const Trade = () => {
  const navigation = useNavigation();
  const isfocused = useIsFocused();

  const [products, setProducts] = React.useState([]);
  useEffect(() => {
    const getDiamonds = async () => {
      console.log("start");
      // const url = "http://192.168.1.46:8080/api/diamonds";
      const url = `${baseurl}/diamonds`;
      const res = await fetch(url, {
        method: "GET",
      });
      const result = await res.json();
      console.log({ result });
      if (res.status === 200) {
        const data = result.reduce((acc, item) => {
          if (!acc[item.category]) {
            acc[item.category] = [];
          }
          acc[item.category] = [...acc[item.category], item];
          return acc;
        }, {});
        console.log(data);
        setProducts(data);
      }
    };
    getDiamonds();
  }, [isfocused]);

  // <ImageBackground source={require('../assets/trade.png')} style={{}}></ImageBackground>
  return (
    <>
      <ScrollView style={{ backgroundColor: "#74b9ff", height: "100%" }}>
        {Object.entries(products).map(([key, value]) => (
          <Fragment key={key}>
            <Text style={styles.headingText}>{`${key} carat`}</Text>
            <ScrollView horizontal={true} style={styles.container}>
              {value.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  style={[styles.card, styles.cardElevated]}
                  onPress={() => navigation.navigate("Product", { product })}
                >
                    <Image
                      source={require("../assets/ddd.png")}
                      style={{ height: 180, width: 160, }}
                    />
                    <Text >{product.name}</Text>
                    <Text >{product.price}</Text>
                         
                    </TouchableOpacity>
              ))}
            </ScrollView>
          </Fragment>
        ))}
      </ScrollView>
    </>
  );
};

export default Trade;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    
    height:300
  },
  headingText: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 8,
    marginTop: 20,
  },
  card: {
    flex: 1,
    // justifyContent:'center',
    alignItems: "center",
    height: 250,
    width: 180,
    borderRadius: 4,
    margin: 8,
  },
  cardElevated: {
    backgroundColor: "#fff",
    elevation: 4,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
});
// <TouchableOpacity key={product.id} style={[styles.card , styles.cardElevated]} onPress={()=> navigation.navigate('Product',{product})}>
//                     <Text>{product.name}
// </Text>
//                     </TouchableOpacity>
