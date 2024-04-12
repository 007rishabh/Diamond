import { StyleSheet, Text, View ,ScrollView, TouchableOpacity} from 'react-native'
import React ,{Fragment, useEffect} from 'react'
import Product from './Product'
import { useNavigation } from '@react-navigation/native';
import {baseurl} from '../../Front/Constant'
const Trade = () => {
    const navigation=useNavigation()
    const  [products, setProducts] = React.useState([])
    useEffect(() => {
        const getDiamonds = async () => {
            // const url = "http://192.168.1.46:8080/api/diamonds";
            const url = `${baseurl}/diamonds`;
            const res = await fetch(url, {
                method: "GET",
            });
            const result = await res.json()
            if (res.status===200){
                const data =result.reduce((acc,item)=>{
                    if (!acc[item.category]){
                        acc[item.category]=[]
                    }
                    acc[item.category]=[...acc[item.category],item];
                    return acc
                },{})
                console.log(data)
                setProducts(data)
            }
        }
        getDiamonds()
    }, [])
    
   
  return (
    <>
    <View>
    {
        Object.entries(products).map(([key,value])=>(
            <Fragment key={key}>
            <Text style={styles.headingText}>{`${key} carat`}</Text>
            <ScrollView horizontal={true} style={styles.container}>
            {
                value.map((product)=>(
                    <TouchableOpacity key={product.id} style={[styles.card , styles.cardElevated]} onPress={()=> navigation.navigate('Product',{product})}>
                    <Text>{product.name}</Text>
                    </TouchableOpacity>
                ))
            }
            </ScrollView>
            </Fragment>
        ))
    }
  </View>
  
  </>
  )
}

export default Trade

const styles = StyleSheet.create({
    container:{
        padding:8
    },
    headingText:{
        fontSize:24,
        fontWeight:'bold',
        paddingHorizontal:8,
        marginTop:20
    },
    card:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        height:100,
        width:100,
        borderRadius:4,
        margin:8
    },
    cardElevated:{
        backgroundColor:"#42f5ef",
        elevation:4,
        shadowOffset:{
            height:1,
            width:1
        },
        shadowColor:"black",
        shadowOpacity:0.4,
        shadowRadius:2
    }
})