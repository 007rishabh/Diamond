import { StyleSheet, Text, TextInput, View ,TouchableOpacity,ScrollView,ToastAndroid} from 'react-native'
import React ,{useEffect,useState} from 'react'
import { baseurl } from '../Constant'
import { LinearGradient } from 'expo-linear-gradient';

const PendingPayments = () => {

const [pendingPayments,setPendingPayments] = useState([])
  const getPendingPayments = async()=>{
    const res = await fetch(`${baseurl}/payment/pending`);
    const result = await res.json();
    console.log(result)
    setPendingPayments(result)
  }
  const approvePayment = async (paymentId)=>{
    const res = await fetch(`${baseurl}/payment/${paymentId}`,{
      method:'PUT'
    })
    const result = await res.json()
    console.log(result)
    ToastAndroid.show(result.message, ToastAndroid.SHORT);


    getPendingPayments()
  }
  useEffect(()=>{
    getPendingPayments()
  },[])

  return (
    <><LinearGradient
    // Background Linear Gradient
    colors={['#36A7E6', '#073854']}
    style={styles.background}
  />
    <ScrollView style={{flex:1}}>
      {pendingPayments.map((payment, index) => {
        return (
          <View
            key={payment.id}
            style={{
              flexDirection: "row",
              justifyContent:'space-between',
              height: 'auto',
              backgroundColor: "#74b9ff",
              borderRadius: 10,
              padding:10,
            
            }}
          >
            <View  style={{
              flex:1,
              flexDirection: "column",
              gap:10,
              backgroundColor: "#ddd",
              borderRadius: 10,
            }}>
               <Text style={{ textAlign: "center", fontSize: 20 }}>
                {"user id: "+payment.userId}
              </Text>
              <Text style={{ textAlign: "center", fontSize: 20 }}>
                {"user name: "+payment.userName}
              </Text>
              <Text style={{ textAlign: "center", fontSize: 20 }}>
                {"Amount: "+payment.amount}
              </Text>
              <Text style={{ textAlign: "center", fontSize: 20 }}>
                {"UTF: "+payment.utf}
              </Text>
            
            
              <TouchableOpacity style={[styles.submitBtn, styles.green]} onPress={()=>approvePayment(payment.id)}>
                <Text style={{ textAlign: "center", fontSize: 20 , height:40,backgroundColor:'#55efc4',borderRadius:10,}} >
                  Approve
                </Text>
              </TouchableOpacity>
              </View>
          </View>
        );
      })}
    </ScrollView>
    </>
  )
}

export default PendingPayments

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height:'100%'
  },
})