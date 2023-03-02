import React, { useState,useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { CardField, StripeProvider, useConfirmPayment, usePaymentSheet } from "@stripe/stripe-react-native";
import {PUBLISHABLE_KEY,MERCHANT_ID,API_URL} from './Constants'


// //ADD localhost address of your server
// const API_URL = "http://192.168.1.11:3000";

const StripeApp=()=>{
  const [ready,setReady]=useState(false)
  const {initPaymentSheet,presentPaymentSheet,loading}=usePaymentSheet()

  useEffect(()=>{
    initializePaymentSheet();

  }, [])
  
  const initializePaymentSheet=async()=>{
    const {paymentIntent,ephemeralKey,customer}= await fetchPaymentSheetParams()
    const {error}=await initPaymentSheet({
      customerID:customer,
      customerEphemeralKeySecret:ephemeralKey,
      paymentIntentClientSecret:paymentIntent,
      merchantDisplayName:"xxTESTxx",
      allowsDelayedPaymentMethods:true,
      returnURL:'stripe-example://stripe-redirect',
      applePay:{
        merchantCountryCode:"TH",
      },
      googlePay:{
        merchantCountryCode:'TH',
        testEnv:true,
        currencyCode:'thb',
      }
    })
    if (error){
      Alert.alert(`Error code: ${error.code}`,error.message)

    }else{
      setReady(true)
    }
  }

  const fetchPaymentSheetParams=async()=>{
    const response=await fetch(`${API_URL}/payment-sheet`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      }
    })
    const {paymentIntent,ephemeralKey,customer}=await response.json()
    return{
      paymentIntent,
      ephemeralKey,
      customer,
    }
  }

  async function buy(){
    const {error} = await presentPaymentSheet()
    if (error){
      Alert.alert(`Error code: ${error.code}`,error.message)
    }else{
      Alert.alert("Success","The payment was confirmed successfully!")
      setReady(false)
    }
  }
  return(
    <View style={styles.container}>
      <StripeProvider
          PUBLISHABLE_KEY={PUBLISHABLE_KEY}
          merchantIdentifier={MERCHANT_ID}
        >
          <Button title={'Buy'} onPress={buy} disabled={loading || !ready}/>
        </StripeProvider>
    </View>
  )
}
export default StripeApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: 100,
  },
  input: {
    backgroundColor: "#efefefef",

    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    backgroundColor: "#efefefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});
