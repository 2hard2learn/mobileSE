import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Button, TouchableOpacity } from 'react-native';
import React , {useState,useEffect} from 'react'
import Constants from 'expo-constants';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import * as UserModel from '../../firebase/userModel'

export const Home = ({navigation,route}) => {

    console.log(route.params)

    const Info = route.params

    //console.log(route.params.username)

    // const getInfoSuccess = (data) => {
    //     setInfo({
    //         username:data.username,
    //         firstname:data.firstname,
    //         lastname:data.lastname,
    //         role:data.role,
    //         firstVehicleId:data.firstVehicleId,
    //         lastVehicleId:data.lastVehicleId,
    //     })
    // }

    // const getInfoUnsuccess = (err) => {
    //     console.log(err)
    // }

    // const isArrObjEqual = (arr1,arr2) => {
    //     let temp = arr1.map(arr => ({...arr})) // temp = arr ( deep copy ) 
    //     if(temp.length !== arr2.length){
    //       return false
    //     }else{
    //       temp.forEach(obj1 => {
    //         arr2 = reject(arr2,(obj2)=>{
    //           if(isEqual(obj2,obj1)){
    //             arr1 = reject(obj1)
    //             return obj2
    //           }
    //         })
    //       })
    //       if(arr1.length === 0 && arr2.length === 0){
    //         return true
    //       }else{
    //         return false
    //       }
    //     }
    //   }

    // const getAllInfoSuccess = (data) => {
    //     if(!isArrObjEqual(data,Info)){
    //         setInfo(data)
    //     }else{

    //     }
    // }
    // if(Info==undefined){
    //     UserModel.getInfoByUsername(route.params.username,getInfoSuccess,getInfoUnsuccess)
    // }


    // const vehicleId = (route.params.firstVehicleId,route.params.lastVehicleId) => {
    //     if(route.params.firstVehicleId=='' || route.params.lastVehicleId==''){
    //         return (
    //             <Text style={{fontFamily:'Sound-Rounded',fontSize:16,color:'red'}}>ยังไม่กรอกหมายเลขทะเบียน</Text>
    //         )
    //     }else{
    //         return (
    //             <Text style={{fontFamily:'Sound-Rounded',fontSize:16}}>{route.params.firstVehicleId+'-'+route.params.lastVehicleId}</Text>
    //         )
    //     }
    // }

    const whatRole = (role) => {
        switch(role){
            case "customer":
                return (
                    <View style={{borderWidth:0,height:140,justifyContent:'center',alignItems:'center'}}>
                        <View style={{borderWidth:0,width:330,height:100,backgroundColor:'#D9D9D9',borderRadius:10,justifyContent:'center',flexDirection:'row'}}>
                          <View style={{borderWidth:0,width:100,height:100,justifyContent:'center',alignItems:'center',borderRadius:10}}>
                              <View style={{borderWidth:0,width:80,height:80,borderRadius:40,backgroundColor:'white'}}>
                              </View>
                          </View>
                          <View style={{borderWidth:0,width:230,height:100,borderRadius:10,alignItems:'center',justifyContent:'center'}}>
                              <Text style={{fontFamily:'Sound-Rounded',fontSize:16}}>{Info.firstname+' '+Info.lastname}</Text>
                              <Text style={{fontFamily:'Sound-Rounded',fontSize:16}}>{Info.firstVehicleId+' '+Info.lastVehicleId}</Text>
                          </View>
                        </View>
                    </View>
                )
            case "mechanic":
              return (
                <View style={{borderWidth:0,height:140,justifyContent:'center',alignItems:'center'}}>
                        <View style={{borderWidth:0,width:330,height:100,backgroundColor:'#D9D9D9',borderRadius:10,justifyContent:'center',flexDirection:'row'}}>
                          <View style={{borderWidth:0,width:100,height:100,justifyContent:'center',alignItems:'center',borderRadius:10}}>
                              <View style={{borderWidth:0,width:80,height:80,borderRadius:40,backgroundColor:'white'}}>
                              </View>
                          </View>
                          <View style={{borderWidth:0,width:230,height:100,borderRadius:10,alignItems:'center',justifyContent:'center'}}>
                              <Text style={{fontFamily:'Sound-Rounded',fontSize:16}}>{Info.firstname+' '+Info.lastname}</Text>
                              <Text style={{fontFamily:'Sound-Rounded',fontSize:16}}>พนักงานช่าง</Text>
                          </View>
                        </View>
                    </View>
              )
            case "head_mechanic":
              return (
                <View style={{borderWidth:0,height:140,justifyContent:'center',alignItems:'center'}}>
                        <View style={{borderWidth:0,width:330,height:100,backgroundColor:'#D9D9D9',borderRadius:10,justifyContent:'center',flexDirection:'row'}}>
                          <View style={{borderWidth:0,width:100,height:100,justifyContent:'center',alignItems:'center',borderRadius:10}}>
                              <View style={{borderWidth:0,width:80,height:80,borderRadius:40,backgroundColor:'white'}}>
                              </View>
                          </View>
                          <View style={{borderWidth:0,width:230,height:100,borderRadius:10,alignItems:'center',justifyContent:'center'}}>
                              <Text style={{fontFamily:'Sound-Rounded',fontSize:16}}>{Info.firstname+' '+Info.lastname}</Text>
                              <Text style={{fontFamily:'Sound-Rounded',fontSize:16}}>หัวหน้าช่าง</Text>
                          </View>
                        </View>
                    </View>
              )
            case "manager":
              return (
                <View style={{borderWidth:0,height:140,justifyContent:'center',alignItems:'center'}}>
                        <View style={{borderWidth:0,width:330,height:100,backgroundColor:'#D9D9D9',borderRadius:10,justifyContent:'center',flexDirection:'row'}}>
                          <View style={{borderWidth:0,width:100,height:100,justifyContent:'center',alignItems:'center',borderRadius:10}}>
                              <View style={{borderWidth:0,width:80,height:80,borderRadius:40,backgroundColor:'white'}}>
                              </View>
                          </View>
                          <View style={{borderWidth:0,width:230,height:100,borderRadius:10,alignItems:'center',justifyContent:'center'}}>
                              <Text style={{fontFamily:'Sound-Rounded',fontSize:16}}>{Info.firstname+' '+Info.lastname}</Text>
                              <Text style={{fontFamily:'Sound-Rounded',fontSize:16}}>ผู้จัดการ</Text>
                          </View>
                        </View>
                    </View>
              )
        }
    }

    const whatAbility = (role) => {
      if(role=='customer'){
        return (
          <View style={{height:50,borderWidth:0,justifyContent:'center'}}>
            <Text style={{fontFamily:'Sound-Rounded',fontSize:25,color:'#05C3FF',marginLeft:10}}>รายการ</Text>
          </View>
        )
      }else{
        return (
          <View style={{height:50,borderWidth:0,justifyContent:'center'}}>
            <Text style={{fontFamily:'Sound-Rounded',fontSize:25,color:'#05C3FF',marginLeft:10}}>งานที่ได้รับมอบหมาย</Text>
          </View>
        )
      }
    }

  return (
    <View style={{flex:1,paddingTop: Constants.statusBarHeight}}>
      <View style={{height:80,backgroundColor:'#05C3FF',justifyContent:'center',alignContent:'center'}}>
        <Text style={{borderWidth:0,fontSize:25,color:'white',marginLeft:20,fontFamily:'Sound-Rounded'}}>หน้าแรก</Text>
      </View>
      
      {whatRole(Info.role)}
      
      <View style={{width:330,height:1,backgroundColor:'black',alignSelf:'center'}}></View>
      
      {whatAbility(Info.role)}

      <View style={{flex:1,borderWidth:0,alignItems:'center'}}>
        <TouchableOpacity style={{borderWidth:0,width:330,height:75,backgroundColor:'#FFB156',borderRadius:5,justifyContent:'center'}}
          onPress={()=>{
            navigation.navigate('Mechanic_Select')
          }}
        >
          <Text style={{fontFamily:'Sound-Rounded',fontSize:20,color:'white',marginLeft:10}}>ตรวจเช็คสภาพรถยนต์</Text>
        </TouchableOpacity>

      </View>
      <View style={{width:'100%',height:50,borderWidth:0,backgroundColor:'#69DBFF',justifyContent:'center',alignItems:'center',borderTopLeftRadius:50,borderTopRightRadius:50}}>
        <View style={{width:80,height:80,borderWidth:1,backgroundColor:'#37CFFF',borderRadius:40,marginBottom:50,justifyContent:'center',alignItems:'center',borderColor:'#89E3FF'}}>
          <Ionicons name="home" size={30} color="white" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

});
