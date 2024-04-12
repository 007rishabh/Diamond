import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { baseurl } from '../../Front/Constant'
import {useNavigation,useIsFocused} from '@react-navigation/native'
const ShowUsers = () => {
    const navigation =useNavigation()
    const isfocused =useIsFocused()
    const [users, setUsers] = React.useState([])
    const getUsers = async () => {
        const url = `${baseurl}/users/all`;
        const res = await fetch(url, {
            method: "GET",
            
        });
        const result = await res.json()
        console.log(result)
        
        if (res.status === 200) {
            
            setUsers(result)
        }
    }
    useEffect(() => {
        getUsers()
    }, [isfocused])
const deleteUser = async (id)=>{
    const url = `${baseurl}/users/${id}`;
    const res = await fetch(url, {
        method: "DELETE",
        
    });
    getUsers()

}
    return (
        <View>
            {
                users.map((item) => (

                    <View key={item.id} style={{ height: 150, backgroundColor: '#b2bec3', borderRadius: 8, gap: 10, margin: 5, flexDirection: 'row' }}>
                        
                        <View style={{ flex: 2, padding: 20 }}>

                            <Text style={{ fontSize: 20, fontWeight: '500' }}>{item.username}</Text>
                            <Text>{item.email}</Text>

                        </View>
                        <View style={{flexDirection:'row'}}>
                            
                            <TouchableOpacity style={{ borderRadius: 8 }} onPress={()=>deleteUser(item.id)}>
                                <Text style={{ padding: 10, backgroundColor: "blue", fontWeight: "900", marginTop: 100, marginRight: 10 }}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
                )}
        </View>
    )
}

export default ShowUsers

const styles = StyleSheet.create({})