import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import {baseurl} from '../../Front/Constant'

const New = () => {
  const [news, setNews] = React.useState([])
  useEffect(() => {
    const getNews = async () => {
      const url = `${baseurl}/news`;
      const res = await fetch(url, {
        method: "GET",
      });
      const result = await res.json()
      // console.log(result)
      if (res.status === 200) {

        setNews(result)
      }
    }
    getNews()
  }, [])

  return (
    <View>
      {
        news.map((item)=>(

          <TouchableOpacity key={item.id} style ={{height:150,backgroundColor:'#b2bec3',borderRadius:8,gap:10,margin:5,flexDirection:'row'}}>
            <View style={{flex:1}}>
              <Text>Image</Text>
            </View>
            <View  style={{flex:2,padding:20}}>
            
              <Text style={{fontSize:20,fontWeight:'500'}}>{item.title}</Text>
              <Text>{item.content}</Text>
            
            </View>
          </TouchableOpacity>
        )
        )}
    </View>
  )
}

export default New

const styles = StyleSheet.create({})