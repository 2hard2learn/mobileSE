import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Button, TouchableOpacity,Alert,Image } from 'react-native';
import React , {useState,useEffect} from 'react'
import Constants from 'expo-constants';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import * as UserModel from '../../firebase/userModel'
import * as WorkModel from '../../firebase/workModel'
import * as AuthModel from '../../firebase/authModel'

export const Home = ({navigation,route}) => {
    const Info = useSelector((state) => state.auths)
    //console.log(route.params)
    // console.log(Info.profile)

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


    // const haveVehicleId = () => {
    //     if(Info.profile.firstVehicleId==undefined || Info.profile.lastVehicleId==undefined){
    //         return (
    //             <Text style={{fontFamily:'Sound-Rounded',fontSize:16,color:'red'}}>ยังไม่กรอกหมายเลขทะเบียน</Text>
    //         )
    //     }else{
    //         return (
    //             <Text style={{fontFamily:'Sound-Rounded',fontSize:16}}>{Info.profile.firstVehicleId+'-'+Info.profile.lastVehicleId}</Text>
    //         )
    //     }
    // }


    //---------------- ตรวจสภาพ --------------------
    const mechanic_check_success = (data) => {
      navigation.navigate({name:'Mechanic_Check_1',params:data})
    }
    const mechanic_check_unsuccess = (msg) => {
      Alert.alert(msg)
    }
    const goMechanicCheckPage = (info) => {
      WorkModel.getWorks(info,'check',mechanic_check_success,mechanic_check_unsuccess)
    }
    //----------------------------------------------

    //---------------- ซ่อมแซม --------------------
    const mechanic_fix_success = (data) => {
      navigation.navigate({name:'Mechanic_Fix_1',params:data})
    }
    const mechanic_fix_unsuccess = (msg) => {
      Alert.alert(msg)
    }
    const goMechanicFixPage = (info) => {
      WorkModel.getWorks(info,'fix',mechanic_fix_success,mechanic_fix_unsuccess)
    }
    //----------------------------------------------

    //---------------- หัวหน้า มอบหมายงาน --------------------
    const headmechanic_assign_success = (data) => {
      navigation.navigate({name:"Head_Mechanic_Assign_1",params:data})
    }
    const headmechanic_assign_unsuccess = (msg) => {
      Alert.alert(msg)
    }
    const goHeadMechanicAssignPage = (info) => {
      // console.log(info)
      WorkModel.getWorks(info,'assign',headmechanic_assign_success,headmechanic_assign_unsuccess)
    }
    //----------------------------------------------

    //---------------- หัวหน้า ยืนยันงาน --------------------
    const headmechanic_confirm_success = (data) => {
      navigation.navigate({name:'Head_Mechanic_Confirm_1',params:data})
    }
    const headmechanic_confirm_unsuccess = (msg) => {
      Alert.alert(msg)
    }
    const goHeadMechanicConfirmPage = (info) => {
      WorkModel.getWorks(info,'confirm',headmechanic_confirm_success,headmechanic_confirm_unsuccess)
    }
    //----------------------------------------------

    //------------------ หัวหน้าช่าง ประเมินราคา --------------------
    const goBoss_set_price_success = (data) =>{
      // console.log(data)
      navigation.navigate({name:'Head_Mechanic_Setprice_1',params:data})
    }
    const goBoss_set_price_unsuccess = (msg) =>{

    }
    const goBossSetPricePage = (info) => {
      WorkModel.getWorks(info,'setprice',goBoss_set_price_success,goBoss_set_price_unsuccess)
    }
    //------------------------------------------------------------

    //------------------ เจ้าของอู่ แก้ไขพนักงาน --------------------
    const owner_edit_account_success = (data) => {
      // console.log(data)
      navigation.navigate({name:'Owner_Edit_Account_1',params:data})
    }
    const owner_edit_account_unsuccess = (msg) => {
      Alert.alert(msg)
    }
    const goOwnerEditAccountPage = (info) => {
      UserModel.OwnerGetEmployee(info,owner_edit_account_success,owner_edit_account_unsuccess)
    }
    //--------------------------------------------

    //-------------------- เจ้าของอู่ ดูประวัติงาน ------------------------
    const owner_history_success = (data) => {
      // console.log(data)
      navigation.navigate({name:'Owner_History_1',params:data})
    }
    const owner_history_unsuccess = (msg) => {

    }
    const goOwnerHistoryPage = (info) => {
      WorkModel.getWorks(info,'history',owner_history_success,owner_history_unsuccess)
    }
    //---------------------------------------------------------

    //------------------- เจ้าของอู่ แก้ไขข้อมูลอู่ --------------------
    const owner_edit_garage_success = (data) => {
      navigation.navigate({name:'Owner_Edit_Garage_1', params:data})
    }
    const owner_edit_garage_unsucess = (msg) => {

    }
    const goOwnerEditGaragePage = (info) => {
      UserModel.getGarage(info,owner_edit_garage_success,owner_edit_garage_unsucess)
    }

    //---------------- แคชเชีย --------------------
    const cashier_checkbill_success = (data) => {
      navigation.navigate({name:'Cashier_Checkbill_1',params:data})
    }
    const cashier_checkbill_unsuccess = (msg) => {
      Alert.alert(msg)
    }
    const goCashierCheckbillPage = () => {
      WorkModel.Cashier_Checkbill_getWorks(cashier_checkbill_success,cashier_checkbill_unsuccess)
    }
    //----------------------------------------------

    // ------------------- user เพิ่มรถ ---------------------
    const getCarSuccess = (data) => {
      // console.log(data)
      navigation.navigate({name:'User_Car_1',params:data})
    }
    const getCarUnsuccess = () => {

    }

    const goUserCarPage = (info) => {
      UserModel.getCar(info,getCarSuccess,getCarUnsuccess)
    }
    //----------------------------------------------------

    //------------------- ล็อคเอ้า ----------------------
    const signoutSuccess = () => {
      navigation.navigate({name:'Login_Screen'})
    }
    const signoutUnsuccess = () => {
      
    }
    // console.log(Info.profile)
    const onSignoutPress = () => {
      AuthModel.signOut(signoutSuccess,signoutUnsuccess)
    }
    //----------------------------------------------------

    //--------------- ลูกค้า จำลองการส่งข้อมูล ---------------------
    const addWorkSuccess = () => {

    }
    const addWorkUnsuccess = () => {

    }
    const onDemoPress = (info) => {
      // console.log(info)
      WorkModel.addWork(info,addWorkSuccess,addWorkUnsuccess)
    }
    //- ------------------------------------------------------

    //----------------- ลูกค้า จำลองการยืนยัน ---------------------
    const confirmCheckSuccess = () => {
    }
    const goUserConfirm = (info) => {
      WorkModel.userConfirm(info)
    }

    //ข้อมูลของผู้ใช้ ชื่อ นามสกุล ทะเบียน ตำแหน่งงาน
    const whatRole = (role) => {
        switch(role){
            case "user":
                return (
                    <View style={{borderWidth:0,height:140,justifyContent:'center',alignItems:'center'}}>
                        <View style={{borderWidth:0,width:330,height:100,backgroundColor:'#D9D9D9',borderRadius:10,justifyContent:'center',flexDirection:'row'}}>
                          <View style={{borderWidth:0,width:100,height:100,justifyContent:'center',alignItems:'center',borderRadius:10}}>
                          <View style={{borderWidth:0,width:80,height:80,borderRadius:40,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
                                <MaterialCommunityIcons name="account" size={60} color="gray" /> 
                              </View>
                          </View>
                          <View style={{borderWidth:0,width:230,height:100,borderRadius:10,alignItems:'center',justifyContent:'center'}}>
                              <Text style={{fontFamily:'Sound-Rounded',fontSize:16}}>{Info.profile.Name+' '+Info.profile.LastName}</Text>
                          </View>
                        </View>
                    </View>
                )
            case "employee":
              return (
                <View style={{borderWidth:0,height:140,justifyContent:'center',alignItems:'center'}}>
                        <View style={{borderWidth:0,width:330,height:100,backgroundColor:'#D9D9D9',borderRadius:10,justifyContent:'center',flexDirection:'row'}}>
                          <View style={{borderWidth:0,width:100,height:100,justifyContent:'center',alignItems:'center',borderRadius:10}}>
                          <View style={{borderWidth:0,width:80,height:80,borderRadius:40,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
                                <MaterialCommunityIcons name="account" size={60} color="gray" /> 
                              </View>
                          </View>
                          <View style={{borderWidth:0,width:230,height:100,borderRadius:10,alignItems:'center',justifyContent:'center'}}>
                              <Text style={{fontFamily:'Sound-Rounded',fontSize:16}}>{Info.profile.Name+' '+Info.profile.LastName}</Text>
                              <Text style={{fontFamily:'Sound-Rounded',fontSize:16}}>พนักงานช่าง</Text>
                          </View>
                        </View>
                    </View>
              )
            case "boss":
              return (
                <View style={{borderWidth:0,height:140,justifyContent:'center',alignItems:'center'}}>
                        <View style={{borderWidth:0,width:330,height:100,backgroundColor:'#D9D9D9',borderRadius:10,justifyContent:'center',flexDirection:'row'}}>
                          <View style={{borderWidth:0,width:100,height:100,justifyContent:'center',alignItems:'center',borderRadius:10}}>
                            <View style={{borderWidth:0,width:80,height:80,borderRadius:40,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
                                <MaterialCommunityIcons name="account" size={60} color="gray" /> 
                              </View>
                          </View>
                          <View style={{borderWidth:0,width:230,height:100,borderRadius:10,alignItems:'center',justifyContent:'center'}}>
                              <Text style={{fontFamily:'Sound-Rounded',fontSize:16}}>{Info.profile.Name+' '+Info.profile.LastName}</Text>
                              <Text style={{fontFamily:'Sound-Rounded',fontSize:16}}>หัวหน้าช่าง</Text>
                          </View>
                        </View>
                    </View>
              )
            case "owner":
              return (
                <View style={{borderWidth:0,height:140,justifyContent:'center',alignItems:'center'}}>
                        <View style={{borderWidth:0,width:330,height:100,backgroundColor:'#D9D9D9',borderRadius:10,justifyContent:'center',flexDirection:'row'}}>
                        <View style={{borderWidth:0,width:100,height:100,justifyContent:'center',alignItems:'center',borderRadius:10}}>
                              <View style={{borderWidth:0,width:80,height:80,borderRadius:40,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
                                <MaterialCommunityIcons name="account" size={60} color="gray" /> 
                              </View>
                          </View>
                          <View style={{borderWidth:0,width:230,height:100,borderRadius:10,alignItems:'center',justifyContent:'center'}}>
                              <Text style={{fontFamily:'Sound-Rounded',fontSize:16}}>{Info.profile.Name+' '+Info.profile.LastName}</Text>
                              <Text style={{fontFamily:'Sound-Rounded',fontSize:16}}>เจ้าของอู่</Text>
                          </View>
                        </View>
                    </View>
              )
            case "cashier":
              return (
                <View style={{borderWidth:0,height:140,justifyContent:'center',alignItems:'center'}}>
                        <View style={{borderWidth:0,width:330,height:100,backgroundColor:'#D9D9D9',borderRadius:10,justifyContent:'center',flexDirection:'row'}}>
                          <View style={{borderWidth:0,width:100,height:100,justifyContent:'center',alignItems:'center',borderRadius:10}}>
                          <View style={{borderWidth:0,width:80,height:80,borderRadius:40,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
                                <MaterialCommunityIcons name="account" size={60} color="gray" /> 
                              </View>
                          </View>
                          <View style={{borderWidth:0,width:230,height:100,borderRadius:10,alignItems:'center',justifyContent:'center'}}>
                              <Text style={{fontFamily:'Sound-Rounded',fontSize:16}}>{Info.profile.Name+' '+Info.profile.LastName}</Text>
                              <Text style={{fontFamily:'Sound-Rounded',fontSize:16}}>พนักงานคิดเงิน</Text>
                          </View>
                        </View>
                    </View>
              )
        }
    }

    const whatAbilityText = (role) => {
      //ลูกค้า
      if(role=='user' || role=='owner'){
        return (
          <View style={{height:50,borderWidth:0,justifyContent:'center'}}>
            <Text style={{fontFamily:'Sound-Rounded',fontSize:25,color:'#05C3FF',marginLeft:10}}>รายการ</Text>
          </View>
        )
      }
      //ช่าง หัวหน้าช่าง  แคชเชียร์
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
      if(role=='user'){
        return (
          <View style={{flex:1,borderWidth:0,alignItems:'center'}}>
            <TouchableOpacity style={{borderWidth:0,width:330,height:75,backgroundColor:'#FFB156',borderRadius:5,justifyContent:'center',margin:5}}>
              <Text style={{fontFamily:'Sound-Rounded',fontSize:20,color:'white',marginLeft:10}}>อู่รถใกล้ฉัน</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{borderWidth:0,width:330,height:75,backgroundColor:'#FFB156',borderRadius:5,justifyContent:'center',margin:5}}
              onPress={()=>{
                goUserCarPage(Info.profile)
              }}
            >
              <Text style={{fontFamily:'Sound-Rounded',fontSize:20,color:'white',marginLeft:10}}>รถ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{borderWidth:0,width:330,height:75,backgroundColor:'#0DD08A',borderRadius:5,justifyContent:'center',margin:5}}
              onPress={()=>{
                onDemoPress(Info.profile)
              }}
            >
              <Text style={{fontFamily:'Sound-Rounded',fontSize:20,color:'white',marginLeft:10}}>จำลองการส่งข้อมูล</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{borderWidth:0,width:330,height:75,backgroundColor:'#0DD08A',borderRadius:5,justifyContent:'center',margin:5}}
              onPress={()=>{
                goUserConfirm(Info.profile)
              }}
            >
              <Text style={{fontFamily:'Sound-Rounded',fontSize:20,color:'white',marginLeft:10}}>จำลองการยืนยัน</Text>
            </TouchableOpacity>


          </View>
        )
      }
      //ช่าง
      if(role=='employee'){
        return (
          <View style={{flex:1,borderWidth:0,alignItems:'center'}}>
            <TouchableOpacity style={{borderWidth:0,width:330,height:75,backgroundColor:'#FFB156',borderRadius:5,justifyContent:'center',margin:5}}
              onPress={()=>{
                goMechanicCheckPage(Info.profile)
              }}
            >
              <Text style={{fontFamily:'Sound-Rounded',fontSize:20,color:'white',marginLeft:10}}>ตรวจเช็คสภาพรถยนต์</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{borderWidth:0,width:330,height:75,backgroundColor:'#FFB156',borderRadius:5,justifyContent:'center',margin:5}}
              onPress={()=>{
                goMechanicFixPage(Info.profile)
              }}
            >
              <Text style={{fontFamily:'Sound-Rounded',fontSize:20,color:'white',marginLeft:10}}>ซ่อมแซมรถยนต์</Text>
            </TouchableOpacity>
          </View>
        )
      }
      //หัวหน้าช่าง
      if(role=='boss'){
        return (
          <View style={{flex:1,borderWidth:0,alignItems:'center'}}>
            <TouchableOpacity style={{borderWidth:0,width:330,height:75,backgroundColor:'#FFB156',borderRadius:5,justifyContent:'center',margin:5}}
              onPress={()=>{
                goHeadMechanicAssignPage(Info.profile)
              }}
            >
              <Text style={{fontFamily:'Sound-Rounded',fontSize:20,color:'white',marginLeft:10}}>มอบหมายงานให้พนักงานช่าง</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{borderWidth:0,width:330,height:75,backgroundColor:'#FFB156',borderRadius:5,justifyContent:'center',margin:5}}
              onPress={()=>{
                goHeadMechanicConfirmPage(Info.profile)
              }}
            >
              <Text style={{fontFamily:'Sound-Rounded',fontSize:20,color:'white',marginLeft:10}}>งานที่รอยืนยัน</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{borderWidth:0,width:330,height:75,backgroundColor:'#FFB156',borderRadius:5,justifyContent:'center',margin:5}}
              onPress={()=>{
                goBossSetPricePage(Info.profile)
              }}
            >
              <Text style={{fontFamily:'Sound-Rounded',fontSize:20,color:'white',marginLeft:10}}>งานที่รอประเมินราคา</Text>
            </TouchableOpacity>
          </View>
        )
      }
      // เจ้าของอู่
      if(role=='owner'){
        return (
          <View style={{flex:1,borderWidth:0,alignItems:'center'}}>
            <TouchableOpacity style={{borderWidth:0,width:330,height:75,backgroundColor:'#FFB156',borderRadius:5,justifyContent:'center',margin:5}}
              onPress={()=>{
                // goOwnerEditAccountPage(Info.profile)
                goOwnerHistoryPage(Info.profile)
              }}
            >
              <Text style={{fontFamily:'Sound-Rounded',fontSize:20,color:'white',marginLeft:10}}>ประวัติงานทั้งหมด</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{borderWidth:0,width:330,height:75,backgroundColor:'#FFB156',borderRadius:5,justifyContent:'center',margin:5}}
              onPress={()=>{
                goOwnerEditAccountPage(Info.profile)
              }}
            >
              <Text style={{fontFamily:'Sound-Rounded',fontSize:20,color:'white',marginLeft:10}}>แก้ไขบัญชีพนักงาน</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{borderWidth:0,width:330,height:75,backgroundColor:'#FFB156',borderRadius:5,justifyContent:'center',margin:5}}
              onPress={()=>{
                goOwnerEditGaragePage(Info.profile)
              }}
            >
              <Text style={{fontFamily:'Sound-Rounded',fontSize:20,color:'white',marginLeft:10}}>แก้ไขข้อมูลอู่</Text>
            </TouchableOpacity>
          </View>
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


      <View style={{width:'100%',height:50,borderWidth:0,backgroundColor:'#69DBFF',justifyContent:'center',alignItems:'center',borderTopLeftRadius:50,borderTopRightRadius:50,flexDirection:'row'}}>
        <TouchableOpacity activeOpacity={1} style={{width:80,height:80,borderWidth:1,backgroundColor:'#FC3B3B',borderRadius:40,marginBottom:50,justifyContent:'center',alignItems:'center',borderColor:'#FF3030'}}
          onPress={()=>{
            onSignoutPress()
          }}
        >
          <MaterialIcons name="logout" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

});
