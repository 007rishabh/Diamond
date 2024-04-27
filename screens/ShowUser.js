import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { baseurl } from "../Constant";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
const ShowUsers = () => {
  const navigation = useNavigation();
  const isfocused = useIsFocused();
  const [users, setUsers] = React.useState([]);
  const getUsers = async () => {
    const url = `${baseurl}/users/all`;
    const res = await fetch(url, {
      method: "GET",
    });
    const result = await res.json();

    if (res.status === 200) {
      setUsers(result);
    }
  };
  useEffect(() => {
    getUsers();
  }, [isfocused]);
  const deleteUser = async (id) => {
    const url = `${baseurl}/users/${id}`;
    console.log(url);
    const res = await fetch(url, {
      method: "DELETE",
    });
    const result = await res.json();
    console.log(result);
    getUsers();
  };
  return (
    <ScrollView>
      <View style={{ height: "100%" }}>
        <LinearGradient
          colors={["#36A7E6", "#073854"]}
          style={styles.background}
        />
        {users.map((item) => (
          <View
            key={item.id}
            style={{
              height: 150,
              backgroundColor: "#00b894",
              borderRadius: 8,
              gap: 10,
              margin: 5,
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 2, padding: 20 }}>
              <Text style={{ fontSize: 20, fontWeight: "500" }}>
                {item.username}
              </Text>
              <Text>{item.email}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{ borderRadius: 8 }}
                onPress={() => deleteUser(item.id)}
              >
                <Text
                  style={{
                    padding: 10,
                    backgroundColor: "#fab1a0",
                    fontWeight: "900",
                    marginTop: 100,
                    marginRight: 10,
                    borderRadius: 8,
                  }}
                >
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ShowUsers;

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
});
