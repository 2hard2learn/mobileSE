import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Button,TouchableOpacity,TextInput, ScrollView,Alert} from 'react-native';
import React from 'react'
import Constants from 'expo-constants';
import { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux'


import * as WorkModel from '../../firebase/workModel'
import * as UserModel from '../../firebase/userModel'

export const User_Car_2 = ({navigation,route}) => {
  const Info = useSelector((state) => state.auths)
  let workInfo = route.params

  const getCarSuccess = (data) => {
    // console.log(data)
    navigation.navigate({name:'User_Car_1',params:data})
  }
  const getCarUnsuccess = () => {

  }

  const goUserCarPage = (info) => {
    UserModel.getCar(info,getCarSuccess,getCarUnsuccess)
  }

//   const [input,setInput] = useState()

  const editCarSuccess = () => {

  }
  const editCarUnsuccess = () => {

  }

  const submit = (info) => {
    let newCarInfo = {
        'plate':plate,
        'brand':brand
    }
    UserModel.editCar(info,workInfo.plate,newCarInfo,editCarSuccess,editCarUnsuccess)
  }

  const [plate,setPlate] = useState(workInfo.plate)
  const [brand,setBrand] = useState(workInfo.brand)



  return (
    <View style={{flex:1,justifyContent:'space-between',paddingTop: Constants.statusBarHeight}}>

      <View style={{height:80,backgroundColor:'#05C3FF',alignItems:'center',flexDirection:'row'}}>
        <TouchableOpacity style={{width:50,height:50,backgroundColor:'#FFA133',marginLeft:10,borderRadius:10,justifyContent:'center',alignItems:'center'}}
            onPress={()=>{
              goUserCarPage(Info.profile)
            }}
            
          >
            <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={{borderWidth:0,fontSize:25,color:'white',marginLeft:20,fontFamily:'Sound-Rounded'}}>แก้ไขข้อมูล</Text>
      </View>


       
      <View style={{width:'100%',borderWidth:0,justifyContent:'center',alignItems:'center'}}>
        <View style={{borderWidth:0,width:'90%',height:60,justifyContent:'center',borderTopLeftRadius:20,borderTopRightRadius:20,backgroundColor:'#05C3FF'}}>
          <Text style={{borderWidth:0,fontSize:25,color:'white',marginLeft:20,fontFamily:'Sound-Rounded'}}>รถ</Text>
        </View>
        <View style={{borderWidth:0,width:'90%',height:100,justifyContent:'center',alignItems:'center',borderBottomLeftRadius:20,borderBottomRightRadius:20,backgroundColor:'#69DBFF'}}>

            <View style={{borderWidth:0,width:'100%',height:60,flexDirection:'row',justifyContent:'space-around'}}>
                <View style={{borderWidth:0}}>
                    <Text style={{borderWidth:0,fontSize:18,color:'white',fontFamily:'Sound-Rounded'}}>ทะเบียนรถ</Text>
                    <View style={{borderWidth:0,backgroundColor:'white',width:150,height:30,borderRadius:10,justifyContent:'center'}}>
                        <TextInput style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}
                            value={plate}
                            onChangeText={(text)=>{
                                setPlate(text)
                            }}
                        />
                    </View>
                </View>
                <View style={{borderWidth:0}}>
                    <Text style={{borderWidth:0,fontSize:18,color:'white',fontFamily:'Sound-Rounded'}}>รุ่นรถ</Text>
                    <View style={{borderWidth:0,backgroundColor:'white',width:150,height:30,borderRadius:10,justifyContent:'center'}}>
                        <TextInput style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}
                            value={brand}
                            onChangeText={(text)=>{
                                setBrand(text)
                            }}
                        />
                    </View>
                </View>
            </View>


        </View>
        <View style={{borderWidth:0,marginTop:30,justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity style={{width:150,height:50,backgroundColor:'#00D662',justifyContent:'center',alignItems:'center',borderRadius:10}}
                onPress={()=>{
                if(plate=='' || brand==''){
                    Alert.alert('กรุณากรอกให้ครบถ้วน')
                }
                else{
                    submit(Info.profile)
                }
                }}
            >
                <Text style={{borderWidth:0,fontSize:20,color:'white',fontFamily:'Sound-Rounded'}}>ยืนยันการแก้ไข</Text>
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
