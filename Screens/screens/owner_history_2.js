import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Button,TouchableOpacity,TextInput, ScrollView,Alert,FlatList} from 'react-native';
import React from 'react'
import Constants from 'expo-constants';
import { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux'


import * as WorkModel from '../../firebase/workModel'

export const Owner_History_2 = ({navigation,route}) => {
  const Info = useSelector((state) => state.auths)

  const owner_history_success = (data) => {
    // console.log(data)
    navigation.navigate({name:'Owner_History_1',params:data})
  }
  const owner_history_unsuccess = (msg) => {

  }
  const goOwnerHistoryPage = (info) => {
    WorkModel.getWorks(info,'history',owner_history_success,owner_history_unsuccess)
  }


  let workInfo = route.params

//   console.log(employeeInfo)
//   console.log(employeeInfo)
//   console.log(route.params)

//   const whatWork = (status) => {
//     if(status=='รอมอบหมายตรวจสภาพ'){
//         return 'มอบหมายงานตรวจสภาพ'
//     }
//     else{
//         return 'มอบหมายงานซ่อมแซม'
//     }
//   }

//   const giveWorkSuccess = () => {
//     navigation.navigate({name:'Home'})
//   }
//   const giveWorkUnsuccess = () => {
    
//   }

//   const selectEmployee = (item) => {
//     // console.log(workInfo)
//     // console.log(item)
//     WorkModel.giveWork(workInfo,item,giveWorkSuccess,giveWorkUnsuccess)
//   }

  const totalprice = (bill) => {
    // console.log(bill)
    let total = 0
    bill.forEach(element => {
        total = element.amount + total
    });
    return total
  }

  const checkPanel = (check_info) => {
    if(check_info!='' && check_info!=undefined){
        return (
            <View style={{borderWidth:0,width:'100%',justifyContent:'center',alignItems:'center',marginBottom:20}}>
                <View style={{borderWidth:0,width:'90%',height:50,justifyContent:'center',borderTopLeftRadius:20,borderTopRightRadius:20,backgroundColor:'#0CBF7F'}}>
                    <Text style={{borderWidth:0,fontSize:20,color:'white',marginLeft:20,fontFamily:'Sound-Rounded'}}>ผลการตรวจสภาพ</Text>
                </View>
                <View style={{borderWidth:0,width:'90%',height:80,justifyContent:'center',alignItems:'center',borderBottomLeftRadius:20,borderBottomRightRadius:20,backgroundColor:'#0DD08A'}}>
                    <View style={{borderWidth:0,backgroundColor:'white',width:'90%',height:60,borderRadius:10,justifyContent:'center'}}>
                        <ScrollView>
                        <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}>{workInfo.check_info}</Text>
                        </ScrollView>
                        
                    </View>
                </View>
            </View>
        )
    }
  }

  const fixPanel = (fix_info) => {
    if(fix_info!='' && fix_info!=undefined){
        return (
            <View style={{borderWidth:0,width:'100%',justifyContent:'center',alignItems:'center',marginBottom:20}}>
                <View style={{borderWidth:0,width:'90%',height:50,justifyContent:'center',borderTopLeftRadius:20,borderTopRightRadius:20,backgroundColor:'#0CBF7F'}}>
                    <Text style={{borderWidth:0,fontSize:20,color:'white',marginLeft:20,fontFamily:'Sound-Rounded'}}>รายงานการซ่อมแซม</Text>
                </View>
                <View style={{borderWidth:0,width:'90%',height:80,justifyContent:'center',alignItems:'center',borderBottomLeftRadius:20,borderBottomRightRadius:20,backgroundColor:'#0DD08A'}}>
                    <View style={{borderWidth:0,backgroundColor:'white',width:'90%',height:60,borderRadius:10,justifyContent:'center'}}>
                        <ScrollView>
                        <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}>{workInfo.check_info}</Text>
                        </ScrollView>
                        
                    </View>
                </View>
            </View>
        )
    }
  }

  return (
    <View style={{flex:1,justifyContent:'space-between',paddingTop: Constants.statusBarHeight}}>

      <View style={{height:80,backgroundColor:'#05C3FF',alignItems:'center',flexDirection:'row'}}>
        <TouchableOpacity style={{width:50,height:50,backgroundColor:'#FFA133',marginLeft:10,borderRadius:10,justifyContent:'center',alignItems:'center'}}
            onPress={()=>{
            //   goMechanicAssignPage(Info.profile)
                goOwnerHistoryPage(Info.profile)
            }}
            
          >
            <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={{borderWidth:0,fontSize:25,color:'white',marginLeft:20,fontFamily:'Sound-Rounded'}}>ประวัติงาน</Text>
      </View>


    <View style={{flex:1,borderWidth:0,justifyContent:'center',alignItems:'center'}}>
        <View style={{width:'100%',borderWidth:0 ,justifyContent:'center',alignItems:'center',marginBottom:20}}>
            <View style={{borderWidth:0,width:'90%',height:50,justifyContent:'center',borderTopLeftRadius:20,borderTopRightRadius:20,backgroundColor:'#0CBF7F'}}>
            <Text style={{borderWidth:0,fontSize:20,color:'white',marginLeft:20,fontFamily:'Sound-Rounded'}}>รายละเอียดลูกค้า</Text>
            </View>
            <View style={{borderWidth:0,width:'90%',height:140,justifyContent:'center',alignItems:'center',borderBottomLeftRadius:20,borderBottomRightRadius:20,backgroundColor:'#0DD08A'}}>
                <View style={{borderWidth:0,width:'100%',height:60,flexDirection:'row',justifyContent:'space-around'}}>
                    <View style={{borderWidth:0}}>
                        <Text style={{borderWidth:0,fontSize:18,color:'white',fontFamily:'Sound-Rounded'}}>เจ้าของ</Text>
                        <View style={{borderWidth:0,backgroundColor:'white',width:150,height:30,borderRadius:10,justifyContent:'center'}}>
                            <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}>{workInfo.Name+' '+workInfo.LastName}</Text>
                        </View>
                    </View>
                    <View style={{borderWidth:0}}>
                        <Text style={{borderWidth:0,fontSize:18,color:'white',fontFamily:'Sound-Rounded'}}>เบอร์โทรศัพท์</Text>
                        <View style={{borderWidth:0,backgroundColor:'white',width:150,height:30,borderRadius:10,justifyContent:'center'}}>
                            <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}>{workInfo.PhoneNumber}</Text>
                        </View>
                    </View>
                </View>
                <View style={{borderWidth:0,width:'100%',height:60,flexDirection:'row',justifyContent:'space-around'}}>
                    <View style={{borderWidth:0}}>
                        <Text style={{borderWidth:0,fontSize:18,color:'white',fontFamily:'Sound-Rounded'}}>รถ</Text>
                        <View style={{borderWidth:0,backgroundColor:'white',width:150,height:30,borderRadius:10,justifyContent:'center'}}>
                            <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}>{workInfo.brand}</Text>
                        </View>
                    </View>
                    <View style={{borderWidth:0}}>
                        <Text style={{borderWidth:0,fontSize:18,color:'white',fontFamily:'Sound-Rounded'}}>ทะเบียน</Text>
                        <View style={{borderWidth:0,backgroundColor:'white',width:150,height:30,borderRadius:10,justifyContent:'center'}}>
                            <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}>{workInfo.plate}</Text>
                    </View>
                </View>
            </View>
        </View>
      </View>
        {checkPanel(workInfo.check_info)}
        {fixPanel(workInfo.fix_info)}
        <View style={{borderWidth:0,width:'90%',justifyContent:'flex-end',alignItems:'center',flexDirection:'row'}}>
            <View style={{borderWidth:0,width:200,height:50,justifyContent:'center',alignItems:'center',flexDirection:'row',borderRadius:10,backgroundColor:'#0CBF7F'}}>
                <Text style={{borderWidth:0,fontSize:20,color:'white',fontFamily:'Sound-Rounded'}}>ราคา : </Text>
                <View style={{borderWidth:0,backgroundColor:'white',width:100,height:30,borderRadius:5,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{borderWidth:0,fontSize:20,color:'gray',fontFamily:'Sound-Rounded'}}>{totalprice(workInfo.bill)}</Text>
                </View>
            </View>
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
