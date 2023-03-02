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
    const {paymentIntent,ephemaralKey,customer}= await fetchPaymentSheetParams()
    const {error}=await initPaymentSheet({
      customerID:customer,
      customerEphemeralKeySecret:ephemaralKey,
      paymentIntentClientSecret:paymentIntent,
      merchantDisplayName:"xxTESTxx",
      allowsDelayedPaymentMethods:true,
      returnURL:'stripe-example://stripe-redirect',

    })
    if (error){
      Alert.alert(`Error code: ${error.code}`,error.message)

    }else{
      setReady(true)
    }
  }

  const fetchPaymentSheetParams=async()=>{
    const response=await fetch(API_URL,{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      }
    })
    const {paymentIntent,ephemaralKey,customer}=await response.json()
    return{
      paymentIntent,
      ephemaralKey,
      customer,
    }
  }

  async function buy(){
    const {error} = await presentPaymentSheet()
    if (error){
      Alert.alert("Error code: The payment was confirmed successfully")
    }else{
      Alert.alert("Success","The payment was")
      setReady(false)
    }
  }
  return(
    <View style={styles.container}>
      <StripeProvider
          publishableKey={pk_test_51MZcCtCZp5yHCVLLauwAwoC54CoJZS0j7xt974JeCBl85RfpR4NPF1JEmBFF7AxkXjrFj6Lp7luD47K4Jo5nuITW00ca68xEpx}
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
