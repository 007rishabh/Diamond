import React from 'react'
import {ActivityIndicator} from "react-native";
export const LoadingIndicator = () => {
  return (
    <ActivityIndicator size="large" color="#00ff00" style={{
        justifyContent:'center',
        height:'100%'
    }}/>
  )
}
