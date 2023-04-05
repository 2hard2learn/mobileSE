import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Button,TouchableOpacity,TextInput, ScrollView,Alert} from 'react-native';
import React, { useState,useEffect } from 'react'
import Constants from 'expo-constants';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux'
import { CardField, PlatformPayButton, StripeProvider, confirmPaymentSheetPayment, isPlatformPaySupported, useConfirmPayment, 
  usePaymentSheet, usePlatformPay,useStripe } from "@stripe/stripe-react-native";
import {PUBLISHABLE_KEY,MERCHANT_ID,API_URL}from '../../src/Constants'


import * as WorkModel from '../../firebase/workModel'

export const User_Payment_2 = ({navigation,route}) => {
  const Info = useSelector((state) => state.auths)
  let workInfo = route.params
  const [ready,setReady]=useState(false)
  const {initPaymentSheet,presentPaymentSheet,loading,resetPaymentSheetCustomer}=useStripe()
  const {isPlatformPaySupported,confirmPlatformPayPayment}=usePlatformPay()
  const [paymentMethod,setPaymentMethod]=useState(null)
  const [paymentSheetEnabled,setPaymentSheetEnabled]=useState(false)
  const [clientSecret,setClientSecret]=useState('')
  const [disabled,setDisabled]=useState(false)
  useEffect(()=>{
    initialisePaymentSheet();

  }, [])
  



  const initialisePaymentSheet=async()=>{
    const {paymentIntent,setupIntent,ephemeralKey,customer}= await fetchPaymentSheetParams()
    console.log(`setup intent token : ${paymentIntent} `)
    console.log(customer)
    const Address = {
      city: 'San Francisco',
      country: 'AT',
      line1: '510 Townsend St.',
      line2: '123 Street',
      postalCode: '94102',
      state: 'California',
    };
    const BillingDetails={
      name: 'Jane Doe',
        email: 'phumiapiluk.p@ku.th',
        phone: '555-555-555',
        address: Address,
    }
    const {error,paymentOption}=await initPaymentSheet({
      appearance:{
        colors:{
          primary:'#FFB156', //#FFB156#40D727
          // background:'#ffffff',
          // componentBackground:'#abb2bf',
          componentDivider:'#e5c07b',
          primaryText:'#ffffff',
          icon:'#FFB156',
          primaryButtonLabel:'ASDASD!',
      
        },
        shapes:{
          borderRadius:25,
        }
      },

      customerID:customer,
      customerEphemeralKeySecret:ephemeralKey,
      paymentIntentClientSecret:paymentIntent,
      setupIntentClientSecret:setupIntent,
      merchantDisplayName:"xxTESTxx",
      allowsDelayedPaymentMethods:true,
      customFlow:false,
      style:'automatic',
      returnURL:'stripe-example://stripe-redirect',
      urlScheme: 'stripe-example',
      setReturnUrlSchemeOnAndroid: true,
      primaryButtonLabel:'Purchase!',
      primaryText:'ASDASDSAD',
      defaultBillingDetails:{
        BillingDetails
      },
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
      setPaymentSheetEnabled(true)
      setReady(true)
    }
    if(paymentOption){
      setPaymentMethod(paymentOption)

    }
   
  }
  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
  
  const choosePaymentOption=async()=>{
    const{error,paymentOption}=await presentPaymentSheet()
    if(error){
      Alert.alert(`Error code: ${error.code}`, error.message)

    }else if(paymentOption){
      setPaymentMethod({
        label:paymentOption.label,
        image:paymentOption.image,
      })
    }else{
      setPaymentMethod(null)
    }
  }


  const fetchPaymentSheetParams=async()=>{
    // if(!(await isPlatformPaySupported())){
    //   Alert.alert(
    //     'Error',
    //     `${Platform.OS==='android'?'Google':'Apple'} Pay is not supported.`,
    //   )
    //   return
    // }
    const response=await fetch(`${API_URL}/payment-sheet`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
       
        currency:'thb',
        items:['id-1'],
        request_three_d_secure:'any',
        
      })
    })
    const {paymentIntent,setupIntent,ephemeralKey,customer}=await response.json()
    return{
      paymentIntent,
      setupIntent,
      ephemeralKey,
      customer,
    }
  }
  
  const openPaymentSheet=async()=>{
    const {error}=await presentPaymentSheet()
    if(error){
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Payment Successful', 'Your payment method is successfully set up for future payments!');
    
    }

  }

 

  const handlePayPress=async()=>{
    const {clientSecret,error} = await presentPaymentSheet()
    if (error){
      Alert.alert(`Error code: ${error.code}`,error.message)
    }else{
      Alert.alert("Success","The payment was confirmed successfully!")
      setReady(false)
      setPaymentSheetEnabled(false)
    }
    const BillingDetails={
      name:'John Doe',
      email:'www.pzana@hotmail.co.th',

    }

  }
  const pay=async()=>{
    const {clientSecret,error} = await confirmPaymentSheetPayment()
    if (error){
      Alert.alert(`Error code: ${error.code}`,error.message)
    }else{
      Alert.alert("Success","The payment was confirmed successfully!")
      setReady(false)
      setPaymentSheetEnabled(false)
    }
   

  }






  const getBillSuccess = (data) => {
    // console.log(data)
    navigation.navigate({name:'User_Payment_1',params:data})
  }

  const goUserGetBill = (info) => {
    WorkModel.getBill(info,getBillSuccess)
  }


  const [input,setInput] = useState()


  const submit = () => {

  }

  const listPanel = (bill) => {
    // console.log(bill)
    let total = 0
    bill.forEach((item)=>{
        total = total+1
    })
    if(total==0){
        return 
      }
      if(total==1){
        return (
          <View style={{flexDirection:'row',marginTop:10,justifyContent:'space-around',alignItems:'center'}}>
            <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>1.</Text>
            <View style={{borderWidth:0,backgroundColor:'white',width:130,height:30,borderRadius:10,justifyContent:'center'}}>
                <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}
  
                >{bill[0].title}</Text>
            </View>
            <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>ราคา</Text>
            <View style={{borderWidth:0,backgroundColor:'white',width:80,height:30,borderRadius:10,justifyContent:'center'}}>
                <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}
  
                >{bill[0].amount}</Text>
            </View>
          </View>
        )
      }
      if(total==2){
        return (
          <View>
            <View style={{flexDirection:'row',marginTop:10,justifyContent:'space-around',alignItems:'center',borderWidth:0}}>
              <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>1.</Text>
              <View style={{borderWidth:0,backgroundColor:'white',width:130,height:30,borderRadius:10,justifyContent:'center'}}>
                  <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}
  
                  >{bill[0].title}</Text>
              </View>
              <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>ราคา</Text>
              <View style={{borderWidth:0,backgroundColor:'white',width:80,height:30,borderRadius:10,justifyContent:'center'}}>
                  <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}
  
                  >{bill[0].amount}</Text>
              </View>
            </View>
            <View style={{flexDirection:'row',marginTop:5,justifyContent:'space-around',alignItems:'center',borderWidth:0}}>
              <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>2.</Text>
              <View style={{borderWidth:0,backgroundColor:'white',width:130,height:30,borderRadius:10,justifyContent:'center'}}>
                  <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}
  
                  >{bill[1].title}</Text>
              </View>
              <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>ราคา</Text>
              <View style={{borderWidth:0,backgroundColor:'white',width:80,height:30,borderRadius:10,justifyContent:'center'}}>
                  <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}
  
                  >{bill[1].amount}</Text>
              </View>
            </View>
          </View>
        )
      }
      if(total==3){
        return (
          <View>
            <View style={{flexDirection:'row',marginTop:10,justifyContent:'space-around',alignItems:'center',borderWidth:0}}>
              <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>1.</Text>
              <View style={{borderWidth:0,backgroundColor:'white',width:130,height:30,borderRadius:10,justifyContent:'center'}}>
                  <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}
  
                  >{bill[0].title}</Text>
              </View>
              <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>ราคา</Text>
              <View style={{borderWidth:0,backgroundColor:'white',width:80,height:30,borderRadius:10,justifyContent:'center'}}>
                  <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}
  
                  >{bill[0].amount}</Text>
              </View>
            </View>
            <View style={{flexDirection:'row',marginTop:5,justifyContent:'space-around',alignItems:'center',borderWidth:0}}>
              <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>2.</Text>
              <View style={{borderWidth:0,backgroundColor:'white',width:130,height:30,borderRadius:10,justifyContent:'center'}}>
                  <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}
  
                  >{bill[1].title}</Text>
              </View>
              <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>ราคา</Text>
              <View style={{borderWidth:0,backgroundColor:'white',width:80,height:30,borderRadius:10,justifyContent:'center'}}>
                  <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}
  
                  >{bill[1].amount}</Text>
              </View>
            </View>
            <View style={{flexDirection:'row',marginTop:5,justifyContent:'space-around',alignItems:'center',borderWidth:0}}>
              <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>3.</Text>
              <View style={{borderWidth:0,backgroundColor:'white',width:130,height:30,borderRadius:10,justifyContent:'center'}}>
                  <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}
  
                  >{bill[2].title}</Text>
              </View>
              <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>ราคา</Text>
              <View style={{borderWidth:0,backgroundColor:'white',width:80,height:30,borderRadius:10,justifyContent:'center'}}>
                  <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}
  
                  >{bill[2].amount}</Text>
              </View>
            </View>
          </View>
        )
      }
      if(total==4){
        return (
          <View>
            <View style={{flexDirection:'row',marginTop:10,justifyContent:'space-around',alignItems:'center',borderWidth:0}}>
              <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>1.</Text>
              <View style={{borderWidth:0,backgroundColor:'white',width:130,height:30,borderRadius:10,justifyContent:'center'}}>
                  <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}
  
                  >{bill[0].title}</Text>
              </View>
              <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>ราคา</Text>
              <View style={{borderWidth:0,backgroundColor:'white',width:80,height:30,borderRadius:10,justifyContent:'center'}}>
                  <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}
  
                  >{bill[0].amount}</Text>
              </View>
            </View>
            <View style={{flexDirection:'row',marginTop:5,justifyContent:'space-around',alignItems:'center',borderWidth:0}}>
              <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>2.</Text>
              <View style={{borderWidth:0,backgroundColor:'white',width:130,height:30,borderRadius:10,justifyContent:'center'}}>
                  <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}
  
                  >{bill[1].title}</Text>
              </View>
              <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>ราคา</Text>
              <View style={{borderWidth:0,backgroundColor:'white',width:80,height:30,borderRadius:10,justifyContent:'center'}}>
                  <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}
  
                  >{bill[1].amount}</Text>
              </View>
            </View>
            <View style={{flexDirection:'row',marginTop:5,justifyContent:'space-around',alignItems:'center',borderWidth:0}}>
              <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>3.</Text>
              <View style={{borderWidth:0,backgroundColor:'white',width:130,height:30,borderRadius:10,justifyContent:'center'}}>
                  <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}
  
                  >{bill[2].title}</Text>
              </View>
              <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>ราคา</Text>
              <View style={{borderWidth:0,backgroundColor:'white',width:80,height:30,borderRadius:10,justifyContent:'center'}}>
                  <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}
  
                  >{bill[2].amount}</Text>
              </View>
            </View>
            <View style={{flexDirection:'row',marginTop:5,justifyContent:'space-around',alignItems:'center',borderWidth:0}}>
              <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>4.</Text>
              <View style={{borderWidth:0,backgroundColor:'white',width:130,height:30,borderRadius:10,justifyContent:'center'}}>
                  <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}
  
                  >{bill[3].title}</Text>
              </View>
              <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>ราคา</Text>
              <View style={{borderWidth:0,backgroundColor:'white',width:80,height:30,borderRadius:10,justifyContent:'center'}}>
                  <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}
  
                  >{bill[3].amount}</Text>
              </View>
            </View>
          </View>
        )
      }
      else{
        return (
          <View style={{borderWidth:0,backgroundColor:'white',width:130,height:30,borderRadius:10,justifyContent:'center'}}>
                <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}
  
                ></Text>
            </View>
        )
      }
  }

  return (
    <View style={{flex:1,justifyContent:'space-between',paddingTop: Constants.statusBarHeight}}>

      <View style={{height:80,backgroundColor:'#05C3FF',alignItems:'center',flexDirection:'row'}}>
        <TouchableOpacity style={{width:50,height:50,backgroundColor:'#FFA133',marginLeft:10,borderRadius:10,justifyContent:'center',alignItems:'center'}}
            onPress={()=>{
              goUserGetBill(Info.profile)
                // listPanel(workInfo.bill)
            }}
            
          >
            <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={{borderWidth:0,fontSize:25,color:'white',marginLeft:20,fontFamily:'Sound-Rounded'}}>ชำระเงิน</Text>
      </View>


       
      <View style={{width:'100%',borderWidth:0,justifyContent:'center',alignItems:'center'}}>
        <View style={{borderWidth:0,width:'90%',height:60,justifyContent:'center',borderTopLeftRadius:20,borderTopRightRadius:20,backgroundColor:'#05C3FF'}}>
          <Text style={{borderWidth:0,fontSize:25,color:'white',marginLeft:20,fontFamily:'Sound-Rounded'}}>{workInfo.plate}</Text>
        </View>
        <View style={{borderWidth:0,width:'90%',height:180,justifyContent:'center',alignItems:'center',borderBottomLeftRadius:20,borderBottomRightRadius:20,backgroundColor:'#69DBFF'}}>
            <View style={{borderWidth:0,width:'80%'}}>
            {listPanel(workInfo.bill)}
            </View>
        </View>
        <View style={{marginTop:10}}>
        <TouchableOpacity activeOpacity={0.5} style={{width:200,height:50,backgroundColor:'#00D662',justifyContent:'center',alignItems:'center',borderRadius:10,marginBottom:20}}
            onPress={()=>{
              handlePayPress()
              Alert.alert("Success","The payment was confirmed successfully!")
              setReady(false)
              setPaymentSheetEnabled(false)
            }}
            
            disabled={!ready}
            title={loading ? 'Fethcing payment intent...':'Checkout'}
          >
            <Text style={{borderWidth:0,fontSize:20,color:'white',fontFamily:'Sound-Rounded'}}>ชำระเงิน</Text>
          </TouchableOpacity>
          {/* <View style={{marginTop:10}}>
          <Button
            variant='primary'
            disabled={!ready}
            title={ loading ? 'Fetching payment intent...':'Checkout'  } 
            onPress={handlePayPress}
            style={{width:200,height:50,backgroundColor:'#00D662'}} 
            color='#00D662'
            
          />

          </View> */}
        </View>
      </View>


      <View style={{width:'100%',height:50,borderWidth:0,backgroundColor:'#69DBFF',justifyContent:'center',alignItems:'center',borderTopLeftRadius:50,borderTopRightRadius:50}}>
        <TouchableOpacity activeOpacity={1} style={{width:80,height:80,borderWidth:1,backgroundColor:'#37CFFF',borderRadius:40,marginBottom:50,justifyContent:'center',alignItems:'center',borderColor:'#89E3FF'}}
          onPress={()=>{
            navigation.navigate({name:'Home'})
          }}
        >
          <Ionicons name="home" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

});
