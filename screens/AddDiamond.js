import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import {baseurl} from '../Constant'
import ImagePickerExample from "./Image";
const AddDiamond = () => {
    const [name, setName] = useState();
    const [category, setCategory] = useState();
    const [subcategory, setSubCategory] = useState();
    const [price, setPrice] = useState();
    const add = async () => {
        // const url = "http://192.168.1.46:8080/api/diamond";
        const url = `${baseurl}/diamond`;
        const res = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ name, category, subcategory, price }),
        });
        const result = await res.json()
        console.log(res, result)

        Alert.alert("Alert Title", result.message, [
            {
                text: "OK", onPress: () => {
                    if (res.status === 201) {
                        // navigation.navigate('Home')
                    }
                    else {
                        setName(''); setCategory(''); setPrice(''); setSubCategory('')
                    }
                }
            }
        ]);


    };
    return (
        <View style={styles.container}>
        <LinearGradient
          // Background Linear Gradient
          colors={['#36A7E6', '#073854']}
          style={styles.background}
        />
            <Text style={styles.pageText}>Add Diamond</Text>
            <View style={{ marginHorizontal: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 700 }}>Name</Text>
                <TextInput
                    value={name}
                    style={styles.textInput}
                    onChangeText={(value) => setName(value)}
                />
                <Text style={{ fontSize: 20, fontWeight: 700 }}>Category</Text>
                <TextInput
                    value={category}
                    style={styles.textInput}
                    onChangeText={(value) => setCategory(value)}
                />
                <Text style={{ fontSize: 20, fontWeight: 700 }}>Sub-Category</Text>
                <TextInput
                    value={subcategory}
                    style={styles.textInput}
                    onChangeText={(value) => setSubCategory(value)}
                />
                <Text style={{ fontSize: 20, fontWeight: 700 }}>Price</Text>
                <TextInput
                    value={price}
                    style={styles.textInput}
                    onChangeText={(value) => setPrice(value)}
                />
                <Text style={{ fontSize: 20, fontWeight: 700 }}>Image</Text>
                <View style={{padding:10}}>
                <ImagePickerExample />
                </View>
            </View>
            <TouchableOpacity style={styles.submitBtn} onPress={add}>
                <Text style={{ marginLeft: 160, fontSize: 20 }}>Add</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddDiamond;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        // backgroundColor:'#74b9ff'
    },
    pageText: {
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
        
        marginBottom: 20,
    },
    textInput: {
        height: 40,
        marginBottom: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginTop: 10,
        paddingLeft: 10,
        color: "grey",
    },
    submitBtn: {
        backgroundColor: "#00b894",
        height: 50,
        marginHorizontal: 25,
        borderRadius: 80,
        justifyContent: "center",
        marginBottom: 20,
        marginTop: 20,
    },
    linkText: {
        textAlign: "center",
    },
    link: {
        color: "red",
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height:'100%'
      },
});
