import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Button, TouchableOpacity,Alert } from 'react-native';
import React , {useState,useEffect} from 'react'
import Constants from 'expo-constants';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux'

import * as UserModel from '../../firebase/userModel'
import * as WorkModel from '../../firebase/workModel'

export const Home = ({navigation,route}) => {
    const Info = useSelector((state) => state.auths)
    //console.log(route.params)
    //console.log(Info.profile)

    // const Info = route.params

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

    const mechanic_check_success = (data) => {

      navigation.navigate({name:'Mechanic_Check_1',params:data})
    }
    const mechanic_check_unsuccess = (msg) => {
      Alert.alert(msg)
    }

    const goMechanicCheckPage = (username) => {
      WorkModel.Mechanic_Check_getWorksByUsername(username,mechanic_check_success,mechanic_check_unsuccess)
    }

    const mechanic_fix_success = (data) => {

      navigation.navigate({name:'Mechanic_Fix_1',params:data})
    }
    const mechanic_fix_unsuccess = (msg) => {
      Alert.alert(msg)
    }

    const goMechanicFixPage = (username) => {
      WorkModel.Mechanic_Fix_getWorksByUsername(username,mechanic_fix_success,mechanic_fix_unsuccess)
    }

    const headmechanic_assign_success = (data) => {
      navigation.navigate({name:"Head_Mechanic_Assign_1",params:data})
    }
    const headmechanic_assign_unsuccess = (msg) => {
      Alert.alert(msg)
    }
    const headmechanic_confirm_success = (data) => {
      navigation.navigate({name:'Head_Mechanic_Confirm_1',params:data})
    }
    const headmechanic_confirm_unsuccess = (msg) => {
      Alert.alert(msg)
    }
    const cashier_checkbill_success = (data) => {
      navigation.navigate({name:'Cashier_Checkbill_1',params:data})
    }
    const cashier_checkbill_unsuccess = (msg) => {
      Alert.alert(msg)
    }

    const goHeadMechanicAssignPage = () => {
      WorkModel.HeadMechanic_Assign_getWorks(headmechanic_assign_success,headmechanic_assign_unsuccess)
    }
    const goHeadMechanicConfirmPage = () => {
      WorkModel.HeadMechanic_Confirm_getWorks(headmechanic_confirm_success,headmechanic_confirm_unsuccess)
    }

    const goCashierCheckbillPage = () => {
      WorkModel.Cashier_Checkbill_getWorks(cashier_checkbill_success,cashier_checkbill_unsuccess)
    }



    //ข้อมูลของผู้ใช้ ชื่อ นามสกุล ทะเบียน ตำแหน่งงาน
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
                              <Text style={{fontFamily:'Sound-Rounded',fontSize:16}}>{Info.profile.firstname+' '+Info.profile.lastname}</Text>
                              <Text style={{fontFamily:'Sound-Rounded',fontSize:16}}>{Info.profile.firstVehicleId+' '+Info.profile.astVehicleId}</Text>
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
                              <Text style={{fontFamily:'Sound-Rounded',fontSize:16}}>{Info.profile.firstname+' '+Info.profile.lastname}</Text>
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
                              <Text style={{fontFamily:'Sound-Rounded',fontSize:16}}>{Info.profile.firstname+' '+Info.profile.lastname}</Text>
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
                              <Text style={{fontFamily:'Sound-Rounded',fontSize:16}}>{Info.profile.firstname+' '+Info.profile.lastname}</Text>
                              <Text style={{fontFamily:'Sound-Rounded',fontSize:16}}>ผู้จัดการ</Text>
                          </View>
                        </View>
                    </View>
              )
            case "cashier":
              return (
                <View style={{borderWidth:0,height:140,justifyContent:'center',alignItems:'center'}}>
                        <View style={{borderWidth:0,width:330,height:100,backgroundColor:'#D9D9D9',borderRadius:10,justifyContent:'center',flexDirection:'row'}}>
                          <View style={{borderWidth:0,width:100,height:100,justifyContent:'center',alignItems:'center',borderRadius:10}}>
                              <View style={{borderWidth:0,width:80,height:80,borderRadius:40,backgroundColor:'white'}}>
                              </View>
                          </View>
                          <View style={{borderWidth:0,width:230,height:100,borderRadius:10,alignItems:'center',justifyContent:'center'}}>
                              <Text style={{fontFamily:'Sound-Rounded',fontSize:16}}>{Info.profile.firstname+' '+Info.profile.lastname}</Text>
                              <Text style={{fontFamily:'Sound-Rounded',fontSize:16}}>พนักงานคิดเงิน</Text>
                          </View>
                        </View>
                    </View>
              )
        }
    }

    const whatAbilityText = (role) => {
      //ลูกค้า
      if(role=='customer'){
        return (
          <View style={{height:50,borderWidth:0,justifyContent:'center'}}>
            <Text style={{fontFamily:'Sound-Rounded',fontSize:25,color:'#05C3FF',marginLeft:10}}>รายการ</Text>
          </View>
        )
      }
      //ช่าง หัวหน้าช่าง ผู้จัดการ แคชเชียร์
      else{
        return (
          <View style={{height:50,borderWidth:0,justifyContent:'center'}}>
            <Text style={{fontFamily:'Sound-Rounded',fontSize:25,color:'#05C3FF',marginLeft:10}}>งานที่ได้รับมอบหมาย</Text>
          </View>
        )
      }
    }

    const whatAbility = (role) => {
      //ลูกค้า
      if(role=='customer'){
        return (
          <View style={{flex:1,borderWidth:0,alignItems:'center'}}>
            <TouchableOpacity style={{borderWidth:0,width:330,height:75,backgroundColor:'#FFB156',borderRadius:5,justifyContent:'center',margin:5}}>
              <Text style={{fontFamily:'Sound-Rounded',fontSize:20,color:'white',marginLeft:10}}>อู่รถใกล้ฉัน</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{borderWidth:0,width:330,height:75,backgroundColor:'#FFB156',borderRadius:5,justifyContent:'center',margin:5}}>
              <Text style={{fontFamily:'Sound-Rounded',fontSize:20,color:'white',marginLeft:10}}>คิวของฉัน</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{borderWidth:0,width:330,height:75,backgroundColor:'#FFB156',borderRadius:5,justifyContent:'center',margin:5}}>
              <Text style={{fontFamily:'Sound-Rounded',fontSize:20,color:'white',marginLeft:10}}>ติดตามความคืบหน้า</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{borderWidth:0,width:330,height:75,backgroundColor:'#FFB156',borderRadius:5,justifyContent:'center',margin:5}}>
              <Text style={{fontFamily:'Sound-Rounded',fontSize:20,color:'white',marginLeft:10}}>แก้ไขข้อมูลส่วนตัว</Text>
            </TouchableOpacity>
          </View>
        )
      }
      //ช่าง
      if(role=='mechanic'){
        return (
          <View style={{flex:1,borderWidth:0,alignItems:'center'}}>
            <TouchableOpacity style={{borderWidth:0,width:330,height:75,backgroundColor:'#FFB156',borderRadius:5,justifyContent:'center',margin:5}}
              onPress={()=>{
                goMechanicCheckPage(Info.profile.username)
              }}
            >
              <Text style={{fontFamily:'Sound-Rounded',fontSize:20,color:'white',marginLeft:10}}>ตรวจเช็คสภาพรถยนต์</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{borderWidth:0,width:330,height:75,backgroundColor:'#FFB156',borderRadius:5,justifyContent:'center',margin:5}}
              onPress={()=>{
                goMechanicFixPage(Info.profile.username)
              }}
            >
              <Text style={{fontFamily:'Sound-Rounded',fontSize:20,color:'white',marginLeft:10}}>ซ่อมแซมรถยนต์</Text>
            </TouchableOpacity>
          </View>
        )
      }
      //หัวหน้าช่าง
      if(role=='head_mechanic'){
        return (
          <View style={{flex:1,borderWidth:0,alignItems:'center'}}>
            <TouchableOpacity style={{borderWidth:0,width:330,height:75,backgroundColor:'#FFB156',borderRadius:5,justifyContent:'center',margin:5}}
              onPress={()=>{
                goHeadMechanicAssignPage()
              }}
            >
              <Text style={{fontFamily:'Sound-Rounded',fontSize:20,color:'white',marginLeft:10}}>มอบหมายงานให้พนักงานช่าง</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{borderWidth:0,width:330,height:75,backgroundColor:'#FFB156',borderRadius:5,justifyContent:'center',margin:5}}
              onPress={()=>{
                goHeadMechanicConfirmPage()
              }}
            >
              <Text style={{fontFamily:'Sound-Rounded',fontSize:20,color:'white',marginLeft:10}}>งานที่รอยืนยัน</Text>
            </TouchableOpacity>
          </View>
        )
      }
      //ผู้จัดการ
      if(role=='manager'){
        return (
          pass
        )
      }
      //แคชเชียร์
      if(role=='cashier'){
        return (
          <View style={{flex:1,borderWidth:0,alignItems:'center'}}>
            <TouchableOpacity style={{borderWidth:0,width:330,height:75,backgroundColor:'#FFB156',borderRadius:5,justifyContent:'center',margin:5}}
              onPress={()=>{
                goCashierCheckbillPage()
              }}
            >
              <Text style={{fontFamily:'Sound-Rounded',fontSize:20,color:'white',marginLeft:10}}>รายการรอเช็คบิล  </Text>
            </TouchableOpacity>
          </View>
        )
      }
    }


  return (
    <View style={{flex:1,paddingTop: Constants.statusBarHeight}}>
      <View style={{height:80,backgroundColor:'#05C3FF',justifyContent:'center',alignContent:'center'}}>
        <Text style={{borderWidth:0,fontSize:25,color:'white',marginLeft:20,fontFamily:'Sound-Rounded'}}>หน้าแรก</Text>
      </View>
      
      {whatRole(Info.profile.role)}
      
      <View style={{width:330,height:1,borderWidth:0,backgroundColor:'black',alignSelf:'center'}}></View>
      
      {whatAbilityText(Info.profile.role)}

      {whatAbility(Info.profile.role)}


      <View style={{width:'100%',height:50,borderWidth:0,backgroundColor:'#69DBFF',justifyContent:'center',alignItems:'center',borderTopLeftRadius:50,borderTopRightRadius:50}}>
        <TouchableOpacity activeOpacity={1} style={{width:80,height:80,borderWidth:1,backgroundColor:'#37CFFF',borderRadius:40,marginBottom:50,justifyContent:'center',alignItems:'center',borderColor:'#89E3FF'}}>
          <Ionicons name="home" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

});
