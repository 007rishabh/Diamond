import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
const ForgetPassword = () => {
  const navigation = useNavigation();
  const et1 = useRef();
  const et2 = useRef();
  const et3 = useRef();
  const et4 = useRef();
  const et5 = useRef();
  const et6 = useRef();
  const [f1, setF1] = useState('');
  const [f2, setF2] = useState('');
  const [f3, setF3] = useState('');
  const [f4, setF4] = useState('');
  const [f5, setF5] = useState('');
  const [f6, setF6] = useState('');
  const [count, setCount] = useState(60)
  useEffect(() => {
    const Interval = setInterval(() => {
      if (count == 0) {
        clearInterval(Interval)
      }
      else {
        setCount(count - 1)
      }
    }, 1000)
    return () => {
      clearInterval(Interval)
    }
  }, [count])
  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#36A7E6' }}>
    
      <Text style={styles.pageText}>Forget Password</Text>
      <View style={styles.otpView}>
      <Text style={{ fontSize: 20, fontWeight: '500' }}>Enter OTP</Text>
        <TextInput ref={et1} style={[styles.input, { borderColor: f1.length >= 1 ? 'blue' : 'black' }]} keyboardType='number-pad' maxLength={1} value={f1} onChangeText={txt => {
          setF1(txt)
          if (txt.length >= 1) {
            et2.current.focus()
          }
        }} />
        <TextInput ref={et2} style={[styles.input, { borderColor: f2.length >= 1 ? 'blue' : 'black' }]} keyboardType='number-pad' maxLength={1} value={f2} onChangeText={txt => {
          setF2(txt)
          if (txt.length >= 1) {
            et3.current.focus()
          } else if (txt.length < 1) {
            et1.current.focus()
          }
        }} />
        <TextInput ref={et3} style={[styles.input, { borderColor: f3.length >= 1 ? 'blue' : 'black' }]} keyboardType='number-pad' maxLength={1} value={f3} onChangeText={txt => {
          setF3(txt)
          if (txt.length >= 1) {
            et4.current.focus()
          } else if (txt.length < 1) {
            et2.current.focus()
          }
        }} />
        <TextInput ref={et4} style={[styles.input, { borderColor: f4.length >= 1 ? 'blue' : 'black' }]} keyboardType='number-pad' maxLength={1} value={f4} onChangeText={txt => {
          setF4(txt)
          if (txt.length >= 1) {
            et5.current.focus()
          } else if (txt.length < 1) {
            et3.current.focus()
          }
        }} />
       
      
      </View>
    
      <View>
        <Text style={{ fontSize: 20, fontWeight: '500', marginLeft: 8 }}>Password</Text>
        <TextInput style={styles.textInput} />
      </View>
      <View>
        <Text style={{ fontSize: 20, fontWeight: '500', marginLeft: 8 }}>Confirm Password</Text>
        <TextInput style={styles.textInput} />
      </View>
      <View style={styles.resend}>
      <Text style={{fontSize:20,fontWeight:'700',color:count==0 ? 'blue': 'grey'}} onPress={()=>{
        setCount(60)
      }}>Resend Otp?</Text>
      {count !==0 && (<Text style={{marginLeft:20,fontSize:20}}>{count+ ' Seconds'}</Text>)}
    </View>
      <TouchableOpacity
        disabled={f1 != '' && f2 != '' && f3 != '' && f4 != '' && f5 != '' && f6 != '' ? false : true}
        style={[styles.submitBtn, { backgroundColor: f1 != '' && f2 != '' && f3 != '' && f4 != '' && f5 != '' && f6 != '' ? 'blue' : 'grey' }]} >
        <Text style={{ marginLeft: 130, fontSize: 20 }} onPress={()=>navigation.navigate('Home')}>Verify Otp</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ForgetPassword

const styles = StyleSheet.create({
  pageText: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: "center",
    color: '#fff',
    marginBottom: 20,
  },
  textInput: {
    height: 40,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
    width: '95%',
    marginLeft: 8,
    borderColor: 'red',
    fontSize: 18,
    fontWeight: '700'
  },
  otpView: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft:10,
    gap:10
  },
  input: {
    height: 50,
    width: 50,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    marginLeft: 10,
    marginTop: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    backgroundColor:'#fff'
  },
  submitBtn: {
    // backgroundColor:'#6AD4DD',
    height: 50,
    marginHorizontal: 25,
    borderRadius: 80,
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '500'
  },
  resend:{
    flexDirection:'row',
    alignSelf:'center',
    marginTop:30,
    marginBottom:30
  }
})