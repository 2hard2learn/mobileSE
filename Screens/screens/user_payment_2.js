import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Button,TouchableOpacity,TextInput, ScrollView,Alert} from 'react-native';
import React from 'react'
import Constants from 'expo-constants';
import { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux'


import * as WorkModel from '../../firebase/workModel'

export const User_Payment_2 = ({navigation,route}) => {
  const Info = useSelector((state) => state.auths)
  let workInfo = route.params

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
        <TouchableOpacity style={{width:200,height:50,backgroundColor:'#00D662',justifyContent:'center',alignItems:'center',borderRadius:10,marginBottom:20}}
            onPress={()=>{
              if(input==''){
                Alert.alert('กรุณากรอกผลการตรวจสอบ')
              }
              else{
                submit()
              }
            }}
          >
            <Text style={{borderWidth:0,fontSize:20,color:'white',fontFamily:'Sound-Rounded'}}>ชำระเงิน</Text>
          </TouchableOpacity>
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
