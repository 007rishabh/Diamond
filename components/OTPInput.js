import React, { useRef } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export const OTPInput = ({ input, setInput }) => {
  const et1 = useRef();
  const et2 = useRef();
  const et3 = useRef();
  const et4 = useRef();
  const handleChange = (index, val) => {
    setInput(
      (data) => data.substring(0, index) + val + data.substring(index + 1)
    );
  };
  return (
    <View style={styles.otpView}>
      <Text style={{ fontSize: 20, fontWeight: "700" }}>Verify OTP</Text>
      <TextInput
        ref={et1}
        style={[
          styles.input,
          { borderColor: input.length >= 1 ? "blue" : "black" },
        ]}
        keyboardType="number-pad"
        maxLength={1}
        value={input[0]}
        onChangeText={(txt) => {
          handleChange(0, txt);
          if (txt.length >= 1) {
            et2.current.focus();
          }
        }}
      />
      <TextInput
        ref={et2}
        style={[
          styles.input,
          { borderColor: input.length >= 2 ? "blue" : "black" },
        ]}
        keyboardType="number-pad"
        maxLength={1}
        value={input[1]}
        onChangeText={(txt) => {
          handleChange(1, txt);
          if (txt.length >= 1) {
            et3.current.focus();
          } else if (txt.length < 1) {
            et1.current.focus();
          }
        }}
      />
      <TextInput
        ref={et3}
        style={[
          styles.input,
          { borderColor: input.length >= 3 ? "blue" : "black" },
        ]}
        keyboardType="number-pad"
        maxLength={1}
        value={input[2]}
        onChangeText={(txt) => {
          handleChange(2, txt);
          if (txt.length >= 1) {
            et4.current.focus();
          } else if (txt.length < 1) {
            et2.current.focus();
          }
        }}
      />
      <TextInput
        ref={et4}
        style={[
          styles.input,
          { borderColor: input.length >= 4 ? "blue" : "black" },
        ]}
        keyboardType="number-pad"
        maxLength={1}
        value={input[3]}
        onChangeText={(txt) => {
          handleChange(3, txt);
          if (txt.length < 1) {
            et3.current.focus();
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  otpView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  input: {
    height: 50,
    width: 50,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    marginLeft: 10,
    marginTop: 10,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    backgroundColor: "#fff",
  },
});
