import { StyleSheet, Text, View, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useEffect } from "react";
import { baseurl } from "../Constant";
import { LinearGradient } from 'expo-linear-gradient';

const Pending = () => {
  const [pendingOrders, setPendingOrders] = React.useState([]);
  const getPendingOrders = async () => {
    const res = await fetch(`${baseurl}/order/pending`);
    const result = await res.json();
    setPendingOrders(result);
    console.log(result);
  };

  const approveOrder = async (orderId) => {
    const res = await fetch(`${baseurl}/order/confirm/${orderId}`, {
      method: 'PUT'
    })
    const result = await res.json()
    console.log(result)
    ToastAndroid.show(result.message, ToastAndroid.SHORT);


    getPendingOrders()
  }

  const rejectOrder = async (orderId) => {
    const res = await fetch(`${baseurl}/order/reject/${orderId}`, {
      method: 'PUT'
    })
    const result = await res.json()
    console.log(result)
    ToastAndroid.show(result.message, ToastAndroid.SHORT);

    getPendingOrders()
  }


  useEffect(() => {
    getPendingOrders();
  }, []);

  return (
    <>
      <LinearGradient
        // Background Linear Gradient
        colors={['#36A7E6', '#073854']}
        style={styles.background}
      />
      <View style={{
        flexDirection: "columns",
        gap: 20,
        backgroundColor: "#74b9ff",
        borderRadius: 10,
      }}>
        {pendingOrders.map((order, index) => {
          return (


            <View
              key={order.id}
              style={{
                flexDirection: "row",
                justifyContent: 'space-between',
                height: 350,
                // backgroundColor: "#74b9ff",
                borderRadius: 10,
                padding: 10,

              }}
            >

              <View style={{
                flex: 1,
                flexDirection: "column",
                gap: 10,
                backgroundColor: "#ddd",
                borderRadius: 10,
              }}>
                <Text style={{ textAlign: "center", fontSize: 20 }}>
                  {"Customer id: " + order.customerId}
                </Text>
                <Text style={{ textAlign: "center", fontSize: 20 }}>
                  {"Diamond id: " + order.productId}
                </Text>
                <Text style={{ textAlign: "center", fontSize: 20 }}>
                  {"Quantity: " + order.quantity}
                </Text>
                <Text style={{ textAlign: "center", fontSize: 20 }}>
                  {"Price: " + order.totalPrice}
                </Text>
                <Text style={{ textAlign: "center", fontSize: 20 }}>
                  {"Order type: " + order.type}
                </Text>

                <Text style={{ textAlign: "center", fontSize: 20 }}>
                  {"Order status: " + order.status}
                </Text>
              </View>
              <View>
                <TouchableOpacity style={[styles.submitBtn, styles.green]} onPress={() => approveOrder(order.id)}>
                  <Text style={{ textAlign: "center", fontSize: 20 }}>
                    Approve
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.submitBtn, styles.red]} onPress={() => rejectOrder(order.id)}>
                  <Text style={{ textAlign: "center", fontSize: 20 }}>
                    Reject
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
      </>

      );
};

      export default Pending;

      const styles = StyleSheet.create({
        submitBtn: {
        backgroundColor: "#6AD4DD",
      height: 50,
      marginHorizontal: 25,
      borderRadius: 80,
      justifyContent: "center",
      marginBottom: 20,
      marginTop: 20,
      width: 150,
  },
      green: {
        backgroundColor: "#55efc4",
  },
      red: {
        backgroundColor: "#ff7675",
  },
      background: {
        position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height:'100%'
  },
});
